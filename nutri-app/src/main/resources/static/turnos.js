const API = "http://localhost:8080";
let diasBloqueadosBackend = [];

let fechaSeleccionada = null;

let diasBloqueados = [];

window.modoBloqueoActivo = true;

// ==========================
// 🔄 CARGAR PACIENTES
// ==========================
function cargarPacientes() {
    fetch(`${API}/pacientes`)
        .then(res => res.json())
        .then(data => {

            const select1 = document.getElementById("paciente");
            const select2 = document.getElementById("pacienteModal");

            if (select1) {
                select1.innerHTML = '<option value="">Seleccionar paciente</option>';
            }

            if (select2) {
                select2.innerHTML = '<option value="">Seleccionar paciente</option>';
            }

            data.forEach(p => {
                const option = `<option value="${p.id}">${p.nombre}</option>`;
                if (select1) select1.innerHTML += option;
                if (select2) select2.innerHTML += option;
            });
        });
}

// ==========================
// ➕ CREAR TURNO
// ==========================
function crearTurno() {

    const pacienteId = document.getElementById("pacienteModal").value;
    const fecha = document.getElementById("fechaModal").value;
    const hora = document.getElementById("horaModal").value;
    const tipo = document.getElementById("tipoModal").value || "Control";

    if (!pacienteId || !fecha || !hora) {
        alert("Completá los campos obligatorios");
        return;
    }

    const turno = {
        fecha,
        hora,
        tipoConsulta: tipo,
        paciente: { id: parseInt(pacienteId) }
    };

    fetch(`${API}/turnos`)
        .then(res => res.json())
        .then(turnos => {

            const existe = turnos.some(t =>
                t.fecha === fecha && t.hora === hora
            );

            if (existe) {
                alert("Ya existe un turno en ese horario");
                return;
            }

            return fetch(`${API}/turnos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(turno)
            });
        })
        .then(res => res?.json())
        .then(data => {
            if (!data) return;

            alert("Turno guardado");
            cargarTurnos();

            if (window.calendarGlobal) {
                window.calendarGlobal.refetchEvents();
            }

            const modal = bootstrap.Modal.getInstance(
                document.getElementById('modalCrearTurno')
            );
            if (modal) modal.hide();
        });
}
// ==========================
// 📋 LISTAR TURNOS
// ==========================
function cargarTurnos() {
    fetch(`${API}/turnos`)
        .then(res => res.json())
        .then(data => {

            const tabla = document.getElementById("tablaTurnos");
            tabla.innerHTML = "";

            data.forEach(t => {
                tabla.innerHTML += `
                    <tr id="turno-${t.id}">
                        <td>${t.paciente?.nombre || "Sin nombre"}</td>
                        <td>${t.fecha}</td>
                        <td>${t.hora}</td>
                        <td>${t.tipoConsulta || "-"}</td>

                        <td class="text-center">
                            <span class="badge ${t.estado === 'CANCELADO' ? 'bg-danger' : 'bg-success'}">
                                ${t.estado}
                            </span>
                        </td>

                        <td class="text-center">
                            <button class="btn ${t.estado === 'CANCELADO' ? 'btn-secondary' : 'btn-danger'}"
                                ${t.estado === 'CANCELADO' ? 'disabled' : ''}
                                onclick="cancelarTurno(${t.id})">
                                ${t.estado === 'CANCELADO' ? 'Cancelado' : 'Cancelar'}
                            </button>
                        </td>

                        <!-- 🔥 NUEVO BOTÓN WHATSAPP -->
                        <td class="text-center">
                            <button 
                                onclick="recordarTurno(this)" 
                                class="btn-wsp"
                                data-telefono="${t.paciente?.telefono || ''}"
                                data-fecha="${t.fecha}"
                                data-hora="${t.hora}"
                                data-nombre="${t.paciente?.nombre || ''}"
                                ${t.estado === 'CANCELADO' ? 'disabled' : ''}
                            >
                                WhatsApp
                            </button>
                        </td>
                    </tr>
                `;
            });
        });
}
// ==========================
// ❌ CANCELAR TURNO
// ==========================
function cancelarTurno(id) {
    fetch(`${API}/turnos/${id}`, { method: "DELETE" })
        .then(() => {
            cargarTurnos();
            if (window.calendarGlobal) {
                window.calendarGlobal.refetchEvents();
            }
        });
}

// ==========================
// 📅 CALENDARIO
// ==========================
function cargarCalendario() {

    // 🔥 PRIMERO CARGAR BLOQUEOS (CLAVE)
    fetch("http://localhost:8080/bloqueos")
        .then(res => res.json())
        .then(bloqueos => {

            diasBloqueadosBackend = bloqueos.map(b => b.fecha);

            const calendarEl = document.getElementById('calendar');

            const calendar = new FullCalendar.Calendar(calendarEl, {

                initialView: 'dayGridMonth',
                locale: 'es',
                editable: true,

                // ==========================
                // 🖱 MOVER TURNO
                // ==========================
                eventDrop: function(info) {

                    const evento = info.event;

                    const nuevaFecha = evento.startStr.split("T")[0];
                    const nuevaHora = evento.startStr.split("T")[1].substring(0,5);

                    fetch(`${API}/turnos`)
                        .then(res => res.json())
                        .then(turnos => {

                            const existe = turnos.some(t =>
                                t.id != evento.id &&
                                t.fecha === nuevaFecha &&
                                t.hora === nuevaHora
                            );

                            if (existe) {
                                alert("Ese horario ya está ocupado");
                                info.revert();
                                return;
                            }

                            fetch(`${API}/turnos/${evento.id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    fecha: nuevaFecha,
                                    hora: nuevaHora,
                                    paciente: { nombre: evento.title }
                                })
                            })
                            .catch(() => {
                                alert("Error al mover turno");
                                info.revert();
                            });

                        });
                },

                // ==========================
                // 👁 VER DETALLE
                // ==========================
                eventClick: function(info) {

                    const e = info.event;

                    document.getElementById("detalleTurno").innerHTML = `
                        <p><strong>Paciente:</strong> ${e.title}</p>
                        <p><strong>Fecha:</strong> ${e.start.toLocaleDateString()}</p>
                        <p><strong>Hora:</strong> ${e.start.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                        <p><strong>Tipo:</strong> ${e.extendedProps.tipo}</p>
                        <p><strong>Estado:</strong> ${e.extendedProps.estado}</p>
                    `;

                    new bootstrap.Modal(document.getElementById('modalTurno')).show();
                },

                // ==========================
                // ➕ CLICK
                // ==========================
                dateClick: function(info) {

                    const fecha = info.date.toISOString().split("T")[0];
                    fechaSeleccionada = fecha;

                    // 🔴 DESBLOQUEAR
                    if (diasBloqueadosBackend.includes(fecha)) {

                        const bloqueo = bloqueos.find(b => b.fecha === fecha);

                        if (bloqueo) {
                            fetch(`http://localhost:8080/bloqueos/${bloqueo.id}`, {
                                method: "DELETE"
                            })
                            .then(() => {

                                // 🔥 ACTUALIZAR ARRAY
                                diasBloqueadosBackend = diasBloqueadosBackend.filter(d => d !== fecha);

                                alert("Día desbloqueado");

                                calendar.destroy();
                                cargarCalendario();
                            });
                        }

                        return;
                    }

                    // 🔴 BLOQUEAR
                    if (window.modoBloqueoActivo) {

                        fetch("http://localhost:8080/bloqueos", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ fecha: fecha })
                        })
                        .then(() => {

                            // 🔥 ACTUALIZAR ARRAY
                            diasBloqueadosBackend.push(fecha);

                            alert("Día bloqueado");

                            calendar.destroy();
                            cargarCalendario();
                        });

                        return;
                    }

                    // 🔴 VALIDAR DÍA LLENO
                    fetch(`${API}/turnos`)
                        .then(res => res.json())
                        .then(turnos => {

                            const turnosDelDia = turnos.filter(t => t.fecha === fecha);

                            if (turnosDelDia.length >= 26) {
                                alert("No hay horarios disponibles");
                                return;
                            }

                            new bootstrap.Modal(
                                document.getElementById('modalCrearTurno')
                            ).show();

                            document.getElementById("fechaModal").value = fecha;
                            document.getElementById("horaModal").innerHTML = "";
                            document.getElementById("pacienteModal").value = "";
                            document.getElementById("tipoModal").value = "";

                            cargarHorasDisponibles(fecha);

                        });
                },

                // ==========================
                // 🔴 PINTAR BLOQUEOS
                // ==========================
                dayCellDidMount: function(info) {

                    const fecha = info.date.toISOString().split("T")[0];

                    if (diasBloqueadosBackend.includes(fecha)) {
                        info.el.style.backgroundColor = "#dc3545";
                        info.el.style.pointerEvents = "none";
                        info.el.title = "Día bloqueado";
                    }
                },

                // ==========================
                // 📅 EVENTOS
                // ==========================
                events: function(info, successCallback) {
                    fetch(`${API}/turnos`)
                        .then(res => res.json())
                        .then(data => {

                            const eventos = data.map(t => {

                                let color = "#28a745";

                                if (t.estado === "CANCELADO") color = "#dc3545";
                                if (t.estado === "PENDIENTE") color = "#ffc107";

                                return {
                                    id: t.id,
                                    title: t.paciente?.nombre || "Sin nombre",
                                    start: t.fecha + "T" + t.hora,
                                    color: color,
                                    extendedProps: {
                                        tipo: t.tipoConsulta,
                                        estado: t.estado
                                    }
                                };
                            });

                            successCallback(eventos);
                        });
                }

            });

            calendar.render();
            window.calendarGlobal = calendar;

        });
}
// ==========================
// 🕐 HORAS DISPONIBLES
// ==========================
function cargarHorasDisponibles(fecha) {

    fetch(`${API}/turnos`)
        .then(res => res.json())
        .then(turnos => {

            const select = document.getElementById("horaModal");
            select.innerHTML = '<option value="">Seleccionar hora</option>';

            const horarios = [];

            for (let h = 8; h <= 20; h++) {
                horarios.push(`${String(h).padStart(2,'0')}:00`);
                horarios.push(`${String(h).padStart(2,'0')}:30`);
            }

            const ocupados = turnos
                .filter(t => t.fecha === fecha)
                .map(t => t.hora);

            horarios.forEach(hora => {
                if (!ocupados.includes(hora)) {
                    select.innerHTML += `<option value="${hora}">${hora}</option>`;
                }
            });

        });
}

