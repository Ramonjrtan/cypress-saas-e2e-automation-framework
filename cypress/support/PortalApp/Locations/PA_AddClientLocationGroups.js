//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function paAddClientLocation() {
  // Step 1: Click Locations tab
  cy.get(el.clientPortal.locations)
    .should('be.visible')
    .click();
  cy.log('✅ Success: Clicked Locations tab');

  // Step 2: Wait for and confirm Locations page has loaded
  cy.contains('h1', 'Locations', { timeout: 60000 }).should('be.visible');
  cy.log('✅ Success: Locations page loaded');

  // Step 3: Click the "Add Location" button
  cy.get('a[href="/Location/Add"]')
    .should('be.visible')
    .click();
  cy.log('✅ Success: Clicked Add Location button');

  // Step 4: Wait for and confirm Add Location page has loaded
  cy.contains('h1', 'Add Location', { timeout: 60000 }).should('be.visible');
  cy.log('✅ Success: Add Location page loaded');

  // Step 5: Select End Client
  cy.get(el.clientPortal.endClientDropdown)
    .first()
    .type('Test End Client Workspace #1', { timeout: 10000 });
  cy.get(el.clientPortal.dropdownOption)
    .contains('Test End Client Workspace #1')
    .click();
  cy.log('✅ Success: Selected End Client');

  // Step 6: Enter Location Name
  cy.get('input[formcontrolname="Name"]')
    .should('be.visible')
    .type('CP Cypress Test Location');
  cy.log('✅ Success: Entered Location Name');

  // Step 7: Enter Address
  cy.get(el.clientPortal.locationAddressInput)
    .should('be.visible')
    .type('2230 S Sherman Dr, Indianapolis, IN 46203, USA', { force: true });

  cy.wait(3000); // Allow suggestions to load

  cy.get(el.clientPortal.locationAddressInput)
    .type('{downarrow}{enter}'); // Navigate and select address suggestion

  cy.log('✅ Success: Entered Location Address');

  // // Step 8: Select Address from Dropdown
  // cy.get('.ng-option')
  //   .should('contain.text', '2230 S Sherman Dr')
  //   .click({ force: true });
  // cy.log('✅ Success: Entered and selected Location Address');

  // Step 9: Enter Phone Number
  cy.get('input[formcontrolname="numberControl"]')
    .should('be.visible')
    .clear()
    .type('13177881326');
  cy.log('✅ Success: Entered Location Phone Number');
  cy.wait(3000); // Allow any potential loading

  // Step 10: Click Submit
  cy.get('[type="submit"]')
    .should('be.visible')
    .click({ force: true });
  cy.log('✅ Success: Clicked Save Location button');

  // Step 11: Verify Success Message
  cy.get(el.clientPortal.successMessage, { timeout: 10000 }).should('be.visible');
  cy.get(el.clientPortal.successMessage, { timeout: 10000 }).should('not.exist');
  cy.log('✅ Success: Location saved and confirmation verified');

  // // Step 12: Search for the added Location
  // cy.get('input[placeholder="Search Location..."]')
  //   .should('be.visible')
  //   .clear()
  //   .type('CP Cypress Test Location');
  // cy.log('✅ Success: Searched for Location');

  // //Step 13: Search for the End Client
  // cy.get(env.paEndClientDropdown)
  // .first()
  // .type('Test End Client Workspace #1', { timeout: 10000 });
  // cy.get(env.paDropdownOption)
  // .contains('Test End Client Workspace #1')
  // .click();
  // cy.log('✅ Success: Selected End Client');

  // // Step 14: Verify the Location in the table
  // cy.get('[headers="table-header-0-2-1"]')
  //   .should('contain', 'CP Cypress Test Location');
  // cy.log('✅ Success: Verified Location Name in table');
}
