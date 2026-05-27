package com.nutrisystem.nutri_app.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔹 Datos básicos
    private String nombre;
    private String apellido;
    private String dni;

    private LocalDate fechaNacimiento;

    private int edad;

    private String telefono;
    private String email;
    private String direccion;
    private String ocupacion;

    // 🔹 Datos corporales
    private Double peso;
    private Double altura;
    private Double imc;
    private Double grasaCorporal;
    private Double masaMuscular;
    private Double grasaVisceral;

    private Double cintura;
    private Double cadera;
    private Double icc;

    private String entrevista;

    // 🔹 Salud
    private String enfermedadesPrevias;
    private String medicacion;
    private String alergiasAlimentarias;

    public Paciente() {
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

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
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

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getOcupacion() {
        return ocupacion;
    }

    public void setOcupacion(String ocupacion) {
        this.ocupacion = ocupacion;
    }

    public Double getPeso() {
        return peso;
    }

    public void setPeso(Double peso) {
        this.peso = peso;
    }

    public Double getAltura() {
        return altura;
    }

    public void setAltura(Double altura) {
        this.altura = altura;
    }

    public String getEnfermedadesPrevias() {
        return enfermedadesPrevias;
    }

    public void setEnfermedadesPrevias(String enfermedadesPrevias) {
        this.enfermedadesPrevias = enfermedadesPrevias;
    }

    public String getMedicacion() {
        return medicacion;
    }

    public void setMedicacion(String medicacion) {
        this.medicacion = medicacion;
    }

    public String getAlergiasAlimentarias() {
        return alergiasAlimentarias;
    }

    public void setAlergiasAlimentarias(String alergiasAlimentarias) {
        this.alergiasAlimentarias = alergiasAlimentarias;
    }

    public Double getImc() {
    return imc;
}

public void setImc(Double imc) {
    this.imc = imc;
}

public Double getGrasaCorporal() {
    return grasaCorporal;
}

public void setGrasaCorporal(Double grasaCorporal) {
    this.grasaCorporal = grasaCorporal;
}

public Double getMasaMuscular() {
    return masaMuscular;
}

public void setMasaMuscular(Double masaMuscular) {
    this.masaMuscular = masaMuscular;
}

public Double getGrasaVisceral() {
    return grasaVisceral;
}

public void setGrasaVisceral(Double grasaVisceral) {
    this.grasaVisceral = grasaVisceral;
}

public Double getCintura() {
    return cintura;
}

public void setCintura(Double cintura) {
    this.cintura = cintura;
}

public Double getCadera() {
    return cadera;
}

public void setCadera(Double cadera) {
    this.cadera = cadera;
}

public Double getIcc() {
    return icc;
}

public void setIcc(Double icc) {
    this.icc = icc;
}

public String getEntrevista() {
    return entrevista;
}

public void setEntrevista(String entrevista) {
    this.entrevista = entrevista;
}
}