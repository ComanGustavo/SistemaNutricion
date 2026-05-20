package com.nutrisystem.nutri_app.controller;

import com.nutrisystem.nutri_app.model.Seguimiento;
import com.nutrisystem.nutri_app.service.SeguimientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seguimientos")
@CrossOrigin("*")
public class SeguimientoController {

    @Autowired
    private SeguimientoService service;

    @PostMapping
    public Seguimiento guardar(@RequestBody Seguimiento seguimiento) {
        return service.guardar(seguimiento);
    }

    @GetMapping
    public List<Seguimiento> listar() {
        return service.listar();
    }

    // 🔥 CLAVE: por paciente
    @GetMapping("/paciente/{id}")
    public List<Seguimiento> listarPorPaciente(@PathVariable Long id) {
        return service.listarPorPaciente(id);
    }
}
