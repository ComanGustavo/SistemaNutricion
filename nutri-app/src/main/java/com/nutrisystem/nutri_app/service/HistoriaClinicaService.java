package com.nutrisystem.nutri_app.service;

import com.nutrisystem.nutri_app.model.HistoriaClinica;
import com.nutrisystem.nutri_app.model.Paciente;
import com.nutrisystem.nutri_app.repository.HistoriaClinicaRepository;
import com.nutrisystem.nutri_app.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoriaClinicaService {

    @Autowired
    private HistoriaClinicaRepository repository;

    @Autowired
    private PacienteRepository pacienteRepository;

    public HistoriaClinica guardar(HistoriaClinica historia) {

        Long pacienteId = historia.getPaciente().getId();

        Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        historia.setPaciente(paciente);

        return repository.save(historia);
    }

    // 🔥 ESTE FALTABA
    public List<HistoriaClinica> listar() {
        return repository.findAll();
    }
}
