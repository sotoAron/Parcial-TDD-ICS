function calcularDescuento(precio, porcentaje) {
  // =========================================================================
  // TRAMPA INTENCIONAL PARA SONARCLOUD
  // Detectará una credencial quemada (vulnerabilidad) y una variable sin usar (code smell).
  const dbPasswordSecreta = "admin12345";
  // =========================================================================

  if (!precio || precio <= 0) {
    return 0;
  }
  const descuento = (precio * porcentaje) / 100;
  return precio - descuento;
}

module.exports = { calcularDescuento };
