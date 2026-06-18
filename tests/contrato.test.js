const request = require("supertest");
const path = require("path");
// Importamos el validador de contratos
const jestOpenAPI = require("jest-openapi").default;
const app = require("../app");

// 1. CARGAMOS EL CONTRATO
// Le indicamos a jest-openapi dónde está nuestro archivo de especificación original
const rutaContrato = path.join(__dirname, "../openapi.yaml");
jestOpenAPI(rutaContrato);

describe("SDD - Validación del Contrato (OpenAPI)", () => {
  it("Debe respetar el contrato al procesar una petición válida (Respuesta 200)", async () => {
    // Hacemos una petición real a nuestra API
    const respuesta = await request(app)
      .post("/descuento")
      .send({ precio: 200, porcentaje: 25 });

    expect(respuesta.status).toBe(200);

    // No validamos si la matemática dio 150. Eso es trabajo del TDD.
    // Validamos que el JSON de respuesta tenga exactamente la forma descrita en el YAML.
    expect(respuesta).toSatisfyApiSpec();
  });

  it("Debe respetar el contrato al rechazar una petición inválida (Respuesta 400)", async () => {
    // Enviamos un texto en lugar de un número y omitimos el porcentaje
    const respuesta = await request(app)
      .post("/descuento")
      .send({ precio: "doscientos" });

    expect(respuesta.status).toBe(400);

    // Validamos que el esquema del error devuelto respete lo definido en el contrato
    expect(respuesta).toSatisfyApiSpec();
  });
});
