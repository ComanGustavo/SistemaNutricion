package com.nutrisystem.nutri_app.service;

import com.nutrisystem.nutri_app.model.Seguimiento;
import com.nutrisystem.nutri_app.model.Paciente;
import com.nutrisystem.nutri_app.repository.SeguimientoRepository;
import com.nutrisystem.nutri_app.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeguimientoService {

    @Autowired
    private SeguimientoRepository repository;

    @Autowired
    private PacienteRepository pacienteRepository;

    // 🔥 GUARDAR CON IMC AUTOMÁTICO
    public Seguimiento guardar(Seguimiento seguimiento) {

        Long pacienteId = seguimiento.getPaciente().getId();

        Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        seguimiento.setPaciente(paciente);

        // 🔥 CÁLCULO DE IMC
        Double peso = seguimiento.getPeso();
       Double altura = paciente.getAltura();

// 🔥 convertir cm a metros automáticamente
            if (altura != null && altura > 3) {
                altura = altura / 100;
            }

            if (peso != null && altura != null && altura > 0) {

                double imc = peso / (altura * altura);

                double imcRedondeado =
                        Math.round(imc * 100.0) / 100.0;

                seguimiento.setImc(imcRedondeado);

            // 🔥 CLASIFICACIÓN AUTOMÁTICA
            if (imcRedondeado < 18.5) {
                seguimiento.setClasificacion("Bajo peso");
            } else if (imcRedondeado < 25) {
                seguimiento.setClasificacion("Normal");
            } else if (imcRedondeado < 30) {
                seguimiento.setClasificacion("Sobrepeso");
            } else {
                seguimiento.setClasificacion("Obesidad");
            }

            System.out.println("IMC: " + imcRedondeado);
            System.out.println("Clasificación: " + seguimiento.getClasificacion());
        }

        return repository.save(seguimiento);
    }

    // 🔥 listar todos
    public List<Seguimiento> listar() {
        return repository.findAll();
    }

    // 🔥 listar por paciente
    public List<Seguimiento> listarPorPaciente(Long pacienteId) {
        return repository.findByPacienteId(pacienteId);
    }
}