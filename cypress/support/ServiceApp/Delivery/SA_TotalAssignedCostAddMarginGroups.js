// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function totalAssignedCostMargin() {
  const expectedPrice = '$60.00';
  const totalAssignedCost = '$45.00';

  // Compute margin percentage: ((Price - Cost) / Price) * 100
  const price = parseFloat(expectedPrice.replace('$', ''));
  const cost = parseFloat(totalAssignedCost.replace('$', ''));
  const computedMargin = ((price - cost) / price * 100).toFixed(2) + '%';

  cy.reload(); // Refresh the page to ensure all elements are loaded

  cy.visit(el.ticketFinancials.ticketsListUrl);

  cy.wait(5000);
  cy.get(el.editTicket.searchInput)
    .should('be.visible')
    .then(($input) => {
      if ($input.val().trim().length > 0) {
        cy.wrap($input).clear();
      }
    })
    .type('Cypress Test Ticket');

  cy.get(el.editTicket.row, { timeout: 5000 }).should('have.length.greaterThan', 0);

  cy.intercept('GET', '**/tickets?*').as('fetchTickets');
  cy.wait('@fetchTickets');

  cy.get(el.editTicket.row)
    .should('have.length.above', 0);

  cy.get(el.editTicket.row, { timeout: 5000 }).first()
    .find(el.editTicket.link)
    .should('be.visible');

  // Verify Total Price
  cy.get(el.ticketFinancials.totalPriceHeader, { timeout: 60000 })
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq(expectedPrice);
    });

  // Verify Total Assigned Cost
  cy.get(el.ticketFinancials.totalAuthCostHeader, { timeout: 60000 })
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq(totalAssignedCost);
    });

  // Verify Computed Margin
  cy.get(el.ticketFinancials.marginHeader, { timeout: 60000 })
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq(computedMargin);
    });
}
