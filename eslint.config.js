module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        // Entorno de Node.js
        require: "readonly",
        module: "readonly",
        process: "readonly",
        __dirname: "readonly",
        console: "readonly",

        // Entorno de Pruebas (Jest)
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
      },
    },
    rules: {
      // Permitimos que la trampa pase localmente como advertencia
      "no-unused-vars": "warn",
    },
  },
];
