Feature: Aplicar descuentos a los productos
  Como responsable de ventas
  Quiero que el sistema calcule automáticamente el precio final con descuento
  Para evitar errores de cobro a los clientes y mantener la confianza

  Scenario: Descuento estándar del 10%
    Given un producto que cuesta 100 pesos
    When se le aplica un descuento del 10 por ciento
    Then el precio final a pagar debe ser 90 pesos
    # Then el precio final a pagar debe ser 80 pesos