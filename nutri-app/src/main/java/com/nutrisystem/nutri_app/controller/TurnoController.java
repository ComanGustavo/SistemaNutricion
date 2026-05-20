package com.nutrisystem.nutri_app.controller;

import com.nutrisystem.nutri_app.model.Turno;
import com.nutrisystem.nutri_app.repository.TurnoRepository;
import com.nutrisystem.nutri_app.service.TurnoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/turnos")
@CrossOrigin("*")
public class TurnoController {

    @Autowired
    private TurnoRepository turnoRepository;

    @Autowired
    private TurnoService turnoService;

    // ✅ CREAR TURNO
    @PostMapping
    public Turno crearTurno(@RequestBody Turno turno) {
        return turnoService.crearTurno(turno);
    }

    // ✅ LISTAR TODOS
    @GetMapping
    public List<Turno> listarTurnos() {
        return turnoService.listarTurnos();
    }

    // ✅ FILTRAR POR FECHA
    @GetMapping("/fecha/{fecha}")
    public List<Turno> turnosPorFecha(@PathVariable String fecha) {
        return turnoService.obtenerTurnosPorFecha(fecha);
    }

    // ✅ ELIMINAR TURNO
    @DeleteMapping("/{id}")
    public void cancelarTurno(@PathVariable Long id) {
        turnoService.cancelarTurno(id);
    }


    @GetMapping("/disponibilidad/{fecha}")
    public boolean hayDisponibilidad(@PathVariable String fecha) {

    List<Turno> turnos = turnoRepository.findByFecha(fecha);

    int totalHorarios = 12; // 08:00 a 20:00 cada 1h (ajustable)

    return turnos.size() < totalHorarios;
    }

    @PutMapping("/{id}")
    public Turno actualizarTurno(@PathVariable Long id, @RequestBody Turno turnoActualizado) {

    Turno turno = turnoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Turno no encontrado"));

    turno.setFecha(turnoActualizado.getFecha());
    turno.setHora(turnoActualizado.getHora());
    turno.setPacienteNombre(turnoActualizado.getPacienteNombre());
    turno.setTipoConsulta(turnoActualizado.getTipoConsulta());

    return turnoRepository.save(turno);
    }
}