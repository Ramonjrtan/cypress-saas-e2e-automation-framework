export function login() {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  cy.visit('https://core.service-app.com/');
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.get('.btn').click();

  cy.origin('https://dispatchone.b2clogin.com', { args: { email, password } }, ({ email, password }) => {
    cy.get('input[placeholder="Email Address"]').should('be.visible').type(email);
    cy.get('input[placeholder="Password"]').should('be.visible').type(password, { log: false });
    cy.get('button[type="submit"]').should('be.visible').click();

    // ✅ Wait for redirect to complete before leaving cy.origin()
    cy.wait(5000);  // Adjust if needed
  });

  // ✅ Move URL verification outside cy.origin()
  cy.wait(5000);  // Allow time for Cypress to detect the redirect
  cy.url().should('include', 'core.service-app.com');
}
