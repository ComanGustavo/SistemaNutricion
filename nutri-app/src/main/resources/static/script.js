const API = "http://localhost:8080";
const API_PACIENTES = "http://localhost:8080/pacientes";
const API_PLANES = "http://localhost:8080/planes";
const API_PACIENTES_PEDIATRICOS = "http://localhost:8080/pacientes-pediatricos";

let pacienteActualId = null;

let grafico = null;

// 🔹 CARGA INICIAL
window.onload = () => {
    cargarPacientes();
    cargarPacientesSelect();
    cargarPacientesEnSelects();
};

// 🔹 GUARDAR PACIENTE
function guardarPaciente() {

    const nombre = document.getElementById("nombre")?.value;
    const dni = document.getElementById("dni")?.value;
    const edad = document.getElementById("edad")?.value;
    const telefonoInput = document.getElementById("telefono")?.value;

    const telefono = formatearTelefono(telefonoInput);

            if (!nombre) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Ingresá el nombre del paciente"
                });
                document.getElementById("nombre").focus();
                return;
            }

            if (!dni) {
                            Swal.fire({
                icon: "warning",
                title: "Campo obligatorio",
                text: "Ingresá el DNI"
            });
            document.getElementById("dni").focus();
                return;
            }

            if (!edad || edad <= 0) {
                        Swal.fire({
                icon: "warning",
                title: "Edad inválida",
                text: "Ingresá una edad válida"
            });
                document.getElementById("edad").focus();
                return;
            }

            const email =
                document.getElementById("email")?.value;

            if (email && !email.includes("@")) {
                        Swal.fire({
                icon: "warning",
                title: "Email inválido",
                text: "Ingresá un email válido"
            });
                document.getElementById("email").focus();
                return;
            }

            const peso =
                parseFloat(document.getElementById("peso")?.value);

            if (!isNaN(peso) && peso <= 0) {
                            Swal.fire({
                icon: "warning",
                title: "Peso inválido",
                text: "El peso debe ser mayor a 0"
            });
                document.getElementById("peso").focus();
                return;
            }

            const altura =
                parseFloat(document.getElementById("altura")?.value);

            if (!isNaN(altura) && altura <= 0) {
                            Swal.fire({
                icon: "warning",
                title: "Altura inválida",
                text: "La altura debe ser mayor a 0"
            });
                document.getElementById("altura").focus();
                return;
            }

    const paciente = {
        // 🔹 DATOS BÁSICOS
        nombre: nombre,
        dni: dni,
        edad: parseInt(edad),
        telefono: telefono,
        email: document.getElementById("email")?.value,

        // 🔹 DATOS CORPORALES
        peso: parseFloat(document.getElementById("peso")?.value) || null,
        altura: parseFloat(document.getElementById("altura")?.value) || null,
        imc: parseFloat(document.getElementById("imc")?.value) || null,

        grasaCorporal: parseFloat(document.getElementById("grasaCorporal")?.value) || null,
        masaMuscular: parseFloat(document.getElementById("masaMuscular")?.value) || null,
        grasaVisceral: parseFloat(document.getElementById("grasaVisceral")?.value) || null,

        // 🔹 ICC
        cintura: parseFloat(document.getElementById("cintura")?.value) || null,
        cadera: parseFloat(document.getElementById("cadera")?.value) || null,
        icc: parseFloat(document.getElementById("icc")?.value) || null,

        // 🔹 ENTREVISTA
        entrevista: document.getElementById("entrevista")?.value
    };

    fetch(API_PACIENTES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paciente)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("No se pudo guardar el paciente");
        }
        return res.json();
    })
    .then(data => {
    pacienteActualId = data.id;

    document.getElementById("pacienteInfo").innerText =
        "Paciente guardado (ID: " + pacienteActualId + ")";

            Swal.fire({
            icon: "success",
            title: "Paciente guardado",
            text: "Paciente guardado correctamente"
        });

    limpiarFormularioPaciente();
    cargarPacientes();
    })
    .catch(error => {
        console.error("Error al guardar paciente:", error);
                Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al guardar paciente"
        });
    });
}
function limpiarFormularioPaciente() {
    const nombre = document.getElementById("nombre");
    const dni = document.getElementById("dni");
    const edad = document.getElementById("edad");

    if (nombre) nombre.value = "";
    if (dni) dni.value = "";
    if (edad) edad.value = "";
}

