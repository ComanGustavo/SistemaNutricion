package com.nutrisystem.nutri_app.service;

import com.nutrisystem.nutri_app.model.Paciente;
import com.nutrisystem.nutri_app.model.PlanAlimentario;
import com.nutrisystem.nutri_app.model.Seguimiento;
import com.nutrisystem.nutri_app.repository.PacienteRepository;
import com.nutrisystem.nutri_app.repository.PlanAlimentarioRepository;
import com.nutrisystem.nutri_app.repository.SeguimientoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class PacienteService {

    @Autowired
    private PacienteRepository repository;

    @Autowired
    private PlanAlimentarioRepository planRepository;

    @Autowired
    private SeguimientoRepository seguimientoRepository;

    // Guardar paciente
    public Paciente guardar(Paciente paciente) {
        return repository.save(paciente);
    }



    public Paciente obtenerPorId(Long id) {
    return repository.findById(id).orElse(null);
}
    // Listar pacientes
    public List<Paciente> listar() {
        return repository.findAll();
    }

    // 🔴 ELIMINAR paciente (esto faltaba)
    public void eliminar(Long id) {

    // 🔹 BORRAR PLANES
    List<PlanAlimentario> planes =
            planRepository.findByPacienteId(id);

    planRepository.deleteAll(planes);

    // 🔹 BORRAR SEGUIMIENTOS
    List<Seguimiento> seguimientos =
            seguimientoRepository.findByPacienteId(id);

    seguimientoRepository.deleteAll(seguimientos);

    // 🔹 BORRAR PACIENTE
    repository.deleteById(id);
}
    public Paciente actualizar(Long id, Paciente pacienteActualizado) {
    Paciente paciente = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

    paciente.setNombre(pacienteActualizado.getNombre());
    paciente.setApellido(pacienteActualizado.getApellido());
    paciente.setEdad(pacienteActualizado.getEdad());
    paciente.setPeso(pacienteActualizado.getPeso());
    paciente.setAltura(pacienteActualizado.getAltura());
    paciente.setTelefono(pacienteActualizado.getTelefono());
paciente.setEmail(pacienteActualizado.getEmail());
paciente.setDireccion(pacienteActualizado.getDireccion());
paciente.setOcupacion(pacienteActualizado.getOcupacion());

paciente.setImc(pacienteActualizado.getImc());

paciente.setGrasaCorporal(pacienteActualizado.getGrasaCorporal());
paciente.setMasaMuscular(pacienteActualizado.getMasaMuscular());
paciente.setGrasaVisceral(pacienteActualizado.getGrasaVisceral());

paciente.setCintura(pacienteActualizado.getCintura());
paciente.setCadera(pacienteActualizado.getCadera());
paciente.setIcc(pacienteActualizado.getIcc());

paciente.setEntrevista(pacienteActualizado.getEntrevista());

paciente.setEnfermedadesPrevias(
        pacienteActualizado.getEnfermedadesPrevias());

paciente.setMedicacion(
        pacienteActualizado.getMedicacion());

paciente.setAlergiasAlimentarias(
        pacienteActualizado.getAlergiasAlimentarias());

    return repository.save(paciente);
    }
} 

    