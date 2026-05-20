package com.nutrisystem.nutri_app.repository;

import com.nutrisystem.nutri_app.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
}
