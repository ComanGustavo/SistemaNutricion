package com.nutrisystem.nutri_app.controller;

import com.nutrisystem.nutri_app.model.HistoriaClinica;
import com.nutrisystem.nutri_app.service.HistoriaClinicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/historias")
@CrossOrigin("*")
public class HistoriaClinicaController {

    @Autowired
    private HistoriaClinicaService service;

    @PostMapping
    public HistoriaClinica guardar(@RequestBody HistoriaClinica historia) {
        return service.guardar(historia);
    }

    @GetMapping
    public List<HistoriaClinica> listar() {
        return service.listar();
    }
}