//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function saAddClient() {
    cy.wait(5000);
    
    // Step 1: Click on Clients
    cy.contains(el.clientsTabIcon, 'store').click();
    cy.log('✅ Successfully Clicked Clients');

    // Ensure header appears
    cy.get(el.clientsPageHeader).contains('Clients').should('be.visible');
    cy.log('✅ Clients page header is visible');

    // Step 3: Click the "Add Clients" button
    cy.contains(el.addClientsButton, 'Add Clients').click();
    cy.log('✅ Successfully Clicked Add Clients');

    // Ensure header appears
    cy.get(el.addClientPageHeader).contains('Add Client').should('be.visible');
    cy.log('✅ Add Client page header is visible');

    // Step 4: Enter Client name
    cy.get(el.clientNameInput).type('Cypress Test Client');
    cy.log('✅ Entered Client Name: Cypress Test Client');

    // Verify Client Name input
    cy.get(el.clientNameInput).should('have.value', 'Cypress Test Client');
    cy.log('✅ Verified Client Name input value');

    // Step 5: Select Relationship type dropdown
    cy.get(el.clientRelationshipDropdown).should('be.visible').select('Direct'); // Select "Direct" option by visible text
    cy.log('✅ Selected Relationship Type: Direct');

    // Step 6: Select Currency
    cy.get(el.clientCurrencyInput)
        .first()  // Ensure to target the first matching element
        .should('be.visible')
        .type('USD')
        .type('{enter}');
    cy.log('✅ Selected Currency: USD');

    // Step 7: Select the Country (United States)
    cy.get(el.clientCountryDropdown)  // Select the <select> dropdown by its ID
        .should('be.visible')  // Wait for the select element to be visible
        .select('71');  // Select the option with the value of '71' (United States)
    cy.log('✅ Successfully selected United States (value: 71)');

    // Step 8: Click Save
    cy.get(el.clientSaveButton).contains('Save').should('be.visible').click();
    cy.log('✅ Successfully Completed Adding Client');

    // Step 9: Verify success message
    cy.get(el.clientSuccessMessage, { timeout: 10000 }).should('be.visible');
    cy.log('✅ Verified success message');

    // Step 10: Ensure success message disappears before proceeding
    cy.get(el.clientSuccessMessage, { timeout: 10000 }) 
    .should('not.exist');
}
