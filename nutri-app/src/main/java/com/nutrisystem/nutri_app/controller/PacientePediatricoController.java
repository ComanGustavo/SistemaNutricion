package com.nutrisystem.nutri_app.controller;

import com.nutrisystem.nutri_app.model.PacientePediatrico;
import com.nutrisystem.nutri_app.repository.PacientePediatricoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pacientes-pediatricos")
@CrossOrigin(origins = "*")
public class PacientePediatricoController {

    @Autowired
    private PacientePediatricoRepository repository;

    // 🔹 LISTAR
    @GetMapping
    public List<PacientePediatrico> listar() {
        return repository.findAll();
    }

    // 🔹 GUARDAR
    @PostMapping
    public PacientePediatrico guardar(
            @RequestBody PacientePediatrico paciente) {

        return repository.save(paciente);
    }

    // 🔹 ELIMINAR
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
