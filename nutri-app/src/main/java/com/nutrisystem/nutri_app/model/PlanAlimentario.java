package com.nutrisystem.nutri_app.model;

import java.util.List;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "plan_alimentario")
public class PlanAlimentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;

    @Column(length = 1000)
    private String colaciones;

    @Column(length = 2000)
    private String recomendaciones;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DiaPlan> dias;

    public PlanAlimentario() {}

    public Long getId() {
        return id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getColaciones() {
        return colaciones;
    }

    public void setColaciones(String colaciones) {
        this.colaciones = colaciones;
    }

    public String getRecomendaciones() {
        return recomendaciones;
    }

    public void setRecomendaciones(String recomendaciones) {
        this.recomendaciones = recomendaciones;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public List<DiaPlan> getDias() {
        return dias;
    }

    public void setDias(List<DiaPlan> dias) {
        this.dias = dias;
    }
}