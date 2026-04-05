// Cypress & Environment
import { elements } from '../../../support/Elements/elements';
const el = elements();

export function editCpTicket() {
  // Step 1: Click on the Tickets tab
  cy.get(el.clientPortal.ticketTabButton, { timeout: 60000 })
    .should('be.visible')
    .click();
  cy.log('✅ Step 1: Clicked on Tickets tab');

  // Step 2: Wait for tab to fully load
  cy.get(el.clientPortal.ticketTabHeader, { timeout: 60000 })
    .should('contain', 'Tickets');
  cy.log('✅ Step 2: Tickets tab header loaded');

  // Step 3: Search for ticket number
  cy.get('@paTicketNumber').then((ticketNum) => {
    cy.wait(5000);
    cy.get(el.clientPortal.ticketSearchInput)
      .should('be.visible')
      .then(($input) => {
        if ($input.val().trim().length > 0) {
          cy.wrap($input).clear();
        }
      })
      .type(ticketNum);
    cy.log(`✅ Step 3: Searched for ticket number: ${ticketNum}`);
  });

  // Step 4: Ensure search results appear
  cy.get(el.clientPortal.ticketRow, { timeout: 30000 })
    .should('have.length.greaterThan', 0);
  cy.log('✅ Step 4: Ticket row(s) found');

  // Step 5: Intercept fetch and click first ticket
  cy.intercept('GET', '**/tickets?*').as('fetchTickets');
  cy.wait('@fetchTickets');

  cy.get(el.ticketRow)
    .first()
    .find(el.ticketLink)
    .should('be.visible')
    .click();
  cy.log('✅ Step 5: Clicked first ticket row');

  // Step 6: Wait for Ticket Details to load
  cy.waitUntil(() =>
    cy.get(el.clientPortal.ticketDetailsHeader).should('contain', 'Ticket Details'),
    { timeout: 10000, interval: 500 }
  );
  cy.log('✅ Step 6: Ticket Details page loaded');

  // Step 7: Optional wait for rendering
  cy.wait(2000);

  // Step 8: Click on Email tab
  cy.get(el.clientPortal.buyTabIcon)
    .contains('mail')
    .should('be.visible')
    .click();
  cy.log('✅ Step 8: Clicked Email tab');

  // Step 9: Wait for Email tab content to load
  cy.contains(el.clientPortal.ticketEmailLabel, 'No Conversation Selected', { timeout: 10000 })
    .should('be.visible');
  cy.log('✅ Step 9: Email tab content verified');
}
