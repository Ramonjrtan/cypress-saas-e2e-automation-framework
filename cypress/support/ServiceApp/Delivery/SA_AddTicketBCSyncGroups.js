// Cypress & Elements
import { elements } from "../../../support/Elements/elements";
const el = elements();


export function addTicketBcSync() {
  // Optional wait to allow the UI to settle (replace with better wait if possible)
  cy.wait(5000);

  // Step: Verify that the BC Synced badge (normal state) is visible
  cy.get(el.bcSync.ticketSync, { timeout: 60000 })
    .should('be.visible');
    
  cy.log('✅ Ticket BC Synced badge is visible');
}
