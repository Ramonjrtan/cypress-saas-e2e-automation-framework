//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function paAddTicket() {
  // Step 1: Click My Tickets
  cy.get(el.clientPortal.myTicketsLink).should('be.visible').click();
  cy.log('✅ Step 1: Clicked My Tickets');

  // Step 2: Wait for My Tickets page to load
  cy.contains('h1', 'My Tickets', { timeout: 60000 }).should("be.visible");
  cy.log('✅ Step 2: My Tickets page loaded');

  // Step 3: Click + Add Ticket button
  cy.contains('button', '+ Add Ticket').should('be.visible').click();
  cy.log('✅ Step 3: Clicked Add Ticket');

  // Step 4: Wait for Add Ticket page
  cy.contains('h1', 'Add Ticket', { timeout: 60000 }).should("be.visible");
  cy.log('✅ Step 4: Add Ticket page loaded');

  // Step 5: Enter Issue Description
  cy.get(el.clientPortal.issueDescription).type('Client Workspace Cypress Test Ticket');
  cy.log('✅ Step 5: Entered Issue Description');

  // Step 6: Enter Scope of Work
  cy.get(el.clientPortal.scopeOfWork).type('SOW: Client Workspace Cypress Test Ticket');
  cy.log('✅ Step 6: Entered Scope of Work');

  // Step 7: Select Contract
  cy.get(el.clientPortal.contractDropdown).click();
  cy.log('✅ Step 7: Opened Contract dropdown');
  cy.get(el.clientPortal.contractOption).contains('Dispatch SOW CP Test (USE FOR TESTING)').click();
  cy.get(el.clientPortal.contractDropdown).should('not.have.class', 'mat-select-focused');
  cy.log('✅ Step 7: Selected Contract');

  // Step 8: Select Ticket Problem Code
  cy.get(el.clientPortal.ticketProblemDropdown).click();
  cy.get(el.clientPortal.ticketProblemOption).contains('Cabling').click();
  cy.get('body').click();
  cy.get(el.clientPortal.ticketProblemDropdown).should('not.have.class', 'mat-select-focused');
  cy.log('✅ Step 8: Selected Ticket Problem Code');

  // Step 9: Select End Client
  cy.get(el.clientPortal.endClientDropdown).first().scrollIntoView().click();
  cy.get(el.clientPortal.endClientDropdown).first().type('Test Client (USE FOR TESTING)', { timeout: 10000 });
  cy.get(el.clientPortal.dropdownOption).contains('Test Client (USE FOR TESTING)').click();
  cy.log('✅ Step 9: Selected End Client');

  // Step 10: Select Country
  cy.get(el.clientPortal.countryDropdown).eq(1).scrollIntoView().click();
  cy.get(el.clientPortal.countryDropdown).eq(1).type('United States', { timeout: 10000 });
  cy.get(el.clientPortal.dropdownOption).contains('United States').click();
  cy.log('✅ Step 10: Selected Country');

  // Step 11: Select Location
  cy.get(el.clientPortal.locationDropdown).eq(2).scrollIntoView().click();
  cy.get(el.clientPortal.locationDropdown).eq(2).type('Test location McD - Indianapolis - IN', { timeout: 10000 });
  cy.get(el.clientPortal.dropdownOption).contains('Test location McD - Indianapolis - IN').click();
  cy.log('✅ Step 11: Selected Location');

  // Step 12: Set Requested Response Date
  cy.get(el.clientPortal.responseDateInput).scrollIntoView().click();
  cy.wait(500);
  cy.get(el.clientPortal.datePickerCancel).contains('Cancel').click({ force: true });
  cy.wait(500);
  cy.get(el.clientPortal.responseDateInput).clear().type('12/31/2025, 9:00 AM', { force: true });
  cy.log('✅ Step 12: Entered Requested Response Date');

  // Step 13: Select Technician Level
  cy.get(el.clientPortal.technicianLevelDropdown).scrollIntoView().click();
  cy.get(el.clientPortal.technicianLevelDropdown).type('standard technician', { timeout: 10000 });
  cy.get(el.clientPortal.dropdownOption).contains('standard technician').click();
  cy.log('✅ Step 13: Selected Technician Level');

  // Step 14: Select Number of Technicians
  cy.get(el.clientPortal.numTechniciansDropdown).scrollIntoView().click();
  cy.get(el.clientPortal.numTechniciansDropdown).type('1', { timeout: 10000 });
  cy.get(el.clientPortal.dropdownOption).contains('1').click();
  cy.log('✅ Step 14: Selected Number of Technicians');

  // Step 15: Add Technician
  cy.get(el.clientPortal.addTechnicianButton).click();
  cy.contains('span.label.label-info', 'standard technician').scrollIntoView().should('be.visible');
  cy.log('✅ Step 15: Verified Standard Technician label');

  // Step 16: Fill in Special Requirements, Conditions, Tools
  cy.get(el.clientPortal.specialRequirements).scrollIntoView().type('Special Requirements: Client Workspace Cypress Test Ticket');
  cy.get(el.clientPortal.specialConditions).scrollIntoView().type('Special Conditions: Client Workspace Cypress Test Ticket');
  cy.get(el.clientPortal.requiredTools).scrollIntoView().type('Ticket Required Tools: Client Workspace Cypress Test Ticket');
  cy.log('✅ Step 16: Filled additional ticket details');

  // Step 17: (Optional) Add document
  // pa_ticketdocument();
  // cy.log('✅ Step 17: Document added');

  // Step 18: Save Ticket
  cy.get(el.clientPortal.saveButton).contains('Save').click({ force: true });
  cy.get(el.clientPortal.successMessage, { timeout: 100000 }).should('be.visible');
  cy.get(el.clientPortal.successMessage, { timeout: 100000 }).should('not.exist');
  cy.log('✅ Step 18: Ticket saved and confirmation verified');
}
