package com.nutrisystem.nutri_app.service;

import com.nutrisystem.nutri_app.model.DiaBloqueado;
import com.nutrisystem.nutri_app.repository.DiaBloqueadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiaBloqueadoService {

    @Autowired
    private DiaBloqueadoRepository repository;

    // 🔹 GUARDAR
    public DiaBloqueado guardar(DiaBloqueado dia) {
        return repository.save(dia);
    }

    // 🔹 LISTAR TODOS
    public List<DiaBloqueado> listar() {
        return repository.findAll();
    }

    // 🔹 ELIMINAR
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}