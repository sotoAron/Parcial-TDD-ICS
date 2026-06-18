const express = require("express");
const { calcularDescuento } = require("./calculadora");

const app = express();
// Oculta la tecnología del servidor por seguridad (Requerido por SonarCloud)
app.disable("x-powered-by");

const PORT = process.env.PORT || 3000;

// Middleware vital para entender peticiones JSON (Exigido por openapi.yaml)
app.use(express.json());

// =========================================================================
// ENDPOINT DE LA API (Cumpliendo el contrato SDD)
// =========================================================================
app.post("/descuento", (req, res) => {
  const { precio, porcentaje } = req.body;

  // Validación estricta según el contrato (Respuesta 400)
  if (typeof precio !== "number" || typeof porcentaje !== "number") {
    return res.status(400).json({
      error: "Datos inválidos: 'precio' y 'porcentaje' son requeridos.",
    });
  }

  // Ejecutamos la lógica de negocio (TDD)
  const precioFinal = calcularDescuento(precio, porcentaje);

  // Respuesta exitosa según el contrato (Respuesta 200)
  return res.status(200).json({ precioFinal });
});

// =========================================================================
// INTERFAZ VISUAL (Para tu demostración del despliegue en Render)
// =========================================================================
app.get("/", (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SAD - Sistema de Descuentos</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; background: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .container { background: white; padding: 35px; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
            input, button { width: 100%; padding: 12px; margin-top: 8px; margin-bottom: 16px; border-radius: 8px; border: 1px solid #cbd5e1; box-sizing: border-box; }
            button { background: #2563eb; color: white; border: none; font-weight: bold; cursor: pointer; }
            #resultado { margin-top: 15px; padding: 15px; border-radius: 8px; text-align: center; font-weight: bold; display: none; }
            .exito { background: #d1e7dd; color: #0f5132; border: 1px solid #badbcc; }
            .error { background: #f8d7da; color: #842029; border: 1px solid #f5c2c7; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2 style="text-align: center; margin-top:0;">Calculadora SDD</h2>
            <label>Precio Original ($):</label>
            <input type="number" id="precio" required>
            
            <label>Descuento (%):</label>
            <input type="number" id="porcentaje" required>
            
            <button onclick="calcular()">Aplicar Descuento</button>
            <div id="resultado"></div>
        </div>

        <script>
            async function calcular() {
                const precio = parseFloat(document.getElementById('precio').value);
                const porcentaje = parseFloat(document.getElementById('porcentaje').value);
                const divResultado = document.getElementById('resultado');

                // Nos comunicamos con nuestra propia API usando JSON, respetando el contrato
                const response = await fetch('/descuento', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ precio, porcentaje })
                });

                const data = await response.json();
                divResultado.style.display = 'block';

                if (response.ok) {
                    divResultado.className = 'exito';
                    divResultado.innerHTML = 'Precio Final: $' + data.precioFinal;
                } else {
                    divResultado.className = 'error';
                    divResultado.innerHTML = data.error;
                }
            }
        </script>
    </body>
    </html>
    `;
  res.status(200).send(html);
});

// Evita que el servidor se quede colgado durante las pruebas
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor SDD corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