// 🔹 LISTAR PACIENTES EN LISTA
function cargarPacientes() {
    fetch(API_PACIENTES)
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById("lista");

            if (!lista) return;

            lista.innerHTML = "";

            data.forEach(p => {
                const li = document.createElement("li");
                li.className = "plan-item";

                li.innerHTML = `
                    <strong>${p.nombre}</strong> - DNI: ${p.dni} - Edad: ${p.edad}
                    <button onclick="editarPaciente(${p.id})">
                    Editar
                </button>

                <button onclick="eliminarPaciente(${p.id})">
                    Eliminar
                </button>
                `;

                lista.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error al cargar pacientes:", error);
        });
}



function editarPaciente(id) {

    fetch(`${API_PACIENTES}/${id}`)

        .then(res => res.json())

        .then(data => {

            console.log("Paciente editar:", data);

            document.getElementById("nombre").value =
                data.nombre || "";

            document.getElementById("dni").value =
                data.dni || "";

            document.getElementById("edad").value =
                data.edad || "";

            document.getElementById("telefono").value =
                data.telefono || "";

            document.getElementById("email").value =
                data.email || "";

            document.getElementById("peso").value =
                data.peso || "";

            document.getElementById("altura").value =
                data.altura || "";

            document.getElementById("imc").value =
                data.imc || "";

            document.getElementById("grasaCorporal").value =
                data.grasaCorporal || "";

            document.getElementById("masaMuscular").value =
                data.masaMuscular || "";

            document.getElementById("grasaVisceral").value =
                data.grasaVisceral || "";

            document.getElementById("cintura").value =
                data.cintura || "";

            document.getElementById("cadera").value =
                data.cadera || "";

            document.getElementById("icc").value =
                data.icc || "";

            document.getElementById("entrevista").value =
                data.entrevista || "";

            pacienteActualId = data.id;


            calcularIMC();
            calcularICC();

            
        })

        .catch(error => {
            console.error("Error cargando paciente:", error);
        });
}

// 🔹 CARGAR SELECT DE SEGUIMIENTO
function cargarPacientesSelect() {
    fetch(API_PACIENTES)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById("pacienteSelect");

            if (!select) return;

            select.innerHTML = '<option value="">Seleccionar paciente</option>';

            data.forEach(p => {
                const option = document.createElement("option");
                option.value = p.id;
                option.text = `${p.nombre} - DNI: ${p.dni}`;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error al cargar pacientes en seguimiento:", error);
        });
}

// 🔹 CARGAR SELECTS DE PLAN ALIMENTARIO
async function cargarPacientesEnSelects() {
    try {
        const respuesta = await fetch(API_PACIENTES);
        const pacientes = await respuesta.json();

        const selectPaciente = document.getElementById("paciente");
        const selectPacienteBusqueda = document.getElementById("pacienteBusqueda");

        if (selectPaciente) {
            selectPaciente.innerHTML = '<option value="">Seleccione un paciente</option>';
            pacientes.forEach(paciente => {
                const option = document.createElement("option");
                option.value = paciente.id;
                option.textContent = `${paciente.nombre} - DNI: ${paciente.dni}`;
                selectPaciente.appendChild(option);
            });
        }

        if (selectPacienteBusqueda) {
            selectPacienteBusqueda.innerHTML = '<option value="">Seleccione un paciente</option>';
            pacientes.forEach(paciente => {
                const option = document.createElement("option");
                option.value = paciente.id;
                option.textContent = `${paciente.nombre} - DNI: ${paciente.dni}`;
                selectPacienteBusqueda.appendChild(option);
            });
        }

    } catch (error) {
        console.error("Error al cargar pacientes:", error);
    }
}

