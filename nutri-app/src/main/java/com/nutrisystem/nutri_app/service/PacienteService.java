package com.nutrisystem.nutri_app.service;

import com.nutrisystem.nutri_app.model.Paciente;
import com.nutrisystem.nutri_app.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository repository;

    // Guardar paciente
    public Paciente guardar(Paciente paciente) {
        return repository.save(paciente);
    }



    public Paciente obtenerPorId(Long id) {
    return repository.findById(id).orElse(null);
}
    // Listar pacientes
    public List<Paciente> listar() {
        return repository.findAll();
    }

    // 🔴 ELIMINAR paciente (esto faltaba)
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
    
    public Paciente actualizar(Long id, Paciente pacienteActualizado) {
    Paciente paciente = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

    paciente.setNombre(pacienteActualizado.getNombre());
    paciente.setApellido(pacienteActualizado.getApellido());
    paciente.setEdad(pacienteActualizado.getEdad());
    paciente.setPeso(pacienteActualizado.getPeso());
    paciente.setAltura(pacienteActualizado.getAltura());

    return repository.save(paciente);
    }
} 

    