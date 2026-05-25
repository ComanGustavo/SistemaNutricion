const API_BASE = "http://localhost:8080";

// 🔹 GET
async function apiGet(endpoint) {
    try {

        const response = await fetch(`${API_BASE}${endpoint}`);

        if (!response.ok) {
            throw new Error("Error en GET");
        }

        return await response.json();

    } catch (error) {

        console.error("GET ERROR:", error);

        //Swal.fire({
         //   icon: "error",
          //  title: "Error de conexión",
          //  text: "No se pudo conectar con el servidor"
       // });

       throw error;
   }
}

// 🔹 POST
async function apiPost(endpoint, data) {
    try {

        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Error en POST");
        }

        return await response.json();

    } catch (error) {

        console.error("POST ERROR:", error);

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo guardar la información"
        });

        throw error;
    }
}

// 🔹 DELETE
async function apiDelete(endpoint) {
    try {

        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Error en DELETE");
        }

        return true;

    } catch (error) {

        console.error("DELETE ERROR:", error);

        //Swal.fire({
           // icon: "error",
           // title: "Error",
           // text: "No se pudo eliminar"
        //});

        throw error;
    }
}