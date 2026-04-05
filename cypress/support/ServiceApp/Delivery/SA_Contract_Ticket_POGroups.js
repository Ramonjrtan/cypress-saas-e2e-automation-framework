// ===============================
// 📁 IMPORTS
// ===============================
import { navigateContract } from '../../../support/ServiceApp/Delivery/SA_ContractGroups';
import { elements } from "../../../support/Elements/elements";

const el = elements();
const env = Cypress.env();

// 🔐 AUTHENTICATION
Cypress.Commands.add('loginToD1MainPage', () => {
  cy.visit('https://core.service-app.com/');
  cy.get('.btn').should('be.visible').click();

  cy.origin('https://dispatchone.b2clogin.com', { args: { email: env.email, password: env.password } }, ({ email, password }) => {
    cy.get('input[placeholder="Email Address"]').should('be.visible').type(email);
    cy.get('input[placeholder="Password"]').should('be.visible').type(password, { log: false });
    cy.get('button[type="submit"]').should('be.visible').click();
  });

  cy.url({ timeout: 10000 }).should('include', 'core.service-app.com');
  cy.waitForPageLoad();
});

// 📦 NAVIGATION
Cypress.Commands.add('navigateToDispatchSOWContract', () => {
  navigateContract();
  cy.log('✅ Navigated to Dispatch SOW Contract');
});

Cypress.Commands.add('clickContractBreadcrumb', () => {
  cy.contains('a', 'FSDP-24-2706').click();
});

// 🛠 UTILS
Cypress.Commands.add('hoverD1Logo', () => {
  cy.get('img[alt="D1 Logo"]').should('be.visible').trigger('mouseover');
});

Cypress.Commands.add('waitForPageLoad', () => {
  return cy.document().its('readyState').should('eq', 'complete')
    .then(() => cy.get(el.taskDashboardHeader, { timeout: 10000 }).should('be.visible'));
});

Cypress.Commands.add('waitForSeconds', (seconds) => {
  cy.wait(seconds * 1000);
});

Cypress.Commands.add('refreshAndWait', () => {
  cy.reload();
  cy.get('.circle-loading', { timeout: 10000 }).should('not.exist');
  cy.waitForPageLoad();
});

// 🎫 TICKETS
Cypress.Commands.add('addTicket', () => {
  cy.log('🎫 Adding Ticket');
  cy.get(el.addTicketButton).should('exist').click();
  cy.get(el.ticketForm).should('be.visible');
  cy.get(el.ticketTitleField).should('be.enabled').type('Cypress Ticket');
  cy.get(el.ticketSaveButton).should('be.enabled').click();
  cy.get(el.successToast).should('contain', 'Ticket added');
});

Cypress.Commands.add('editTicket', () => {
  cy.log('✏️ Editing Ticket');
  cy.get(el.ticketEditIcon).first().should('exist').click();
  cy.get(el.ticketForm).should('be.visible');
  cy.get(el.ticketTitleField).clear().type('Updated Ticket');
  cy.get(el.ticketSaveButton).click();
  cy.get(el.successToast).should('contain', 'Ticket updated');
});

Cypress.Commands.add('deleteStagedTicket', () => {
  cy.log('🗑️ Deleting Staged Ticket');
  cy.get(':nth-child(7) > .ng-star-inserted', { timeout: 60000 }).click();
  cy.get(el.ticketsHeader).should('contain', 'Tickets');
  cy.get('tbody tr:nth-child(1) td:nth-child(14) fieldflow-icon-button button').should('be.visible').click();
  cy.get('input[formcontrolname="title"]').clear().type('Test');
  cy.get('textarea[formcontrolname="description"]').clear().type('Test');
  cy.contains('button.danger', 'Delete').should('be.enabled').click();
});

// 📝 CLIENT PO
Cypress.Commands.add('addClientPONumber', () => {
  const poValue = env.poNumber || 'PO-FSDP-2706';
  cy.log('➕ Adding Client PO Number');

  cy.get('.primary.ng-star-inserted').click(); // Edit Contract
  cy.get('fieldflow-dialog[title="Edit Contract"]').should('be.visible');
  cy.get('[formcontrolname="clientPoNumber"]').clear().type(poValue);
  cy.contains('button', 'Save').click();
  cy.get('div[aria-label="Contract updated successfully"]').should('be.visible');
  cy.get('fieldflow-dialog[title="Edit Contract"]').should('not.exist');
});

Cypress.Commands.add('deleteClientPONumber', () => {
  cy.log('🧹 Deleting Client PO Number');

  cy.get('.primary.ng-star-inserted').click();
  cy.get('fieldflow-dialog[title="Edit Contract"]').should('be.visible');
  cy.get('[formcontrolname="clientPoNumber"]').clear();
  cy.contains('button', 'Save').click();
  cy.get('div[aria-label="Contract updated successfully"]').should('be.visible');
  cy.get('fieldflow-dialog[title="Edit Contract"]').should('not.exist');
});


//PO Value contains placeholder value and grayed out
Cypress.Commands.add('enableClientPONumber', () => {
  const poValue = env.poNumber || 'PO-FSDP-2706';
  cy.log('✅ Checking Client PO Placeholder');

  cy.contains('button', 'Summary').click();
  cy.get('form h1').should('contain.text', 'Ticket Summary');

  cy.get('#clientPoNumber')
    .should('exist')
    .and('be.visible')
    .and('have.attr', 'placeholder', poValue); // ✅ check placeholder instead of value
});

Cypress.Commands.add('disableClientPONumber', () => {
  cy.log('🚫 Disabling Client PO Number');

  cy.contains('button', 'Summary').click();
  cy.get('form h1').should('contain.text', 'Ticket Summary');
  cy.get('#clientPoNumber').should('be.visible').and('have.value', '');
});
