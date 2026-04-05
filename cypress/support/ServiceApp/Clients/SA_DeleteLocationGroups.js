//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function saDeleteLocation() {
  // Step 1: Wait for the page to load
  cy.wait(5000);

  // Step 2: Click on Clients tab (ensure visibility before clicking)
  cy.get(el.clientsTabIcon).contains('store').should('be.visible').click();
  cy.log('✅ Successfully Clicked Clients');

  // Step 3: Ensure the Clients page header appears
  cy.get(el.clientsPageHeader).contains('Clients').should('be.visible');
  cy.log('✅ Clients page header is visible');

  // Step 4: Clear and type in Search field
  cy.get(el.clientSearchField).clear().type('Cypress Test Client');
  cy.log('✅ Cleared and typed in Search field: Cypress Test Client');

  // Step 5: Verify client is visible in the table and click it
  cy.get(el.clientTable)
    .contains('Cypress Test Client')
    .should('be.visible')
    .click();
  cy.log('✅ Clicked on client "Cypress Test Client" to open details');

  // Wait for client details page to load
  cy.get(el.clientTitle).should('be.visible').contains('Cypress Test Client (Direct)');
  cy.log('✅ Client Details page is visible');
      cy.wait(3000); // Optional extra wait

      cy.get('.input-grouping > .ng-untouched')
        .should('be.visible')
        .type('Cypress Test Location');

              // Step 7: Wait for spinner to disappear
      cy.get(el.spinner, { timeout: 10000 }).should('not.exist');
      cy.log('✅ Spinner disappeared, page is ready');

      // Step 8: Check if location exists
      cy.get('body').then(($body2) => {
        const hasLocation = $body2.find(el.deleteLocationButton).length > 0;

        if (hasLocation) {
          cy.log('✅ Location record found. Proceeding with deletion...');

          // Step 9: Click Delete button
          cy.get(el.deleteLocationButton, { timeout: 15000 })
            .should('be.visible')
            .click({ force: true });
          cy.log('✅ Clicked Delete Location button');

          // Step 10: Confirm in modal
          cy.get(el.deleteConfirmButton).contains('Delete').should('be.visible').click({ force: true });
          cy.log('✅ Confirmed deletion');

          // Step 11: Verify "no records" message
          cy.contains('No records available for the selected filters.', { timeout: 10000 })
            .should('be.visible');
          cy.log('✅ Verified: No records available after deletion');
        } else {
          cy.log('❌ No location record found to delete');

          // Optional: check empty state
          cy.contains('No records available for the selected filters.', { timeout: 10000 })
            .should('be.visible');
          cy.log('✅ Verified: No records available message is shown');
        }
      });
}