// ==========================
// 🚀 INICIO
// ==========================
window.onload = () => {
    cargarPacientes();
    cargarTurnos();
};

document.addEventListener("DOMContentLoaded", () => {
    cargarPacientes();
    cargarTurnos();
    cargarTurnosHoy(); 
    //cargarCalendario();
});



function bloquearDiaSeleccionado() {

    // 🔁 alternar modo bloqueo
    window.modoBloqueoActivo = !window.modoBloqueoActivo;

    if (window.modoBloqueoActivo) {
        alert("Modo bloqueo ACTIVADO\nSeleccioná un día para bloquear");
    } else {
        alert("Modo bloqueo DESACTIVADO");
    }
}



function cargarBloqueos() {
    fetch("http://localhost:8080/bloqueos")
        .then(res => res.json())
        .then(data => {

            diasBloqueadosBackend = data.map(d => d.fecha); // 🔥 GUARDAR

            data.forEach(dia => {
                calendarGlobal.addEvent({
                    title: "BLOQUEADO",
                    start: dia.fecha,
                    allDay: true,
                    color: "red"
                });
            });

        })
        .catch(error => console.error("Error cargando bloqueos:", error));
}







function recordarTurno(boton) {

    const telefono = formatearTelefono(
        boton.getAttribute("data-telefono")
    );

    const fecha = boton.getAttribute("data-fecha");
    const hora = boton.getAttribute("data-hora");
    const nombre = boton.getAttribute("data-nombre");

    if (!telefono) {
        alert("El paciente no tiene teléfono registrado");
        return;
    }

    let mensaje = `📅 *RECORDATORIO DE TURNO*\n\n`;

    mensaje += `Hola ${nombre} 👋\n\n`;
    mensaje += `Te recordamos tu turno programado:\n\n`;

    mensaje += `🗓️ Fecha: ${fecha}\n`;
    mensaje += `⏰ Hora: ${hora}\n\n`;

    mensaje += `📍 Consultorio nutricional\n\n`;
    mensaje += `Por favor confirmar asistencia 🙌`;

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
} 



