package com.nutrisystem.nutri_app.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class PacientePediatrico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔹 Datos básicos
    private String nombre;
    private String dni;

    private LocalDate fechaNacimiento;

    private int edad;

    // 🔹 Tutor
    private String tutor;
    private String telefono;
    private String email;

    // 🔹 Entrevista
    @Column(length = 5000)
    private String entrevista;

    // 🔹 Nacimiento
    private boolean normal;
    private boolean asistido;

    // 🔹 Gestación
    private boolean termino;
    private boolean prematuro;

    // 🔹 Lactancia
    private boolean exclusiva;
    private boolean mixta;
    private boolean artificial;

    // 🔹 Indicadores pediátricos
    private String imcEdad;
    private String pesoEdad;
    private String tallaEdad;

    public PacientePediatrico() {
    }

    // =========================
    // GETTERS Y SETTERS
    // =========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public String getTutor() {
        return tutor;
    }

    public void setTutor(String tutor) {
        this.tutor = tutor;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEntrevista() {
        return entrevista;
    }

    public void setEntrevista(String entrevista) {
        this.entrevista = entrevista;
    }

    public boolean isNormal() {
        return normal;
    }

    public void setNormal(boolean normal) {
        this.normal = normal;
    }

    public boolean isAsistido() {
        return asistido;
    }

    public void setAsistido(boolean asistido) {
        this.asistido = asistido;
    }

    public boolean isTermino() {
        return termino;
    }

    public void setTermino(boolean termino) {
        this.termino = termino;
    }

    public boolean isPrematuro() {
        return prematuro;
    }

    public void setPrematuro(boolean prematuro) {
        this.prematuro = prematuro;
    }

    public boolean isExclusiva() {
        return exclusiva;
    }

    public void setExclusiva(boolean exclusiva) {
        this.exclusiva = exclusiva;
    }

    public boolean isMixta() {
        return mixta;
    }

    public void setMixta(boolean mixta) {
        this.mixta = mixta;
    }

    public boolean isArtificial() {
        return artificial;
    }

    public void setArtificial(boolean artificial) {
        this.artificial = artificial;
    }

    public String getImcEdad() {
        return imcEdad;
    }

    public void setImcEdad(String imcEdad) {
        this.imcEdad = imcEdad;
    }

    public String getPesoEdad() {
        return pesoEdad;
    }

    public void setPesoEdad(String pesoEdad) {
        this.pesoEdad = pesoEdad;
    }

    public String getTallaEdad() {
        return tallaEdad;
    }

    public void setTallaEdad(String tallaEdad) {
        this.tallaEdad = tallaEdad;
    }
}