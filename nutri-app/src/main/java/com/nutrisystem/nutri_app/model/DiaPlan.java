package com.nutrisystem.nutri_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "dia_plan")
public class DiaPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int numeroDia;

    @Column(length = 1000)
    private String desayuno;

    @Column(length = 1000)
    private String mediaManana;

    @Column(length = 1000)
    private String almuerzo;

    @Column(length = 1000)
    private String merienda;

    @Column(length = 1000)
    private String cena;

    @Column(length = 1000)
    private String colaciones;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "plan_id")
    private PlanAlimentario plan;

    public DiaPlan() {
    }

    // 🔹 GETTERS Y SETTERS

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumeroDia() {
        return numeroDia;
    }

    public void setNumeroDia(int numeroDia) {
        this.numeroDia = numeroDia;
    }

    public String getDesayuno() {
        return desayuno;
    }

    public void setDesayuno(String desayuno) {
        this.desayuno = desayuno;
    }

    public String getMediaManana() {
        return mediaManana;
    }

    public void setMediaManana(String mediaManana) {
        this.mediaManana = mediaManana;
    }

    public String getAlmuerzo() {
        return almuerzo;
    }

    public void setAlmuerzo(String almuerzo) {
        this.almuerzo = almuerzo;
    }

    public String getMerienda() {
        return merienda;
    }

    public void setMerienda(String merienda) {
        this.merienda = merienda;
    }

    public String getCena() {
        return cena;
    }

    public void setCena(String cena) {
        this.cena = cena;
    }

    public String getColaciones() {
        return colaciones;
    }

    public void setColaciones(String colaciones) {
        this.colaciones = colaciones;
    }

    public PlanAlimentario getPlan() {
        return plan;
    }

    public void setPlan(PlanAlimentario plan) {
        this.plan = plan;
    }

    // 🔹 OPCIONAL (DEBUG PRO)
    @Override
    public String toString() {
        return "DiaPlan{" +
                "numeroDia=" + numeroDia +
                ", desayuno='" + desayuno + '\'' +
                ", almuerzo='" + almuerzo + '\'' +
                ", merienda='" + merienda + '\'' +
                ", cena='" + cena + '\'' +
                '}';
    }
}