package com.nutrisystem.nutri_app.controller;

import com.nutrisystem.nutri_app.model.DiaBloqueado;
import com.nutrisystem.nutri_app.service.DiaBloqueadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bloqueos")
@CrossOrigin(origins = "*")
public class DiaBloqueadoController {

    @Autowired
    private DiaBloqueadoService service;

    // 🔹 GUARDAR
    @PostMapping
    public DiaBloqueado guardar(@RequestBody DiaBloqueado dia) {
        return service.guardar(dia);
    }

    // 🔹 LISTAR
    @GetMapping
    public List<DiaBloqueado> listar() {
        return service.listar();
    }

    // 🔹 ELIMINAR
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}