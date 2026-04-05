//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function navigateContract() {
  // Step 1: Navigate to the contract details page
  cy.visit(el.contract.detailsPage);

  // Step 2: Ensure the page is fully loaded
  cy.get(el.contract.header, { timeout: 60000 })
    .should('be.visible')
    .and('contain', 'Contract Details');
}
