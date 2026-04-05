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

  // ✅ Wait and confirm successful redirect
  cy.wait(5000);
  cy.url().should('include', 'techselect.ai');
});

Cypress.Commands.add('aiSearch', () => {
  cy.contains("span.mdc-button__label", "AI Search").click();

});

Cypress.Commands.add('enterGeneralQuery', (ticketId) => {
  cy.get("input[placeholder='General query']").clear().type(ticketId);
});

Cypress.Commands.add('clickTicket', (ticketId) => {
  cy.contains(`Ticket: ${ticketId}`).click();
  // Assuming modal or SPA behavior since Cypress can't handle multi-tabs
});

Cypress.Commands.add('clickSearchButton', () => {
  cy.get("div.search-container button").click();
});

Cypress.Commands.add('waitForPageLoad', () => {
  cy.document().its('readyState').should('eq', 'complete');
});

Cypress.Commands.add('aiLogin2', () => {
  const email = Cypress.env('ai_email');
  const password = Cypress.env('ai_password');

  // Secondary login if needed, or placeholder for modal auth
  cy.get('.btn').click();

  cy.origin('https://dispatchone.b2clogin.com', { args: { email, password } }, ({ email, password }) => {
    cy.get('input[placeholder="Email Address"]').should('be.visible').type(email);
    cy.get('input[placeholder="Password"]').should('be.visible').type(password, { log: false });
    cy.get('button[type="submit"]').should('be.visible').click();

    // Optional wait for login to complete or page redirect
    cy.wait(5000);
  });
});

Cypress.Commands.add('clearGeneralQuery', () => {
  cy.get("input[placeholder='General query']").clear();
});

Cypress.Commands.add('pressArrowDownEnter', () => {
  cy.focused().type('{downarrow}{enter}');
});

Cypress.Commands.add('clickClientSite', (siteText) => {
  cy.contains(`Client Site: ${siteText}`).click();
});

Cypress.Commands.add('searchByStreetAddress', (address) => {
  y.get('#streetAddress').clear().type(address);
  cy.pressArrowDownEnter();
  cy.clickSearchButton();
});

Cypress.Commands.add('searchByCity', (city) => {
  cy.get('#city').clear().type(city);
  cy.clickSearchButton();
});

Cypress.Commands.add('verifyTextVisible', (text) => {
  cy.contains(text).should('be.visible');
});

Cypress.Commands.add('clickShowMapAndClose', () => {
  cy.contains('Show Results on Map').click();
  cy.waitForPageLoad();
  cy.get('.close-map-button').click();
  cy.waitForPageLoad();
});
