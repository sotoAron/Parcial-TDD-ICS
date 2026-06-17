const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const { calcularDescuento } = require("../../calculadora");

let precioInicial = 0;
let precioFinal = 0;

Given("un producto que cuesta {int} pesos", function (precio) {
  precioInicial = precio;
});

When("le aplico un descuento del {int} por ciento", function (porcentaje) {
  precioFinal = calcularDescuento(precioInicial, porcentaje);
});

Then("el precio final debe ser {int} pesos", function (resultadoEsperado) {
  assert.strictEqual(precioFinal, resultadoEsperado);
});
