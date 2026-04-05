// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function saDeleteVendorRates() {
  cy.visit('https://core.service-app.com/vendors'); // Navigate to the Vendors page
  cy.wait(5000);

  // Step 1: Search for the vendor
  cy.get(el.vendorSearchField, { timeout: 60000 })
    .type('Cypress Test Vendor edit')
    .type('{enter}');
  cy.wait(3000);

  // Step 2: Click on Vendor name in the search results
  cy.get('[headers="table-header-0-0-1"] > .ng-star-inserted', { timeout: 60000 })
    .should('be.visible')
    .contains('Cypress Test Vendor edit')
    .click({ force: true });

  // Step 3: Vendor profile should load
  cy.contains('.vendor-name', 'Cypress Test Vendor edit', { timeout: 60000 }).should('be.visible');
  cy.log('✅ Vendor profile loaded successfully');

  // Step 4: Open Vendor Rates section
  cy.contains('button', 'Vendor Rates', { timeout: 60000 }).click();

  cy.wait(5000); // Wait for the table to load

  // ➕ Conditional Logic: Proceed only if rows are available
  cy.get('body').then($body => {
    if ($body.find('tbody tr').length > 0) {
      // ✅ Row exists, proceed with deletion

      // Step 5: Click delete icon in the first row
      cy.get('tbody tr', { timeout: 60000 }).first().within(() => {
        cy.get('mat-icon')
          .contains('delete')
          .parents('button')
          .should('be.visible')
          .click({ force: true });
      });
      cy.log('✅ Delete icon clicked successfully');

      // Step 6: Confirm delete action in the modal
      cy.get('[buttontype="danger"] > .danger', { timeout: 60000 })
        .should('exist')
        .click({ force: true });
      cy.log('✅ Delete action confirmed successfully');

      // Step 7: Confirm success message appears
      cy.get(el.vendorRates.toastMessageContainer, { timeout: 60000 })
        .should('be.visible')
        .contains('Deleted successfully');
      cy.log('✅ Success: Vendor rates deleted');

      // Step 8: Wait and confirm toast disappears
      cy.wait(2000); // Allow toast to auto-dismiss
      cy.get(el.vendorRates.toastMessageContainer, { timeout: 10000 }).should('not.exist');
      cy.log('✅ Success message disappeared successfully');
    } else {
      // No vendor rates found
      cy.log('❌ No Vendor Rates found to delete');
      cy.get('.nodata', { timeout: 60000 }).should('be.visible');
    }
  });
}
