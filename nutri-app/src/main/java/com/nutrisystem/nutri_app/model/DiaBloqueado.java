package com.nutrisystem.nutri_app.model;

import jakarta.persistence.*;

@Entity
public class DiaBloqueado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fecha;

    public DiaBloqueado() {}

    public DiaBloqueado(String fecha) {
        this.fecha = fecha;
    }

    public Long getId() {
        return id;
    }

    public String getFecha() {
        return fecha;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
}