// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function cancelTicketStatus() {
  // Step 1: Ticket status should be 'Cancelled'
  cy.get('.primary > app-legacy-status-label', { timeout: 10000 })
    .should('be.visible')
    .and('contain.text', 'Canceled');
  cy.log('✅ Ticket status is Cancelled');

  cy.reload();

  // Step 2: Click Activity tab
  cy.get(':nth-child(3) > button > p', { timeout: 60000 }).click();
  cy.log('✅ Activity tab clicked');

  // Step 3: Add Activity button should be disabled
  cy.get('fieldflow-button.ng-star-inserted > .primary', { timeout: 10000 })
    .should('be.disabled');
  cy.log('✅ Add Activity button is disabled');

  // Step 4: Total Price should be $0.00
  cy.get('#total-price')
    .should('be.visible')
    .and('contain.text', '$0.00');
  cy.log('✅ Total Price is $0.00');

  // Step 5: Click Buy tab
  cy.get(':nth-child(7) > button > p', { timeout: 10000 }).click();
  cy.log('✅ Buy tab clicked');

  cy.wait(5000);

  // Step 6: PO status should be 'Cancelled'
  cy.get('[headers="table-header-0-2-2"] > .ng-star-inserted', { timeout: 60000 })
    .should('be.visible')
    .and('contain.text', 'Canceled');
  cy.log('✅ PO status is Canceled');

  // Step 7: Assigned Cost should be $0.00
  cy.get('[headers="table-header-0-5-2"]', { timeout: 60000 })
    .should('be.visible')
    .and('contain.text', '0');
  cy.log('✅ Assigned Cost is $0.00');

  // Step 8: Click Summary tab
  cy.get(':nth-child(2) > button > p', { timeout: 60000 }).click();
  cy.log('✅ Summary tab clicked');

  // Step 9: Scroll to Ticket Result
  cy.get('ng-select[formcontrolname="ticketResult"]', { timeout: 60000 })
    .scrollIntoView()
    .should('be.visible');
  cy.log('✅ Scroll to Ticket Result field');

  // Step 10: Ticket result should be 'Cancelled - Non-Billable'
  cy.get('ng-select[formcontrolname="ticketResult"] .ng-value-label', { timeout: 60000 })
    .should('be.visible')
    .invoke('text')
    .then(text => {
      expect(text.trim()).to.equal('Canceled - Non-Billable');
    });
  cy.log('✅ Ticket status is Canceled - Non-Billable');

  // Step 11: Click Tickets in Breadcrumb
  cy.get('fieldflow-breadcrumbs.ng-star-inserted > :nth-child(7) > .ng-star-inserted', { timeout: 60000 })
    .should('be.visible')
    .click();

  // Step 12: Ensure the Tickets tab is fully loaded
  cy.get(el.editTicket.tabHeader, { timeout: 60000 })
    .should('contain', 'Tickets');

  cy.reload(); // Refresh the page to ensure all elements are loaded

  // Step 13: Get the search input field and clear if it's not empty
  cy.wait(5000);
  cy.get(el.editTicket.searchInput, { timeout: 60000 })
    .should('be.visible')
    .then(($input) => {
      if ($input.val().trim().length > 0) {
        cy.wrap($input).clear();
      }
    })
    .type('Cypress Test Ticket');

  // Step 14: Wait for search results to appear dynamically
  cy.get(el.editTicket.row, { timeout: 5000 }).should('have.length.greaterThan', 0);

  // Step 15: Click on the first search result safely
  cy.intercept('GET', '**/tickets?*').as('fetchTickets');
  cy.wait('@fetchTickets');

  cy.get(el.editTicket.row)
    .should('have.length.above', 0);

  cy.get(el.editTicket.row)
    .should('have.length.greaterThan', 0)
    .first()
    .find(el.editTicket.link)
    .should('be.visible');

  // Step 16: Status shows Cancelled
  cy.get(':nth-child(1) > [headers="table-header-0-4-1"] > .ng-star-inserted', { timeout: 5000 })
    .should('be.visible')
    .and('contain.text', 'Canceled');
}
