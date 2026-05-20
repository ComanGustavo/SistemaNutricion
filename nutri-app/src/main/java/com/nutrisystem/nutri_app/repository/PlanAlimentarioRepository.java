package com.nutrisystem.nutri_app.repository;

import com.nutrisystem.nutri_app.model.PlanAlimentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanAlimentarioRepository extends JpaRepository<PlanAlimentario, Long> {

    List<PlanAlimentario> findByPacienteId(Long pacienteId);
}