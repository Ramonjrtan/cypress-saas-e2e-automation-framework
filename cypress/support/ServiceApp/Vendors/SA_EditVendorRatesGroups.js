// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function saEditVendorRates() {
  cy.visit('https://core.service-app.com/vendors'); // Navigate to the Vendors page
  cy.wait(5000);

  // Step 1: Search for the vendor and click on it
  cy.get(el.vendorSearchField, { timeout: 60000 }).type('Cypress Test Vendor edit').type('{enter}');
  cy.wait(5000);

  // Step 2: Click on Vendor name in the search results
  cy.get('[headers="table-header-0-0-1"] > .ng-star-inserted', { timeout: 60000 })
    .should('be.visible')
    .contains('Cypress Test Vendor edit') // Ensure the vendor name is visible
    .click({ force: true });    

  // Step 3: Visit vendor profile
  cy.contains('.vendor-name', 'Cypress Test Vendor edit', { timeout: 60000 }).should('be.visible');
  cy.log('✅ Vendor profile loaded successfully');

  // Step 4: Open Vendor Rates section
  cy.contains('button', 'Vendor Rates', { timeout: 60000 }).click();

  // Step 5: Click edit icon in the first row
  cy.get('tbody tr').first().within(() => {
    cy.get('button')
      .contains('border_color')  // Select the button containing the "border_color" icon
      .should('be.visible')
      .click();
  });

  // Step 6: Confirm edit modal
  cy.contains('Edit Vendor Rate Details', { timeout: 60000 }).should('be.visible');
  cy.wait(500);
  cy.log('✅ Edit Vendor Rate Details modal opened successfully');

  cy.wait(1000);

  // Step 7: Enter comments
  cy.get(el.vendorRates.comments, { timeout: 60000 }).scrollIntoView().type('Cypress Test Comment');        
  cy.log('✅ Comment entered successfully');

  // Step 8: Click Save
  cy.contains('button', 'Save').should('be.enabled').click();
  cy.log('✅ Save button clicked successfully');

  // Step 9: Confirm success message
  cy.get(el.vendorRates.toastMessageContainer, { timeout: 60000 })
    .should('be.visible')
    .contains('Vendor rates updated successfully');
  cy.log('✅ Success: Vendor rates updated');

  // Step 10: Confirm success message disappears
  cy.wait(2000);
  cy.get(el.vendorRates.toastMessageContainer, { timeout: 60000 }).should('not.exist');
  cy.log('✅ Success message disappeared successfully');
}
