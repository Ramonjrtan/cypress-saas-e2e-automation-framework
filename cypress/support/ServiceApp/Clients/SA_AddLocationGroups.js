//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function saAddLocation() {
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

  // Step 7: Click on Add Location button
  cy.contains('button', 'Add Location').should('be.visible').click();
  cy.log('✅ Clicked Add Location');

  // Step 8: Wait for Location Details page to load and verify location name input
  cy.get(el.locationNameInput).should('be.visible');

  // Step 9: Enter Location details
  cy.get(el.locationNameInput).clear().type('Cypress Test Location');
  cy.get(el.phoneInput).clear().type('1234567890');

  // Step 9.1: Type address in ng-select input field (force typing to avoid any event issues)
  cy.get(el.addressInput)
    .type('2050 E Charleston Blvd, Las Vegas, NV 89104', { force: true, timeout: 10000 });
  
  // Step 9.2: Wait and select address from dropdown
  cy.wait(3000); // Wait for suggestions to populate
  cy.get(el.addressDropdown).contains('2050 E Charleston Blvd').click({ force: true });
  cy.log('✅ Entered Location Name, Phone, and Address');

  // Step 10: Save the new location
  cy.get('button').contains('Save').should('be.enabled').click();
  cy.log('✅ Clicked Save Location');

  // Step 11: Verify success message
  cy.contains("Client location is successfully added", { timeout: 10000 })
    .should('be.visible');
  cy.log('✅ Location added');

  // Step 12: Ensure success message disappears before proceeding
  cy.contains("Client location is successfully added", { timeout: 10000 })
    .should('not.exist');
  cy.log('✅ Verified success message disappeared');


  // Step 14: Wait for Location Details page and validate the details
  cy.get(el.locationNameHeader).should('be.visible').and('have.text', 'Cypress Test Location');
  cy.get(el.locationAddressHeader).should('be.visible').and('have.text', '2050 East Charleston Boulevard');
  cy.get(el.locationCityHeader).should('be.visible').and('have.text','Las Vegas');
  cy.get(el.locationStateCountryHeader).should('be.visible').and('have.text', 'NV, United States');
  cy.get(el.locationZipHeader).should('be.visible').and('have.text', '89104');
  cy.log('✅ Location Details page is visible');
}
