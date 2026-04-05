// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function saDeleteVendor() {
  cy.visit('https://core.service-app.com/vendors'); // Step 1: Navigate to the Vendors page
  cy.wait(5000); // Step 2: Wait for the page to load

  // Step 3: Search for a vendor
  cy.get(el.vendorSearchField, { timeout: 60000 })
    .type('Cypress Test Vendor edit')
    .type('{enter}');

  // Step 4: Wait for the search results to load
  cy.wait(5000);

  // Step 5: Conditional check - if vendor exists, delete; else verify it's gone
  cy.get('body').then($body => {
    if ($body.find(el.vendorEditButton).length > 0) {
      // ✅ Vendor found - proceed with deletion
      cy.log('✅ Vendor found, proceeding with deletion');

      // Step 6: Click the edit button
      cy.get(el.vendorEditButton, { timeout: 60000 }).click();
      cy.wait(3000);

      // Step 7: Ensure header appears
      cy.get(el.addVendorHeader, { timeout: 60000 })
        .contains('Basic Profile')
        .should('be.visible');
      cy.log('✅ Add Vendor page header is visible');

      // Step 8: Verify the vendor name
      cy.get(el.vendorNameInput).should('have.value', 'Cypress Test Vendor edit');
      cy.log('✅ Vendor name is visible: Cypress Test Vendor');

      // Step 9: Click the delete button
      cy.get(el.deleteButton, { timeout: 60000 })
        .contains('Delete')
        .scrollIntoView()
        .click();
      cy.log('✅ Clicked Delete button');

      // Step 10: Confirm deletion
      cy.get(el.confirmDeleteButton, { timeout: 60000 })
        .contains('Yes')
        .click();
      cy.log('✅ Confirmed deletion by clicking Yes');

      // Step 11: Verify success message after deletion
      cy.get(el.vendorDeleteSuccessMessage, { timeout: 60000 }).should('be.visible');
      cy.log('✅ Verified success message');

      // Step 12: Ensure success message disappears before proceeding
      cy.get(el.vendorDeleteSuccessMessage, { timeout: 60000 }).should('not.exist');
      cy.log('✅ Verified success message disappeared');

      // Step 13: Re-search and verify the vendor is no longer in the list
      cy.get(el.vendorSearchField, { timeout: 60000 })
        .clear()
        .type('Cypress Test Vendor edit')
        .type('{enter}');
      cy.get('.nodata', { timeout: 60000 }).should('be.visible');
      cy.log('✅ Verified vendor no longer exists');

    } else {
      // Step 6 (Alt): Vendor not found initially - just verify "no data"
      cy.log('❌ Vendor not found, verifying no data message');
      cy.get('.nodata', { timeout: 60000 }).should('be.visible');
    }
  });
}
