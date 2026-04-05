//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function paDeleteLocation() {
  // Step 1: Click Locations tab
  cy.get(el.clientPortal.locations)
    .should('be.visible')
    .click();
  cy.log('✅ Success: Clicked Locations tab');

  // Step 2: Wait for and confirm Locations page has loaded
  cy.contains('h1', 'Locations', { timeout: 60000 }).should('be.visible');
  cy.log('✅ Success: Locations page loaded');

  // Step 3: Search for the added Location
  cy.get('input[placeholder="Search Location..."]')
    .should('be.visible')
    .clear()
    .type('CP Cypress Test Location');
  cy.log('✅ Success: Searched for Location');

  // Step 4: Search for the End Client
  cy.get(el.clientPortal.endClientDropdown)
    .first()
    .type('Test End Client Workspace #1', { timeout: 10000 });
  cy.get(el.clientPortal.dropdownOption)
    .contains('Test End Client Workspace #1')
    .click();
  cy.log('✅ Success: Selected End Client');

  // Step 5: Intercept location search API
  cy.intercept('GET', '**/api/clients/**/sites**').as('searchLocations');

  // Wait for search to complete
  cy.wait('@searchLocations').then(({ response }) => {
    const totalRecords = response.body.totalRecords;

    if (totalRecords > 0) {
      // Step 6: Delete location if found
      cy.get('mat-icon')
        .contains('delete')
        .should('be.visible')
        .click();
      cy.get('.btn-danger')
        .should('be.visible')
        .click();
      cy.log('✅ Success: Clicked Delete icon');

      // Step 7: Verify Delete Success Message
      cy.get('div[aria-label="Location deleted successfully"]', { timeout: 10000 })
        .should('be.visible');
      cy.get('div[aria-label="Location deleted successfully"]', { timeout: 10000 })
        .should('not.exist');
      cy.log('✅ Success: Location deleted and confirmation verified');

      // Step 8: Reload and verify it's gone
      cy.reload();
      cy.wait(3000);

      // Search again
      cy.get('input[placeholder="Search Location..."]')
        .should('be.visible')
        .clear()
        .type('CP Cypress Test Location');
      cy.get(el.clientPortal.endClientDropdown)
        .first()
        .type('Test End Client Workspace #1', { timeout: 10000 });
      cy.get(el.clientPortal.dropdownOption)
        .contains('Test End Client Workspace #1')
        .click();
      cy.wait('@searchLocations').then(({ response }) => {
  const results = response.body.results || [];
  const match = results.some(item =>
    item.locationName && item.locationName.includes('CP Cypress Test Location')
  );

  expect(match).to.be.false;
  cy.log('✅ Verified location no longer exists in the results');
});


    } else {
      cy.log('ℹ️ Location not found. No deletion necessary.');
    }
  });
}
