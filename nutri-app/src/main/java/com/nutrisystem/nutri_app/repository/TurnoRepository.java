package com.nutrisystem.nutri_app.repository;

import com.nutrisystem.nutri_app.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno, Long> {

    List<Turno> findByFecha(String fecha);
}