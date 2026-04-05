Cypress.Commands.add('loginMainPage', () => {
  cy.visit('/');
  cy.get('#username').type(Cypress.env('username'));
  cy.get('#password').type(Cypress.env('password'));
  cy.get('button[type=submit]').click();
  cy.waitForPageLoad();
});

Cypress.Commands.add('waitForPageLoad', () => {
  cy.document().its('readyState').should('eq', 'complete');
});

Cypress.Commands.add('performTechSearch', (ticketNumber) => {
  cy.contains('TECH Search').click();
  cy.get('[data-testid="general-query-input"]').type(ticketNumber);
  cy.contains('Search').click();
  cy.get('[data-testid="results-per-page-dropdown"]').select('100');
});

Cypress.Commands.add('verifySearchResultsUI', () => {
  cy.contains('Show More Button1').should('be.visible');
  cy.contains('View (133)').click();
  cy.waitForPageLoad();
  cy.contains('Close').click();
  cy.waitForPageLoad();
  cy.contains('Next').click();
  cy.waitForPageLoad();
});

Cypress.Commands.add('analyzeAndExportResults', () => {
  cy.contains('Analyze Results').click();
  cy.waitForPageLoad();
  cy.contains('Close').click();
  cy.waitForPageLoad();
  cy.contains('Previous').click();
  cy.waitForPageLoad();
  cy.contains('Export to Excel').click();
  cy.waitForPageLoad();
});

Cypress.Commands.add('filterVendorTypes', () => {
  const types = ['Platform', 'Regional', 'Material', 'Aggregator', 'Direct1', 'Vendor'];

  types.forEach((type) => {
    cy.get('[data-testid="search-button-2"]').scrollIntoView();
    cy.contains('Select Vendor Type').click();
    cy.contains('Options List Dropdown').click();
    cy.waitForPageLoad();
    cy.contains(type).should('be.visible');
    cy.contains(`Vendor Type: ${type} close`).should('be.visible');
    cy.contains('Clear all').click();
    cy.waitForPageLoad();
  });
});

Cypress.Commands.add('resetAndReverifySearch', (ticketNumber) => {
  cy.reload();
  cy.waitForPageLoad();
  cy.get('[data-testid="general-query-input"]').type(ticketNumber);
  cy.waitForPageLoad();
  cy.get('[type="checkbox"]').uncheck({ force: true });
  cy.waitForPageLoad();
  cy.contains('Search').click();
  cy.waitForPageLoad();
  cy.contains('Platform').should('not.exist');
});

Cypress.Commands.add('performProximitySearch', (address) => {
  cy.get('[data-testid="street-address-input"]').type(address);
  cy.focused().type('{enter}');
  cy.contains('Include Proximity Search').click();
  cy.contains('Search').click();
  cy.waitForPageLoad();
  cy.contains('Indianapolis').should('exist');
  cy.contains('Show Results on Map').click();
  cy.waitForPageLoad();
  cy.contains('Close Map').click();
  cy.waitForPageLoad();
  cy.get('[data-testid="search-button-2"]').should('be.visible');
});
