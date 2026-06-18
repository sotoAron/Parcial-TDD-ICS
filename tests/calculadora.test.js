const { calcularDescuento } = require("../calculadora");

describe("TDD - Lógica interna de calcularDescuento", () => {
  it("Debe calcular un descuento normal correctamente", () => {
    expect(calcularDescuento(100, 10)).toBe(90);
  });

  it("Debe devolver 0 si el descuento es del 100% (Gratis)", () => {
    expect(calcularDescuento(150, 100)).toBe(0);
  });

  it("Debe devolver el precio total si el descuento es 0%", () => {
    expect(calcularDescuento(80, 0)).toBe(80);
  });

  it("Debe manejar decimales correctamente", () => {
    // Usamos toBeCloseTo para evitar errores de precisión de punto flotante en JavaScript
    expect(calcularDescuento(10.5, 10)).toBeCloseTo(9.45);
  });

  it("Debe retornar 0 si el precio es negativo o nulo (Manejo de errores)", () => {
    expect(calcularDescuento(-50, 20)).toBe(0);
    expect(calcularDescuento(null, 10)).toBe(0);
  });
});
