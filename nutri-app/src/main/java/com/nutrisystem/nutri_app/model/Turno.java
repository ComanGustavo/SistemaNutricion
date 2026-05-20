package com.nutrisystem.nutri_app.model;

import jakarta.persistence.*;

@Entity
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fecha;
    private String hora;
    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;
    private String tipoConsulta;
    private String estado;
    private String pacienteNombre;

    // CONSTRUCTOR VACÍO
    public Turno() {}

    // GETTERS Y SETTERS
    public Long getId() {
        return id;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public Paciente getPaciente() {
    return paciente;
    }

    public void setPaciente(Paciente paciente) {
    this.paciente = paciente;
    }

    public String getTipoConsulta() {
        return tipoConsulta;
    }

    public void setTipoConsulta(String tipoConsulta) {
        this.tipoConsulta = tipoConsulta;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getPacienteNombre() {
    return pacienteNombre;
    }

    public void setPacienteNombre(String pacienteNombre) {
    this.pacienteNombre = pacienteNombre;
}
}
