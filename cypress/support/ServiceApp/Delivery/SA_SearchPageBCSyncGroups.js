// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function searchPageBCSync() {

  // Step 1: Click on the second tab button
  cy.get(el.editTicket.tabButton, { timeout: 60000 })
    .should('be.visible')
    .click();

  // Step 2: Ensure the Tickets tab is fully loaded
  cy.get(el.editTicket.tabHeader, { timeout: 60000 })
    .should('contain', 'Tickets');

cy.wait(5000); // Wait for 5 seconds to ensure the page is fully loaded
  
    //BC Sync is present in the search page
    cy.get(el.bcSync.searchPageSync).should('be.visible')
    .and('contain', 'BC Synced')
}