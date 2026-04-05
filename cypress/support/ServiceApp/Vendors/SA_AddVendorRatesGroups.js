//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function saAddVendorRates() {
  // Step 0: Navigate to the Vendors page
  cy.visit('https://core.service-app.com/vendors');
  cy.wait(5000);

  // Step 1: Search for the vendor and click on it
  cy.get(el.vendorSearchField, { timeout: 60000 }).type('Cypress Test Vendor edit').type('{enter}');
  cy.wait(5000);

  // Step 2: Click on Vendor name in the search results
  cy.get('[headers="table-header-0-0-1"] > .ng-star-inserted', { timeout: 60000 })
    .should('be.visible')
    .contains('Cypress Test Vendor edit')
    .click({ force: true });    

  // Step 3: Visit vendor profile
  cy.contains('.vendor-name', 'Cypress Test Vendor edit', { timeout: 60000 }).should('be.visible');
  cy.log('✅ Vendor profile loaded successfully');

  // Step 4: Open Vendor Rates section
  cy.contains('button', 'Vendor Rates', { timeout: 60000 }).click();
  cy.contains('button', 'Add Vendor Rates', { timeout: 60000 }).should('be.visible').click();
  cy.contains('Add Vendor Rate Details', { timeout: 60000 }).should('be.visible').click();
  cy.log('✅ Add Vendor Rate Details modal opened successfully');

cy.wait(5000);

  // Step 5: Select Country
  cy.get(el.vendorRates.countryDropdown, { timeout: 60000 })
    .should('be.visible')
    .type('United States');
  cy.get(el.vendorRates.unitedStates, { timeout: 60000 }).should('be.visible').click();
  cy.log('✅ Country selected successfully');

  // Step 6: Select Currency
  cy.get(el.vendorRates.currencyDropdown, { timeout: 60000 })
    .should('be.visible')
    .click()
    .type('USD', { delay: 100 })
    .type('{downarrow}')
    .type('{enter}');
  cy.log('✅ Currency selected successfully');

  // Step 7: Fill in rate fields
  cy.get(el.vendorRates.hoursOfBaseRate).click({ force: true }).type('10');
  cy.get(el.vendorRates.standardHourlyRate).click({ force: true }).type('10');
  cy.get(el.vendorRates.standardBaseHourlyRate).click({ force: true }).type('10');
  cy.get(el.vendorRates.standardAdditionalHoursRate).click({ force: true }).type('10');
  cy.log('✅ Rate fields filled successfully');

  // Step 8: Save
  cy.contains('button', 'Save').should('be.enabled').click();
  cy.log('✅ Save button clicked successfully');

  // Step 9: Confirm success message
  cy.get(el.vendorRates.toastMessageContainer, { timeout: 10000 })
    .should('be.visible')
    .contains('Vendor rates added successfully');
  cy.log('✅ Success: Vendor rates added');

  // Step 10: Confirm success message disappears
  cy.get(el.vendorRates.toastMessageContainer, { timeout: 10000 })
    .should('not.exist');
  cy.log('✅ Success message disappeared successfully');
}
