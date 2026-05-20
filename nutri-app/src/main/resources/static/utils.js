function formatearTelefono(numero) {
    if (!numero) return "";

    numero = numero.replace(/\D/g, "");

    if (numero.startsWith("0")) {
        numero = numero.substring(1);
    }

    if (!numero.startsWith("54")) {
        numero = "54" + numero;
    }

    if (!numero.startsWith("549")) {
        numero = numero.replace(/^54/, "549");
    }

    return numero;
}