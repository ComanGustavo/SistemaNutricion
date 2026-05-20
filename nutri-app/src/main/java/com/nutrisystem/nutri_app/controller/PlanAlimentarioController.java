package com.nutrisystem.nutri_app.controller;

import com.nutrisystem.nutri_app.model.PlanAlimentario;
import com.nutrisystem.nutri_app.service.PlanAlimentarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/planes")
@CrossOrigin(origins = "*")
public class PlanAlimentarioController {

    private final PlanAlimentarioService planAlimentarioService;

    public PlanAlimentarioController(PlanAlimentarioService planAlimentarioService) {
        this.planAlimentarioService = planAlimentarioService;
    }

    @GetMapping
    public List<PlanAlimentario> listarTodos() {
        return planAlimentarioService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<PlanAlimentario> buscarPorId(@PathVariable Long id) {
        return planAlimentarioService.buscarPorId(id);
    }

    @GetMapping("/paciente/{pacienteId}")
    public List<PlanAlimentario> listarPorPaciente(@PathVariable Long pacienteId) {
        return planAlimentarioService.listarPorPaciente(pacienteId);
    }

    @PostMapping
    public PlanAlimentario guardar(@RequestBody PlanAlimentario planAlimentario) {
        return planAlimentarioService.guardar(planAlimentario);
    }

    @PutMapping("/{id}")
    public PlanAlimentario actualizar(@PathVariable Long id, @RequestBody PlanAlimentario planAlimentario) {
        return planAlimentarioService.actualizar(id, planAlimentario);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        planAlimentarioService.eliminar(id);
    }
}