Feature: Aplicar descuentos a productos
  Como usuario del sistema
  Quiero poder calcular el descuento de un producto
  Para saber el precio final a pagar

  Scenario: Calcular el descuento del 10 por ciento a un producto de 100 pesos
    Given un producto que cuesta 100 pesos
    When le aplico un descuento del 10 por ciento
    Then el precio final debe ser 90 pesos