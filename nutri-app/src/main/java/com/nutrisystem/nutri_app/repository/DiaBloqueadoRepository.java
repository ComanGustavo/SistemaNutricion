package com.nutrisystem.nutri_app.repository;

import com.nutrisystem.nutri_app.model.DiaBloqueado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaBloqueadoRepository extends JpaRepository<DiaBloqueado, Long> {

    boolean existsByFecha(String fecha);

    List<DiaBloqueado> findAll();

}