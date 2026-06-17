const request = require("supertest");
const app = require("../server");

describe("Prueba de Caja Negra - Servidor Web", () => {
  // Test 1: Verificar que la interfaz carga visualmente
  it("Debe responder con un estado 200 OK y contener el formulario", async () => {
    const respuesta = await request(app).get("/");
    expect(respuesta.statusCode).toBe(200);
    expect(respuesta.text).toContain("Sistema de Descuentos");
  });

  // Test 2: Verificar el procesamiento del formulario (Caja Negra del flujo web)
  it("Debe procesar el formulario POST y redirigir con el resultado esperado", async () => {
    const respuesta = await request(app)
      .post("/calcular")
      .send("precio=100&porcentaje=10");

    // Esperamos una redirección (HTTP 302) de vuelta al index pasándole el resultado en la URL
    expect(respuesta.statusCode).toBe(302);
    expect(respuesta.headers.location).toContain("resultado=90");
  });
});
