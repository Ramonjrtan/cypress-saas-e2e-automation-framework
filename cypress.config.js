const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "e1bz55", // Cypress Cloud project ID

  e2e: {
    watchForFileChanges: false, // Prevents auto-run when files are saved
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    // baseUrl, specPattern, etc. can be added here if needed
  },

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome-report",
    overwrite: false,
    html: true,
    json: true
  }
});
