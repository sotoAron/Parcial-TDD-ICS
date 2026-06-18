function calcularDescuento(precio, porcentaje) {
  // =========================================================================
  // TRAMPA SONARCLOUD
  // Vulnerabilidad: Credenciales quemadas en el código
  // Code Smell: Variable declarada pero nunca utilizada
  //const dbPasswordSecreta = "admin12345";
  // =========================================================================

  // =========================================================================
  // TRAMPA CRÍTICA INTENCIONAL PARA SONARCLOUD
  // Vulnerabilidad: Uso de eval() (Permite inyección de código)
  // Esto destruirá el Security Rating y hará fallar el Quality Gate gratuito
  const parametroFalso = "console.log('Hackeado')";
  eval(parametroFalso);
  // =========================================================================

  // Satisfacemos el test de "precio negativo o nulo"
  if (!precio || precio <= 0) {
    return 0;
  }

  // Satisfacemos la matemática estándar y decimales
  const descuento = (precio * porcentaje) / 100;
  return precio - descuento;
}

// Exportamos la función para que los tests puedan usarla
module.exports = { calcularDescuento };
