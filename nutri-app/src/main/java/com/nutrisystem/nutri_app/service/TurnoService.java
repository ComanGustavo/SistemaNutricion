package com.nutrisystem.nutri_app.service;

import com.nutrisystem.nutri_app.model.Paciente;
import com.nutrisystem.nutri_app.model.Turno;
import com.nutrisystem.nutri_app.repository.PacienteRepository;
import com.nutrisystem.nutri_app.repository.TurnoRepository;
import com.nutrisystem.nutri_app.repository.DiaBloqueadoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TurnoService {

    @Autowired
    private TurnoRepository turnoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private DiaBloqueadoRepository diaBloqueadoRepository;

    // ==========================
    // 🔥 CREAR TURNO (PRO)
    // ==========================
    public Turno crearTurno(Turno turno) {

        // 🔴 VALIDAR DÍA BLOQUEADO
        boolean diaBloqueado = diaBloqueadoRepository
                .findAll()
                .stream()
                .anyMatch(d -> d.getFecha().equals(turno.getFecha()));

        if (diaBloqueado) {
            throw new RuntimeException("No se pueden crear turnos en días bloqueados");
        }

        // 🔴 VALIDAR TURNO DUPLICADO
        boolean existe = turnoRepository
                .findAll()
                .stream()
                .anyMatch(t ->
                        t.getFecha().equals(turno.getFecha()) &&
                        t.getHora().equals(turno.getHora()) &&
                        !"CANCELADO".equals(t.getEstado())
                );

        if (existe) {
            throw new RuntimeException("Ese horario ya está ocupado");
        }

        // 🔵 BUSCAR PACIENTE REAL
        Paciente paciente = pacienteRepository
                .findById(turno.getPaciente().getId())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        turno.setPaciente(paciente);

        // 🔵 ESTADO POR DEFECTO
        turno.setEstado("ACTIVO");

        // 💾 GUARDAR
        return turnoRepository.save(turno);
    }

    // ==========================
    // 📋 LISTAR TODOS
    // ==========================
    public List<Turno> listarTurnos() {
        return turnoRepository.findAll();
    }

    // ==========================
    // 📅 FILTRAR POR FECHA
    // ==========================
    public List<Turno> obtenerTurnosPorFecha(String fecha) {
        return turnoRepository.findByFecha(fecha);
    }

    // ==========================
    // ❌ CANCELAR TURNO
    // ==========================
    public void cancelarTurno(Long id) {
        Turno turno = turnoRepository.findById(id).orElseThrow();
        turno.setEstado("CANCELADO");
        turnoRepository.save(turno);
    }
}