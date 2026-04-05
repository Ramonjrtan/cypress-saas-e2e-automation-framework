Cypress.Commands.add('loginMainPage', (email, password) => {
  cy.visit('https://www.techselect.ai');
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.get('.btn').click();

  cy.origin('https://dispatchone.b2clogin.com', { args: { email, password } }, ({ email, password }) => {
    cy.get('input[placeholder="Email Address"]').should('be.visible').type(email);
    cy.get('input[placeholder="Password"]').should('be.visible').type(password, { log: false });
    cy.get('button[type="submit"]').should('be.visible').click();

    // ✅ Optional wait for login
    cy.wait(5000);
  });

Cypress.Commands.add('clickTechSelectAI', () => {
  cy.contains('TechSelect.AI').click();
});

Cypress.Commands.add('searchTicketNumber', (ticketId) => {
  cy.get('input[placeholder="Enter Ticket Number"]').clear().type(ticketId);
  cy.contains('Search').click();
});

Cypress.Commands.add('clickViewCompetenciesTwice', () => {
  cy.contains('View Competencies').click();
  cy.wait(1000);
  cy.contains('View Competencies').click();
});

Cypress.Commands.add('checkTechnician', (techName) => {
  cy.contains(`Select technician ${techName}`).find('input[type="checkbox"]').check({ force: true });
});

Cypress.Commands.add('sendEmailToVendors', () => {
  cy.contains('Send Email to Selected Vendors').click();
});

Cypress.Commands.add('handleRateError', () => {
  cy.contains('Please enter a valid rate.').should('be.visible').click();
  cy.contains('Close').click();
});

Cypress.Commands.add('enterRateDetails', (rate, maxHours) => {
  cy.contains('Hourly').click();
  cy.contains('Fixed Hourly').click();
  cy.get('[data-testid="rate-input"]').clear().type(rate);
  cy.get('[data-testid="max-hours-input"]').clear().type(maxHours);
});

Cypress.Commands.add('confirmSendEmail', (cancel = false) => {
  cy.contains('Heading: Confirm Send').should('be.visible');
  if (cancel) {
    cy.contains('Cancel').click();
  } else {
    cy.contains('Send').click();
  }
});

Cypress.Commands.add('verifySuccessMessage', (message) => {
  cy.contains(message).should('be.visible');
  cy.contains('Close').click();
});

  // ✅ Wait and confirm successful redirect
  cy.wait(5000);
  cy.url().should('include', 'techselect.ai');
});
  