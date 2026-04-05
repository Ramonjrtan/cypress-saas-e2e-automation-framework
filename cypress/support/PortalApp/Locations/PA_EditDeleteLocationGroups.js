//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function paEditDeleteLocation() {
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

  // Step 6: Click edit icon
  cy.get('mat-icon')
    .contains('edit')
    .click();

  // Step 7: Wait for and confirm Edit Location page has loaded
  cy.contains('h1', 'Edit Location', { timeout: 60000 }).should('be.visible');
  cy.log('✅ Success: Edit Location page loaded');


  // Step 10: Enter Address
  cy.get(el.clientPortal.locationAddressInput)
    .should('be.visible')
    .type('1611 N Meridian St, Indianapolis, IN 46202, United States', { force: true });
  cy.wait(3000); // Allow suggestions to load

  // Step 11: Select Address from Dropdown
  cy.get('.ng-option')
    .should('contain.text', '1611 N Meridian St')
    .click({ force: true });
  cy.log('✅ Success: Entered and selected Location Address');
  cy.wait(3000); // Allow suggestions to load

  // Step 12: Click Submit
  cy.get('.actions > :nth-child(1)')
    .should('be.visible')
    .click({ force: true });
  cy.log('✅ Success: Clicked Save Location button');

  // Step 13: Verify Success Message
  cy.get(el.clientPortal.successMessage, { timeout: 10000 }).should('be.visible');
  cy.get(el.clientPortal.successMessage, { timeout: 10000 }).should('not.exist');
  cy.log('✅ Success: Location saved and confirmation verified');

  // Step 14: Search for the added Location again
  cy.get('input[placeholder="Search Location..."]')
    .should('be.visible')
    .clear()
    .type('CP Cypress Test Location');
  cy.log('✅ Success: Searched for Location');

  // Step 15: Search for the End Client again
  cy.get(el.clientPortal.endClientDropdown)
    .first()
    .type('Test End Client Workspace #1', { timeout: 10000 });
  cy.get(el.clientPortal.dropdownOption)
    .contains('Test End Client Workspace #1')
    .click();
  cy.log('✅ Success: Selected End Client');

  // Step 17: Click delete icon
  cy.get('mat-icon')
    .contains('delete')
    .should('be.visible')
    .click();
  cy.get('.btn-danger')
    .should('be.visible')
    .click();
  cy.log('✅ Success: Clicked Delete icon');

  // Step 18: Verify Delete Success Message
  cy.get('div[aria-label="Location deleted successfully"]', { timeout: 10000 })
    .should('be.visible');
  cy.get('div[aria-label="Location deleted successfully"]', { timeout: 10000 })
    .should('not.exist');
  cy.log('✅ Success: Location deleted and confirmation verified');

  // Step 19: Reload the page
  cy.reload();
  cy.wait(3000); // Allow suggestions to load

  // Step 20: Search for the deleted Location
  cy.get('input[placeholder="Search Location..."]')
    .should('be.visible')
    .clear()
    .type('CP Cypress Test Location');
  cy.log('✅ Success: Searched for Location');

  // Step 21: Search for the End Client
  cy.get(el.clientPortal.endClientDropdown)
    .first()
    .type('Test End Client Workspace #1', { timeout: 10000 });
  cy.get(el.clientPortal.dropdownOption)
    .contains('Test End Client Workspace #1')
    .click();
  cy.log('✅ Success: Selected End Client');
}
