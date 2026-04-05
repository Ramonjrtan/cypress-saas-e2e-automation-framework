export function paLogin(email, password) {
  // Step 1: Visit the client portal
  cy.visit('https://client.service-app.com/',{timeout: 120000});
  cy.clearCookies();
  cy.clearLocalStorage();

  // Step 2: Click login button to redirect to Azure login page
  cy.get('.btn').click();

  // Step 3: Handle login on the Microsoft Azure domain
  cy.origin('https://dispatchone.b2clogin.com', { args: { email, password } }, ({ email, password }) => {
    cy.get('input[placeholder="Email Address"]').should('be.visible').type(email);
    cy.get('input[placeholder="Password"]').should('be.visible').type(password, { log: false });
    cy.get('button[type="submit"]').should('be.visible').click();

    // Wait for authentication and redirection to complete
    cy.wait(10000);  // Adjust as needed based on performance
  });

  // Step 4: Confirm redirect back to the client portal
  cy.wait(10000);  // Wait for the new page to load
  cy.url().should('include', 'client.service-app.com');
}