// 🔹 ELIMINAR PACIENTE
function eliminarPaciente(id) {
    fetch(`${API_PACIENTES}/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        cargarPacientes();
        cargarPacientesSelect();
        cargarPacientesEnSelects();
    })
    .catch(error => {
        console.error("Error al eliminar paciente:", error);
    });
}

// 🔹 CARGAR GRÁFICO DE SEGUIMIENTO
function cargarSeguimiento() {

    const pacienteId =
        document.getElementById("pacienteSelect")?.value;

    if (!pacienteId) {

                Swal.fire({
            icon: "warning",
            title: "Paciente no seleccionado",
            text: "Seleccioná un paciente"
        });
        return;
    }

    fetch(`${API}/seguimientos/paciente/${pacienteId}`)

    .then(res => {

        if (!res.ok) {
            throw new Error("Error HTTP");
        }

        return res.json();
    })

        .then(datos => {

    console.log("Seguimientos:", datos);

    const ultimo = datos[datos.length - 1];

    console.log("Último seguimiento:", ultimo);

    document.getElementById("cardPeso").innerText =
    `${ultimo.peso} kg`;

    document.getElementById("cardIMC").innerText =
    ultimo.imc || "--";

    document.getElementById("cardMusculo").innerText =
    `${ultimo.masaMuscular || "--"} %`;

    document.getElementById("cardGrasa").innerText =
    `${ultimo.grasaCorporal || "--"} %`;
    // 🔥 FILTRAR DATOS INVÁLIDOS
    datos = datos.filter(d =>
        d.fecha !== null &&
        d.peso !== null
    );
        // 🔥 ORDENAR POR FECHA
        datos.sort((a, b) =>
            new Date(a.fecha) - new Date(b.fecha)
        );

        const fechas =
            datos.map(d => d.fecha);

        const pesos =
            datos.map(d => d.peso || 0);

        const imc =
            datos.map(d => d.imc || 0);

        const masaMuscular =
            datos.map(d => d.masaMuscular || 0);

        const grasa =
            datos.map(d => d.grasaCorporal || 0);

        const canvas =
            document.getElementById("grafico");

        if (!canvas) return;

        const ctx =
            canvas.getContext("2d");

        if (grafico) {
            grafico.destroy();
        }

        grafico = new Chart(ctx, {

            type: 'line',

            data: {

                labels: fechas,

                datasets: [

                    {

                        label: 'Peso',

                        data: pesos,

                        borderColor: '#16a34a',

                        backgroundColor:
                            'rgba(34,197,94,0.10)',

                        fill: true,

                        tension: 0.4,

                        borderWidth: 4

                    },

                    {

                        label: 'IMC',

                        data: imc,

                        borderColor: '#2563eb',

                        tension: 0.4,

                        borderWidth: 3

                    },

                    {

                        label: 'Músculo',

                        data: masaMuscular,

                        borderColor: '#9333ea',

                        tension: 0.4,

                        borderWidth: 3

                    },

                    {

                        label: 'Grasa',

                        data: grasa,

                        borderColor: '#ea580c',

                        tension: 0.4,

                        borderWidth: 3

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false

            }

        });

        mostrarTablaSeguimiento(datos);

    })

    .catch(error => {

        console.error(error);

                Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al cargar seguimiento"
        });

    });

}

function mostrarTablaSeguimiento(datos) {

    const tablaSeguimiento =
        document.getElementById(
            "tablaSeguimiento"
        );

    if (!tablaSeguimiento) return;

    if (!datos || datos.length === 0) {

        tablaSeguimiento.innerHTML = `
            <p>No hay seguimientos para este paciente.</p>
        `;

        return;
    }

    let html = `

    <div class="tabla-responsive">

        <table class="tabla-premium">

            <thead>

                <tr>

                    <th>Fecha</th>
                    <th>Peso</th>
                    <th>IMC</th>
                    <th>Músculo</th>
                    <th>Grasa</th>
                    <th>Comentarios</th>

                </tr>

            </thead>

            <tbody>
    `;

    datos.forEach(d => {

        html += `

            <tr>

                <td>
                    ${d.fecha || "-"}
                </td>

                <td>
                    ${d.peso || "-"} kg
                </td>

                <td>
                    ${d.imc || "-"}
                </td>

                <td>
                    ${d.masaMuscular || "-"} %
                </td>

                <td>
                    ${d.grasaCorporal || "-"} %
                </td>

                <td>
                    ${d.comentarios || "-"}
                </td>

            </tr>
        `;
    });

    html += `

            </tbody>

        </table>

    </div>
    `;

    tablaSeguimiento.innerHTML = html;
}
// 🔹 GUARDAR O EDITAR PLAN
function guardarPlan() {

    const planId = document.getElementById("planId")?.value;
    const pacienteId = document.getElementById("paciente")?.value;
    const fecha = document.getElementById("fecha")?.value;

    const colaciones = document.getElementById("colaciones")?.value;
    const recomendaciones = document.getElementById("recomendaciones")?.value;

    if (!pacienteId) {
            Swal.fire({
            icon: "warning",
            title: "Paciente no seleccionado",
            text: "Seleccioná un paciente"
        });
    document.getElementById("paciente").focus();
    return;
}

if (!fecha) {
            Swal.fire({
            icon: "warning",
            title: "Fecha requerida",
            text: "Seleccioná una fecha"
        });
    document.getElementById("fecha").focus();
    return;
}

// 🔥 VALIDAR DÍA 1

const desayuno1 =
    document.getElementById("desayuno_1")?.value.trim();

const almuerzo1 =
    document.getElementById("almuerzo_1")?.value.trim();

const cena1 =
    document.getElementById("cena_1")?.value.trim();

if (
    desayuno1 === "" &&
    almuerzo1 === "" &&
    cena1 === ""
) {
        Swal.fire({
            icon: "warning",
            title: "Plan incompleto",
            text: "Completá al menos una comida del Día 1"
        });
    document.getElementById("desayuno_1").focus();
    return;
}

    // 🔥 PLAN DE 15 DÍAS
    const dias = [];

        for (let i = 1; i <= 15; i++) {
            
            dias.push({
                numeroDia: i,
                desayuno: document.getElementById(`desayuno_${i}`).value,
                almuerzo: document.getElementById(`almuerzo_${i}`).value,
                merienda: document.getElementById(`merienda_${i}`).value,
                cena: document.getElementById(`cena_${i}`).value,
                mediaManana: document.getElementById(`media_${i}`).value,
            });
        }

    const plan = {
        fecha: fecha,
        dias: dias,
        colaciones: colaciones,
        recomendaciones: recomendaciones,
        paciente: {
            id: parseInt(pacienteId)
        }
    };

    const url = planId ? `${API_PLANES}/${planId}` : API_PLANES;
    const metodo = planId ? "PUT" : "POST";
    console.log("PLAN A ENVIAR:", plan);

    fetch(url, {
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(plan)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("No se pudo guardar el plan alimentario");
        }
        return res.json();
    })
   .then(() => {

    Swal.fire({
        icon: "success",
        title: "Plan alimentario",
        text: planId
            ? "Plan alimentario actualizado correctamente"
            : "Plan alimentario guardado correctamente"
    });

    limpiarFormularioPlan();
    buscarPlanesPorPaciente();

})
    .catch(error => {
        console.error("Error al guardar plan:", error);
                Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al guardar el plan alimentario"
        });
    });
}
function limpiarFormularioPlan() {
    const ids = [
    "planId",
    "paciente",
    "fecha",
    "colaciones",
    "recomendaciones"
];

    ids.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.value = "";
    });

    for (let i = 1; i <= 15; i++) {
    document.getElementById(`desayuno_${i}`).value = "";
    document.getElementById(`media_${i}`).value = "";
    document.getElementById(`almuerzo_${i}`).value = "";
    document.getElementById(`merienda_${i}`).value = "";
    document.getElementById(`cena_${i}`).value = "";
    }
}

// 🔹 BUSCAR PLANES POR PACIENTE
function buscarPlanesPorPaciente() {

    const pacienteId = document.getElementById("pacienteBusqueda")?.value;
    const listaPlanes = document.getElementById("listaPlanes");

    if (!pacienteId) {
                    Swal.fire({
                icon: "warning",
                title: "Paciente no seleccionado",
                text: "Seleccioná un paciente"
            });
        return;
    }

    fetch(`${API_PLANES}/paciente/${pacienteId}`)
        .then(res => res.json())
        .then(planes => {

            console.log(planes);

            listaPlanes.innerHTML = "";

            if (planes.length === 0) {
                listaPlanes.innerHTML = "<p>No hay planes alimentarios.</p>";
                return;
            }

            planes.forEach(plan => {

                const div = document.createElement("div");
                div.className = "plan-card";

                // 🔥 GENERAR DÍAS
                let htmlDias = "";

                if (plan.dias && plan.dias.length > 0) {

                    plan.dias.forEach((dia, index) => {

                        htmlDias += `
                            <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px; border-radius:10px;">

                                <h4>🍽️ Día ${index + 1}</h4>

                                <p><strong>Desayuno:</strong> ${dia.desayuno || "-"}</p>

                                <p><strong>Media mañana:</strong> ${dia.mediaManana || "-"}</p>

                                <p><strong>Almuerzo:</strong> ${dia.almuerzo || "-"}</p>

                                <p><strong>Merienda:</strong> ${dia.merienda || "-"}</p>

                                <p><strong>Cena:</strong> ${dia.cena || "-"}</p>

                            </div>
                        `;
                    });

                } else {

                    htmlDias = "<p>No hay días cargados.</p>";
                }

                div.innerHTML = `

                    <h3>📋 Plan Alimentario</h3>

                    <p><strong>Fecha:</strong> ${plan.fecha}</p>

                    ${htmlDias}

                    <p><strong>Colaciones:</strong> ${plan.colaciones || ""}</p>

                    <p><strong>Recomendaciones:</strong> ${plan.recomendaciones || ""}</p>

                    <button 
                        onclick='editarPlan(${JSON.stringify(plan)})'
                        class="btn-editar"
                    >
                        Editar
                    </button>

                    <button 
                        onclick="eliminarPlan(${plan.id})"
                        class="btn-eliminar"
                    >
                        Eliminar
                    </button>

                    <button 
                        onclick="descargarPDF(this)" 
                        class="btn-pdf"
                    >
                        Descargar PDF
                    </button>

                    <button 
                        onclick="enviarWhatsApp(this)" 
                        class="btn-wsp"
                        data-telefono="${plan.paciente?.telefono || ''}"
                    >
                        Enviar por WhatsApp
                    </button>

                `;

                listaPlanes.appendChild(div);
            });

        })
        .catch(error => {
            console.error(error);
                        Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al cargar planes"
            });
        });
}
function eliminarPlan(id) {
            const resultado = await Swal.fire({
            title: "¿Eliminar plan alimentario?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (!resultado.isConfirmed) {
            return;
        }

    fetch(`${API_PLANES}/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("No se pudo eliminar el plan");
        }
        Swal.fire({
            icon: "success",
            title: "Plan eliminado",
            text: "Plan eliminado correctamente"
        });
        buscarPlanesPorPaciente();
    })
    .catch(error => {
        console.error("Error al eliminar plan:", error);
                Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar el plan alimentario"
        });
    });
}

