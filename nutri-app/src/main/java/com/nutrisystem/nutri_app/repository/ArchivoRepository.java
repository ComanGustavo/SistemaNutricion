package com.nutrisystem.nutri_app.repository;

import com.nutrisystem.nutri_app.model.Archivo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArchivoRepository extends JpaRepository<Archivo, Long> {

    List<Archivo> findByPacienteId(Long pacienteId);

}