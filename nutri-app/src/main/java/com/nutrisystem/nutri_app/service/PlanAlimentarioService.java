package com.nutrisystem.nutri_app.service;

import com.nutrisystem.nutri_app.model.DiaPlan;
import com.nutrisystem.nutri_app.model.PlanAlimentario;
import com.nutrisystem.nutri_app.repository.PlanAlimentarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlanAlimentarioService {

    private final PlanAlimentarioRepository planAlimentarioRepository;

    public PlanAlimentarioService(PlanAlimentarioRepository planAlimentarioRepository) {
        this.planAlimentarioRepository = planAlimentarioRepository;
    }

    public List<PlanAlimentario> listarTodos() {
        return planAlimentarioRepository.findAll();
    }

    public Optional<PlanAlimentario> buscarPorId(Long id) {
        return planAlimentarioRepository.findById(id);
    }

    public List<PlanAlimentario> listarPorPaciente(Long pacienteId) {
        return planAlimentarioRepository.findByPacienteId(pacienteId);
    }

    // 🔥 GUARDAR PLAN
    public PlanAlimentario guardar(PlanAlimentario plan) {

        if (plan.getDias() != null) {
            for (DiaPlan dia : plan.getDias()) {
                dia.setPlan(plan); // 🔥 vincular cada día al plan
            }
        }

        return planAlimentarioRepository.save(plan);
    }

    // 🔥 ACTUALIZAR PLAN (VERSIÓN CORRECTA PARA LISTA DE DÍAS)
    public PlanAlimentario actualizar(Long id, PlanAlimentario planActualizado) {

        PlanAlimentario planExistente = planAlimentarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan alimentario no encontrado con id: " + id));

        // ✔ Datos principales
        planExistente.setFecha(planActualizado.getFecha());
        planExistente.setColaciones(planActualizado.getColaciones());
        planExistente.setRecomendaciones(planActualizado.getRecomendaciones());
        planExistente.setPaciente(planActualizado.getPaciente());

        // 🔥 LIMPIAR DÍAS ANTERIORES
        planExistente.getDias().clear();

        // 🔥 CARGAR NUEVOS DÍAS
        if (planActualizado.getDias() != null) {
            for (DiaPlan dia : planActualizado.getDias()) {
                dia.setPlan(planExistente); // 🔥 clave
                planExistente.getDias().add(dia);
            }
        }

        return planAlimentarioRepository.save(planExistente);
    }

    public void eliminar(Long id) {
        planAlimentarioRepository.deleteById(id);
    }
}