function editarPlan(plan) {

    // 🔹 DATOS GENERALES
    document.getElementById("planId").value = plan.id;
    document.getElementById("paciente").value = plan.paciente?.id || "";
    document.getElementById("fecha").value = plan.fecha || "";

    document.getElementById("colaciones").value =
        plan.colaciones || "";

    document.getElementById("recomendaciones").value =
        plan.recomendaciones || "";

    // 🔥 LIMPIAR PRIMERO
    for (let i = 1; i <= 15; i++) {

        document.getElementById(`desayuno_${i}`).value = "";
        document.getElementById(`media_${i}`).value = "";
        document.getElementById(`almuerzo_${i}`).value = "";
        document.getElementById(`merienda_${i}`).value = "";
        document.getElementById(`cena_${i}`).value = "";
    }

    // 🔥 CARGAR DÍAS
    if (plan.dias && plan.dias.length > 0) {

        plan.dias.forEach(dia => {

            const i = dia.numeroDia;

            document.getElementById(`desayuno_${i}`).value =
                dia.desayuno || "";

            document.getElementById(`media_${i}`).value =
                dia.mediaManana || "";

            document.getElementById(`almuerzo_${i}`).value =
                dia.almuerzo || "";

            document.getElementById(`merienda_${i}`).value =
                dia.merienda || "";

            document.getElementById(`cena_${i}`).value =
                dia.cena || "";
        });
    }

    // 🔥 SCROLL ARRIBA
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function guardarSeguimiento() {
    const pacienteId = document.getElementById("pacienteSelect").value;
    const fecha = document.getElementById("fecha").value;
    const peso = document.getElementById("peso").value;
    const imc = document.getElementById("imc").value;
    const comentarios = document.getElementById("comentarios").value;
    const masaMuscular = document.getElementById("masaMuscular").value;
    const grasaCorporal = document.getElementById("grasaCorporal").value;
    const grasaVisceral = document.getElementById("grasaVisceral").value;
    const tmb = document.getElementById("tmb").value;

    if (!pacienteId) {
            Swal.fire({
            icon: "warning",
            title: "Paciente no seleccionado",
            text: "Seleccioná un paciente"
        });
    document.getElementById("pacienteSelect").focus();
    return;
}

if (!fecha) {
            Swal.fire({
            icon: "warning",
            title: "Fecha requerida",
            text: "Seleccioná una fecha"
        });
    document.getElementById("fecha").focus();
    return;
}

if (!peso || isNaN(peso) || peso <= 0) {
            Swal.fire({
            icon: "warning",
            title: "Peso inválido",
            text: "Ingresá un peso válido"
        });
    document.getElementById("peso").focus();
    return;
}

    const datos = {
    fecha: fecha,
    peso: peso,
    imc: imc,
    notas: comentarios,

    masaMuscular: masaMuscular,
    grasaCorporal: grasaCorporal,
    grasaVisceral: grasaVisceral,
    tmb: tmb,

    paciente: {
        id: pacienteId
    }
};

fetch("http://localhost:8080/seguimientos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
})
.then(res => res.json())
.then(data => {
            Swal.fire({
            icon: "success",
            title: "Seguimiento guardado",
            text: "Seguimiento guardado correctamente"
        });
    cargarSeguimiento();
})
.catch(error => console.error("Error:", error));
} 

