package com.nutrisystem.nutri_app.controller;

import com.nutrisystem.nutri_app.model.Archivo;
import com.nutrisystem.nutri_app.repository.ArchivoRepository;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/archivos")
@CrossOrigin("*")
public class ArchivoController {

    private final String RUTA = "C:/nutricion/uploads/";

    private final ArchivoRepository archivoRepository;

    public ArchivoController(ArchivoRepository archivoRepository) {
        this.archivoRepository = archivoRepository;
    }

    // 🔥 SUBIR ARCHIVO
    @PostMapping("/upload")
    public ResponseEntity<String> subirArchivo(
            @RequestParam("file") MultipartFile file,
            @RequestParam("pacienteId") Long pacienteId) {

        try {
            // 🔥 EVITA ARCHIVOS CON MISMO NOMBRE
            String nombre = System.currentTimeMillis() + "_" + file.getOriginalFilename().replaceAll(" ", "_");
            String rutaCompleta = RUTA + nombre;

            File directorio = new File(RUTA);
            if (!directorio.exists()) {
                directorio.mkdirs();
            }

            File destino = new File(rutaCompleta);
            file.transferTo(destino);

            Archivo archivo = new Archivo();
            archivo.setNombre(nombre);
            archivo.setRuta(rutaCompleta);
            archivo.setPacienteId(pacienteId);
            archivo.setFecha(LocalDate.now());

            archivoRepository.save(archivo);

            return ResponseEntity.ok("Archivo subido correctamente");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error al subir archivo");
        }
    }

    // 🔥 LISTAR ARCHIVOS POR PACIENTE
    @GetMapping("/paciente/{id}")
    public ResponseEntity<List<Archivo>> obtenerArchivosPorPaciente(@PathVariable Long id) {
        return ResponseEntity.ok(archivoRepository.findByPacienteId(id));
    }

    // 🔥 VER ARCHIVO (PDF / IMAGEN)
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> verArchivo(@PathVariable Long id) {
        try {
            Archivo archivo = archivoRepository.findById(id).orElseThrow();

            File file = new File(archivo.getRuta());

            byte[] contenido = Files.readAllBytes(file.toPath());

            String tipo = Files.probeContentType(file.toPath());

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + archivo.getNombre() + "\"")
                    .contentType(MediaType.parseMediaType(tipo != null ? tipo : "application/octet-stream"))
                    .body(contenido);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    // 🔥 ELIMINAR ARCHIVO
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarArchivo(@PathVariable Long id) {
        try {
            Archivo archivo = archivoRepository.findById(id).orElseThrow();

            File file = new File(archivo.getRuta());

            if (file.exists()) {
                file.delete();
            }

            archivoRepository.deleteById(id);

            return ResponseEntity.ok("Archivo eliminado");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error al eliminar archivo");
        }
    }
}