package com.nutrisystem.nutri_app.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Seguimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double peso;
    private LocalDate fecha;
    private String notas;
    private Double masaMuscular;
    private Double grasaCorporal;
    private Double grasaVisceral;
    private Double tmb;
    private Double imc;
    private String clasificacion;

    @ManyToOne
    private Paciente paciente;

    public Seguimiento() {}

    public Long getId() {
        return id;
    }

    public Double getPeso() {
        return peso;
    }

    public void setPeso(Double peso) {
        this.peso = peso;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getNotas() {
        return notas;
    }

    public void setNotas(String notas) {
        this.notas = notas;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Double getMasaMuscular() {
        return masaMuscular;
    }

    public void setMasaMuscular(Double masaMuscular) {
        this.masaMuscular = masaMuscular;
    }

    public Double getGrasaCorporal() {
        return grasaCorporal;
    }

    public void setGrasaCorporal(Double grasaCorporal) {
        this.grasaCorporal = grasaCorporal;
    }

    public Double getGrasaVisceral() {
        return grasaVisceral;
    }

    public void setGrasaVisceral(Double grasaVisceral) {
        this.grasaVisceral = grasaVisceral;
    }

    public Double getTmb() {
        return tmb;
    }

    public void setTmb(Double tmb) {
        this.tmb = tmb;
    }

    public Double getImc() {
        return imc;
    }

    public void setImc(Double imc) {
        this.imc = imc;
    }

    public String getClasificacion() {
        return clasificacion;
    }

    public void setClasificacion(String clasificacion) {
        this.clasificacion = clasificacion;
    }
}