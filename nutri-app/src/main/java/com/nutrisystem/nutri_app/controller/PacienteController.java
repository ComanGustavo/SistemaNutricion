package com.nutrisystem.nutri_app.controller;

import com.nutrisystem.nutri_app.model.Paciente;
import com.nutrisystem.nutri_app.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pacientes")
@CrossOrigin("*")
public class PacienteController {

    @Autowired
    private PacienteService service;

    @PostMapping
    public Paciente guardar(@RequestBody Paciente paciente) {
        return service.guardar(paciente);
    }

    @GetMapping
    public List<Paciente> listar() {
        return service.listar();
    }


    @GetMapping("/{id}")
    public Paciente obtenerPorId(@PathVariable Long id) {
         return service.obtenerPorId(id);
        }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }

    @PutMapping("/{id}")
    public Paciente actualizar(@PathVariable Long id, @RequestBody Paciente paciente) {
        return service.actualizar(id, paciente);
    }
}