//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function saEditLocation() {

  // Step 1: Click on Edit Location button
  cy.get(el.editLocationButton).should('be.visible').click();
  cy.log('✅ Clicked Edit Client Location button');

  // Step 2: Wait for Location Details page and verify the value of the Location Name input field
  cy.get(el.locationNameInput)
    .should('be.visible')  // Ensure the element is visible
    .and('have.value', 'Cypress Test Location');  // Check the value, not the text

  // Step 3: Edit Location details
  cy.get(el.locationNameInput).clear().type('Cypress Test Location edit');
  cy.get(el.phoneInput).clear().type('0987654321');
  cy.log('✅ Edited Location Name, Phone, and Address');

  // Step 4: Save the new location
  cy.get('button').contains('Save').should('be.enabled').click();
  cy.log('✅ Clicked Save Location');

  // Step 5: Verify success message
  cy.contains("Client location is successfully updated.", { timeout: 10000 })
    .should('be.visible');
  cy.log('✅ Location added');

  // Step 6: Ensure success message disappears before proceeding
  cy.contains("Client location is successfully updated.", { timeout: 10000 })
    .should('not.exist');
  cy.log('✅ Verified success message disappeared');
}