function mostrarAlturaPaciente(pacienteId) {

    fetch(`http://localhost:8080/pacientes/${pacienteId}`)

        .then(res => res.json())

        .then(data => {

            console.log("PACIENTE:", data);

            document.getElementById("alturaPaciente").innerText =
                data.altura || "-";

        })

        .catch(error => {
            console.error("Error cargando altura:", error);
        });
}


const selectPaciente = document.getElementById("pacienteSelect");

if (selectPaciente) {
    selectPaciente.addEventListener("change", function() {
        const pacienteId = this.value;
        if (pacienteId) {
            mostrarAlturaPaciente(pacienteId);
        }
    });
}


async function descargarPDF(boton) {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const card = boton.closest(".plan-card");

    // 🔹 PACIENTE
    const select = document.getElementById("pacienteBusqueda");
    let paciente = "Paciente";

    if (select && select.selectedIndex >= 0) {
        paciente = select.options[select.selectedIndex].text;
    }

    // 🔹 EXTRAER TEXTOS
    const textos = Array.from(card.querySelectorAll("p"))
        .map(p => p.innerText.trim())
        .filter(t => t !== "" && !t.toLowerCase().includes("fecha"));

    // 🔥 LOGO
    try {
        doc.addImage(LOGO, "JPEG", 150, 10, 40, 25);
    } catch {}

    let y = 40;

    // 🔷 HEADER
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("PLAN ALIMENTARIO PERSONALIZADO", 10, y);

    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Lic. Ludmila Benitez", 10, y);

    y += 8;
    doc.text(`Paciente: ${paciente}`, 10, y);

    y += 8;
    doc.text(`Fecha: ${new Date().toLocaleDateString("es-AR")}`, 10, y);

    y += 8;

    doc.setDrawColor(180);
    doc.line(10, y, 200, y);
    y += 10;

    // 🔥 CONFIG
    const comidasPorDia = 4;
    const totalDias = 15;

    let dia = 1;

    // 🔥 SOLO 15 DÍAS (CORREGIDO)
    for (let i = 0; i < totalDias * comidasPorDia; i += comidasPorDia) {

        // 🔷 SALTO DE PÁGINA
        if (y > 260) {
            doc.addPage();
            y = 20;
        }

        // 🔷 TÍTULO DÍA
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text(`DÍA ${dia}`, 10, y);
        y += 6;

        // 🔷 LÍNEA SEPARADORA
        doc.setDrawColor(200);
        doc.line(10, y, 200, y);
        y += 6;

        // 🔷 COMIDAS DEL DÍA
        for (let j = 0; j < comidasPorDia; j++) {

            const texto = textos[i + j];
            if (!texto) continue;

            let partes = texto.split(":");
            let titulo = partes[0]?.trim();
            let contenido = partes[1]?.trim();

            // TITULO
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text(titulo.toUpperCase(), 10, y);
            y += 5;

            // CONTENIDO
            doc.setFont("helvetica", "normal");

            const lineas = doc.splitTextToSize(contenido || "-", 180);

            lineas.forEach(l => {
                doc.text(l, 10, y);
                y += 5;
            });

            y += 2;
        }

        y += 6; // 🔥 MÁS AIRE ENTRE DÍAS
        dia++;
    }

    // 🔷 COLACIONES Y OBSERVACIONES (SIN DÍA 16)
    const extras = textos.slice(totalDias * comidasPorDia);

    if (extras.length > 0) {

        // salto si hace falta
        if (y > 260) {
            doc.addPage();
            y = 20;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("COLACIONES Y RECOMENDACIONES", 10, y);
        y += 6;

        doc.setDrawColor(180);
        doc.line(10, y, 200, y);
        y += 6;

        extras.forEach(texto => {

            let partes = texto.split(":");
            let titulo = partes[0];
            let contenido = partes[1];

            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text(titulo.toUpperCase(), 10, y);
            y += 5;

            doc.setFont("helvetica", "normal");

            const lineas = doc.splitTextToSize(contenido || "-", 180);

            lineas.forEach(l => {
                doc.text(l, 10, y);
                y += 5;
            });

            y += 3;
        });
    }

    // 🔷 FOOTER
    const paginas = doc.getNumberOfPages();

    for (let i = 1; i <= paginas; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text("Sistema de Gestión Nutricional", 10, 285);
    }

    doc.save("plan_alimentario.pdf");
}
function enviarWhatsApp(boton) {

    const card = boton.closest(".plan-card");

    const telefono = formatearTelefono(
        boton.getAttribute("data-telefono")
    );

    if (!telefono) {
                    Swal.fire({
                icon: "warning",
                title: "Teléfono no registrado",
                text: "El paciente no tiene teléfono registrado"
            });
        return;
    }

    const select = document.getElementById("pacienteBusqueda");
    let paciente = "";

    if (select && select.selectedIndex >= 0) {
        paciente = select.options[select.selectedIndex].text;
    }

    // 🔹 FECHA
    const textos = Array.from(card.querySelectorAll("p"))
        .map(p => p.innerText);

    const fecha = textos.find(t => t.toLowerCase().includes("fecha")) || "";

    // 🔥 ARMAR PLAN COMPLETO (15 DÍAS)
    let mensajePlan = "";

    const dias = card.querySelectorAll("div[style*='border']");

    dias.forEach((diaDiv, index) => {

        const comidas = diaDiv.querySelectorAll("p");

        mensajePlan += `\n📅 *DÍA ${index + 1}*\n`;

        comidas.forEach(p => {
            mensajePlan += p.innerText + "\n";
        });

    });

    // 🔹 COLACIONES Y RECOMENDACIONES
    const colaciones = textos.find(t => t.includes("Colaciones")) || "";
    const recomendaciones = textos.find(t => t.includes("Recomendaciones")) || "";

    // 🔥 MENSAJE FINAL
    let mensaje = `🍽️ *PLAN ALIMENTARIO PERSONALIZADO*\n\n`;

    mensaje += `👤 *Paciente:* ${paciente}\n`;
    mensaje += `📅 ${fecha}\n`;

    mensaje += mensajePlan + "\n";

    mensaje += `🥜 ${colaciones}\n\n`;

    mensaje += `💡 *Recomendaciones*\n${recomendaciones}\n\n`;

    mensaje += `👩‍⚕️ Lic. Benitez, Ludmila\n`;
    mensaje += `Sistema de Gestión Nutricional`;

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}


function formatearTelefono(numero) {

    if (!numero) return "";

    // eliminar todo lo que no sea número
    numero = numero.replace(/\D/g, "");

    // sacar 0 inicial si existe
    if (numero.startsWith("0")) {
        numero = numero.substring(1);
    }

    // agregar código país si falta
    if (!numero.startsWith("54")) {
        numero = "54" + numero;
    }

    // asegurar formato celular (549)
    if (!numero.startsWith("549")) {
        numero = numero.replace(/^54/, "549");
    }

    return numero;
}



function calcularIMC() {

    const peso =
        parseFloat(document.getElementById("peso")?.value);

    let altura = null;

    // 🔥 CASO PACIENTES-ADULTOS
    const inputAltura =
        document.getElementById("altura");

    if (inputAltura && inputAltura.value) {

        altura = parseFloat(
            inputAltura.value.replace(",", ".")
        );
    }

    // 🔥 CASO SEGUIMIENTO
    if (!altura) {

        const alturaPaciente =
            document.getElementById("alturaPaciente");

        if (alturaPaciente) {

            altura = parseFloat(
                alturaPaciente.innerText
                    .replace(",", ".")
                    .replace("cm", "")
                    .trim()
            );

            // convertir cm a metros
            if (altura > 3) {
                altura = altura / 100;
            }
        }
    }

    if (!peso || !altura) return;

    const imc =
        peso / (altura * altura);

    document.getElementById("imc").value =
        imc.toFixed(2);

    let clasificacion = "";

    if (imc < 18.5) {

        clasificacion = "Bajo peso";

    } else if (imc < 25) {

        clasificacion = "Normal";

    } else if (imc < 30) {

        clasificacion = "Sobrepeso";

    } else {

        clasificacion = "Obesidad";
    }

    document.getElementById("clasificacionIMC").innerHTML =
        `<b>${clasificacion}</b>`;
}



function calcularICC() {
    const cintura = parseFloat(document.getElementById("cintura").value);
    const cadera = parseFloat(document.getElementById("cadera").value);

    if (cintura && cadera) {
        const icc = cintura / cadera;
        document.getElementById("icc").value = icc.toFixed(2);
    }
}


function guardarPacientePediatrico() {

    const paciente = {
        nombre: document.getElementById("nombre").value,
        dni: document.getElementById("dni").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        edad: document.getElementById("edad").value,

        imcEdad: document.getElementById("imcEdad").value,
        pesoEdad: document.getElementById("pesoEdad").value,
        tallaEdad: document.getElementById("tallaEdad").value,

        tutor: document.getElementById("tutor").value,
        telefono: formatearTelefono(document.getElementById("telefono").value),
        email: document.getElementById("email").value,

        entrevista: document.getElementById("entrevista").value,

        nacimiento: {
            normal: document.getElementById("normal").checked,
            asistido: document.getElementById("asistido").checked
        },

        gestacion: {
            termino: document.getElementById("termino").checked,
            prematuro: document.getElementById("prematuro").checked
        },

        lactancia: {
            exclusiva: document.getElementById("exclusiva").checked,
            mixta: document.getElementById("mixta").checked,
            artificial: document.getElementById("artificial").checked
        }
    };

    fetch(API_PACIENTES_PEDIATRICOS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paciente)
    })
    .then(res => res.json())
    .then(() => {
                Swal.fire({
            icon: "success",
            title: "Paciente pediátrico guardado",
            text: "Los datos se guardaron correctamente"
        });
    })
    .catch(err => console.error(err));
}



