const express = require("express");
const { calcularDescuento } = require("./calculadora");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware necesario para entender los datos que envía el formulario web
app.use(express.urlencoded({ extended: true }));

// Ruta principal (GET): Renderiza la interfaz visual profesional
app.get("/", (req, res) => {
  const { precio, porcentaje, resultado } = req.query;

  // Si existen resultados en la URL, creamos un bloque verde de éxito
  let bloqueResultado = "";
  if (precio && porcentaje && resultado) {
    bloqueResultado = `
            <div style="margin-top: 20px; padding: 15px; background-color: #d1e7dd; color: #0f5132; border-radius: 8px; font-weight: bold; text-align: center; border: 1px solid #badbcc;">
                ¡Cálculo Exitoso!<br>
                <span style="font-weight: normal; font-size: 14px; color: #157347;">
                    $${precio} con ${porcentaje}% de desc. es:
                </span>
                <div style="font-size: 24px; margin-top: 5px;">$${resultado}</div>
            </div>
        `;
  }

  // HTML y CSS moderno todo en uno para mantener la simplicidad de despliegue
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SAD - Sistema de Descuentos Automatizado</title>
        <style>
            body {
                font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
                background-color: #f8fafc;
                color: #0f172a;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                background: white;
                padding: 35px;
                border-radius: 16px;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
                width: 100%;
                max-width: 400px;
                border: 1px solid #e2e8f0;
            }
            h1 {
                font-size: 24px;
                margin-top: 0;
                margin-bottom: 8px;
                color: #1e293b;
                text-align: center;
                font-weight: 700;
            }
            .subtitle {
                font-size: 14px;
                color: #64748b;
                text-align: center;
                margin-bottom: 25px;
            }
            .form-group {
                margin-bottom: 18px;
            }
            label {
                display: block;
                margin-bottom: 6px;
                font-weight: 600;
                font-size: 14px;
                color: #475569;
            }
            input {
                width: 100%;
                padding: 12px;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                box-sizing: border-box;
                font-size: 16px;
                transition: border-color 0.2s;
            }
            input:focus {
                outline: none;
                border-color: #2563eb;
            }
            button {
                width: 100%;
                padding: 14px;
                background-color: #2563eb;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: background-color 0.2s;
                margin-top: 10px;
            }
            button:hover {
                background-color: #1d4ed8;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Sistema de Descuentos</h1>
            <div class="subtitle">Entorno de Producción Verificado (CI/CD)</div>
            
            <form action="/calcular" method="POST">
                <div class="form-group">
                    <label for="precio">Precio Original ($):</label>
                    <input type="number" id="precio" name="precio" min="1" required placeholder="Ej. 1200">
                </div>
                <div class="form-group">
                    <label for="porcentaje">Descuento (%):</label>
                    <input type="number" id="porcentaje" name="porcentaje" min="0" max="100" required placeholder="Ej. 15">
                </div>
                <button type="submit">Calcular Precio Final</button>
            </form>

            ${bloqueResultado}
        </div>
    </body>
    </html>
    `;
  res.status(200).send(html);
});

// Ruta POST: Procesa el formulario y redirige con los datos calculados
app.post("/calcular", (req, res) => {
  const precio = parseFloat(req.body.precio);
  const porcentaje = parseFloat(req.body.porcentaje);

  const precioFinal = calcularDescuento(precio, porcentaje);

  // Redireccionamos pasándole los datos por la URL para que el GET los dibuje de forma limpia
  res.redirect(
    `/?precio=${precio}&porcentaje=${porcentaje}&resultado=${precioFinal}`,
  );
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor de prueba corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