function cargarTurnosHoy() {

    const hoy = new Date().toISOString().split("T")[0];

    fetch(`${API}/turnos`)
        .then(res => res.json())
        .then(data => {

            const tabla = document.getElementById("tablaHoy");
            tabla.innerHTML = "";

            const turnosHoy = data
                .filter(t => t.fecha === hoy)
                .sort((a, b) => a.hora.localeCompare(b.hora));

            turnosHoy.forEach(t => {

                tabla.innerHTML += `
                    <tr>
                        <td>${t.paciente?.nombre}</td>
                        <td>${t.hora}</td>
                        <td>
                            <span class="badge ${
                                t.estado === 'ASISTIO' ? 'bg-success' :
                                t.estado === 'AUSENTE' ? 'bg-danger' :
                                'bg-warning'
                            }">
                                ${t.estado || 'PENDIENTE'}
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-success btn-sm"
                                onclick="cambiarEstado(${t.id}, 'ASISTIO')">
                                ✔
                            </button>
                            <button class="btn btn-danger btn-sm"
                                onclick="cambiarEstado(${t.id}, 'AUSENTE')">
                                ✖
                            </button>
                        </td>
                    </tr>
                `;
            });
        });
}




function cambiarEstado(id, estado) {

    fetch(`${API}/turnos/${id}`)
        .then(res => res.json())
        .then(turno => {

            // 🔥 mantener datos existentes
            const turnoActualizado = {
                ...turno,
                estado: estado
            };

            return fetch(`${API}/turnos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(turnoActualizado)
            });
        })
        .then(() => {
            cargarTurnosHoy();
            cargarTurnos();

            if (window.calendarGlobal) {
                window.calendarGlobal.refetchEvents();
            }
        });
}


// ======================================
// 🔥 AUTOGESTIÓN DE TURNOS (PACIENTE)
// ======================================

// 🔹 GENERAR HORARIOS
// 🔹 GENERAR HORARIOS DINÁMICOS (CORRECTO)
// 🔹 GENERAR HORARIOS CORRECTO (FIX ZONA HORARIA)
// 🔹 GENERAR HORARIOS SIN ERROR DE FECHA
function generarHorarios(fecha) {

    if (!fecha) return [];

    const [año, mes, dia] = fecha.split("-").map(Number);

    // fórmula para obtener día de la semana (Zeller simplificado)
    const fechaObj = new Date(año, mes - 1, dia);
    const diaSemana = fechaObj.getUTCDay(); // 👈 CLAVE

    let inicio = null;
    let fin = null;

    // miércoles
    if (diaSemana === 3) {
        inicio = 14;
        fin = 16;
    }

    // viernes
    if (diaSemana === 5) {
        inicio = 14;
        fin = 18;
    }

    if (inicio === null) return [];

    let horarios = [];

    for (let h = inicio; h < fin; h++) {
        const hora = h.toString().padStart(2, "0");
        horarios.push(`${hora}:00`);
        horarios.push(`${hora}:30`);
    }

    return horarios;
}
// 🔹 OBTENER HORARIOS DISPONIBLES (sin ocupados)
async function obtenerHorariosDisponibles(fecha) {

    try {
        const res = await fetch(`http://localhost:8080/turnos?fecha=${fecha}`);
        const turnos = await res.json();

        const ocupados = turnos.map(t => t.hora);
        const todos = generarHorarios(fecha);

        return todos.filter(h => !ocupados.includes(h));

    } catch (error) {
        console.error("Error cargando turnos:", error);
        return [];
    }
}

// 🔹 CUANDO CAMBIA LA FECHA
document.addEventListener("DOMContentLoaded", () => {

    const inputFecha = document.getElementById("fecha");

    if (!inputFecha) return;

    inputFecha.addEventListener("change", async function () {

        const fecha = this.value;
        const select = document.getElementById("hora");

        select.innerHTML = "<option>Cargando...</option>";

        const horas = await obtenerHorariosDisponibles(fecha);

        select.innerHTML = "";

        if (horas.length === 0) {
            select.innerHTML = "<option>No hay turnos disponibles</option>";
            return;
        }

        horas.forEach(h => {
            const option = document.createElement("option");
            option.value = h;
            option.text = h;
            select.add(option);
        });

    });

});

// 🔹 SACAR TURNO
function sacarTurno() {

    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const tipo = document.getElementById("tipo").value;

    if (!nombre || !fecha || !hora || !tipo) {
        alert("Completá todos los campos");
        return;
    }

    const turno = {
        nombre: nombre,
        fecha: fecha,
        hora: hora,
        tipo: tipo,
        estado: "PENDIENTE"
    };

    fetch("http://localhost:8080/turnos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(turno)
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al guardar");
        return res.json();
    })
    .then(() => {

        alert(`
Turno reservado correctamente.

Para confirmar deberá abonar una seña de $5.000.

Alias: ludmilabenitez97
Titular: Ludmila Liseth Benitez
Banco: NBCH

Tiene 24 hs para abonar.
        `);

        // limpiar
        document.getElementById("nombre").value = "";
        document.getElementById("fecha").value = "";
        document.getElementById("hora").innerHTML = "<option>Seleccione una fecha</option>";
        document.getElementById("tipo").value = "";

    })
    .catch(error => {
        console.error(error);
        alert("Error al guardar turno");
    });
}



function copiarAlias() {

    const texto = "ludmilabenitez97";

    navigator.clipboard.writeText(texto);

    const aviso = document.createElement("div");

    aviso.innerHTML = "✅ Alias copiado";

    aviso.style.position = "fixed";
    aviso.style.top = "25px";
    aviso.style.left = "50%";
    aviso.style.transform = "translateX(-50%)";

    aviso.style.background = "#6c63ff";
    aviso.style.color = "white";

    aviso.style.padding = "14px 24px";
    aviso.style.borderRadius = "14px";

    aviso.style.fontWeight = "600";
    aviso.style.fontSize = "16px";

    aviso.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";

    aviso.style.zIndex = "9999";

    aviso.style.opacity = "0";
    aviso.style.transition = "all 0.3s ease";

    document.body.appendChild(aviso);

    setTimeout(() => {
        aviso.style.opacity = "1";
        aviso.style.top = "35px";
    }, 50);

    setTimeout(() => {
        aviso.style.opacity = "0";

        setTimeout(() => {
            aviso.remove();
        }, 300);

    }, 2200);

}