document.getElementById("fechaNacimiento")?.addEventListener("change", function() {

    const fecha = new Date(this.value);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fecha.getFullYear();

    if (
        hoy.getMonth() < fecha.getMonth() ||
        (hoy.getMonth() === fecha.getMonth() && hoy.getDate() < fecha.getDate())
    ) {
        edad--;
    }

    document.getElementById("edad").value = edad;
});



// 🔥 SUBIR ARCHIVO DEL PACIENTE
async function subirArchivoPaciente() {

    console.log("CLICK SUBIR");

    if (!pacienteActualId) {
                Swal.fire({
            icon: "warning",
            title: "Paciente no guardado",
            text: "Primero guardá el paciente"
        });
        return;
    }

    const fileInput = document.getElementById("archivoInput");
    const file = fileInput.files[0];

    if (!file) {
                    Swal.fire({
                icon: "warning",
                title: "Archivo no seleccionado",
                text: "Seleccioná un archivo"
            });
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pacienteId", pacienteActualId);

    try {
        const res = await fetch("http://localhost:8080/api/archivos/upload", {
            method: "POST",
            body: formData
        });

        const text = await res.text();
        console.log("RESPUESTA:", text);

            Swal.fire({
            icon: "success",
            title: "Archivo subido",
            text: "El archivo se subió correctamente"
        });

        cargarArchivos(pacienteActualId);

    } catch (error) {
        console.error("ERROR:", error);
                Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al subir archivo"
        });
    }
}



async function cargarArchivos(pacienteId) {
    const res = await fetch(`http://localhost:8080/api/archivos/paciente/${pacienteId}`);
    const archivos = await res.json();

    const contenedor = document.getElementById("listaArchivos");
    contenedor.innerHTML = "";

    archivos.forEach(a => {
        const div = document.createElement("div");

        div.innerHTML = `
            📄 ${a.nombre}
            <button onclick="verArchivo(${a.id})">Ver</button>
            <button onclick="eliminarArchivo(${a.id})">Eliminar</button>
        `;

        contenedor.appendChild(div);
    });
}

function verArchivo(id) {
    window.open(`http://localhost:8080/api/archivos/${id}`, "_blank");
}

async function eliminarArchivo(id) {
    await fetch(`http://localhost:8080/api/archivos/${id}`, {
        method: "DELETE"
    });

    cargarArchivos(pacienteActualId);
}




