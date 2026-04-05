// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function ticketFinancials() {
  const expectedPrice = '$60.00';
  const expectedAuthCost = '$45.00';

  // Step 1: Verify detail-level financials
  cy.get(el.ticketFinancials.totalPrice, { timeout: 60000 })
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq(expectedPrice);
    });

  cy.get(el.ticketFinancials.totalAuthCost, { timeout: 60000 })
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq(expectedAuthCost);
    });

  // Step 2: Visit tickets list URL
  cy.visit(el.ticketFinancials.ticketsListUrl);

  // Step 3: Get the search input field and clear if it's not empty
  cy.wait(5000);
  cy.get(el.editTicket.searchInput)
    .should('be.visible')
    .then(($input) => {
      if ($input.val().trim().length > 0) {
        cy.wrap($input).clear();
      }
    })
    .type('Cypress Test Ticket');

  // Step 4: Wait for search results to appear dynamically
  cy.get(el.editTicket.row, { timeout: 5000 }).should('have.length.greaterThan', 0);

  // Step 5: Click on the first search result safely
  cy.intercept('GET', '**/tickets?*').as('fetchTickets');
  cy.wait('@fetchTickets');

  cy.get(el.editTicket.row)
    .should('have.length.above', 0);

  cy.get(el.editTicket.row, { timeout: 5000 }).first()
    .find(el.editTicket.link)
    .should('be.visible');

  // Step 6: Verify table-level financials
  cy.get(el.ticketFinancials.totalPriceHeader, { timeout: 60000 })
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq(expectedPrice);
    });

  cy.get(el.ticketFinancials.totalAuthCostHeader, { timeout: 60000 })
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq(expectedAuthCost);
    });
}
