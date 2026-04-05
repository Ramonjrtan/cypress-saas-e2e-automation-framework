// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function saEditVendor() {
  cy.visit('https://core.service-app.com/vendors'); // Navigate to the Vendors page

  // Step 1: Search for a vendor
  cy.wait(5000);
  cy.get(el.vendorSearchField, { timeout: 60000 }).type('Cypress Test Vendor').type('{enter}');

  // Step 2: Wait for the search results to load and click Edit
  cy.wait(3000);
  cy.get(el.vendorEditButton, { timeout: 60000 }).click();
  cy.wait(3000);

  // Step 3: Ensure header appears
  cy.get(el.addVendorHeader, { timeout: 60000 })
    .contains('Basic Profile')
    .should('be.visible');
  cy.log('✅ Add Vendor page header is visible');

  // Step 4: Check and edit vendor name
  cy.get(el.vendorNameInput).should('have.value', 'Cypress Test Vendor');
  cy.log('✅ Vendor name is visible: Cypress Test Vendor');

  cy.get(el.vendorNameInput, { timeout: 60000 }).clear().type('Cypress Test Vendor edit');
  cy.wait(2000);

  // Step 5: Click Save
  cy.get(el.clientSaveButton, { timeout: 60000 })
    .contains('Save')
    .scrollIntoView()
    .should('be.visible')
    .click();
  cy.log('✅ Successfully Completed Editing Vendor');

  // Step 6: Optional: Verify success message
  cy.get(el.vendorEditSuccessMessage, { timeout: 60000 }).should('be.visible');
  cy.log('✅ Verified success message');
  cy.get(el.vendorEditSuccessMessage, { timeout: 60000 }).should('not.exist');
}
