package com.nutrisystem.nutri_app.repository;

import com.nutrisystem.nutri_app.model.Seguimiento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeguimientoRepository extends JpaRepository<Seguimiento, Long> {

    // 🔥 Esto es clave: buscar seguimientos por paciente
    List<Seguimiento> findByPacienteId(Long pacienteId);
}
