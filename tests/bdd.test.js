const { loadFeature, defineFeature } = require("jest-cucumber");
const { calcularDescuento } = require("../calculadora");

// Cargamos el archivo de texto escrito por negocio
const feature = loadFeature("./features/descuento.feature");

defineFeature(feature, (test) => {
  test("Descuento estándar del 10%", ({ given, when, then }) => {
    let precioOriginal;
    let porcentajeDescuento;
    let precioFinal;

    given(/^un producto que cuesta (\d+) pesos$/, (precio) => {
      precioOriginal = Number(precio);
    });

    when(/^se le aplica un descuento del (\d+) por ciento$/, (porcentaje) => {
      porcentajeDescuento = Number(porcentaje);
      precioFinal = calcularDescuento(precioOriginal, porcentajeDescuento);
    });

    then(
      /^el precio final a pagar debe ser (\d+) pesos$/,
      (resultadoEsperado) => {
        expect(precioFinal).toBe(Number(resultadoEsperado));
      },
    );
  });
});
