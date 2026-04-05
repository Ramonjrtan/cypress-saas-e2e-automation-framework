// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements(); 

export function poDetailsBcSync() {
  // Wait for the page to load partially synced PO badge
  cy.wait(5000);

  // Step 1: Verify Partial BC Synced badge is visible and click it
  cy.get(el.bcSync.ticketPartialSync, { timeout: 60000 })
    .should('be.visible')
    .click({ force: true });
  cy.log('✅ Partial BC Synced badge clicked');

  // Step 2: Reload the page to reflect updated sync status
  cy.reload();

  // Step 3: Check if Ticket BC Synced badge is visible
  cy.get(el.bcSync.ticketSync, { timeout: 60000 })
    .should('be.visible');
  cy.log('✅ Ticket BC Synced badge is visible');

  // Step 4: Verify PO BC Synced badge is visible
  cy.get(el.bcSync.activityPoSync, { timeout: 10000 })
    .should('be.visible');
  cy.log('✅ PO BC Synced badge is visible');
}
