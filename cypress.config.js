const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl": "https://competent-engelbart-3915c0.netlify.app",
    "viewportWidth": 1919,
    "viewportHeight": 1080,
    "chromeWebSecurity": false,
    "requestTimeout": 500000,
    "defaultCommandTimeout": 50000,
    "pageLoadTimeout": 900000,
},
});
