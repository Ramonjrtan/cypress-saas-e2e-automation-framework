import { elements } from "../../Elements/elements";
const el = elements();

const contractUrl = 'https://core.service-app.com/delivery/contract-detail/client/10001/contract/2706/tickets';
const testTicketName = 'Cypress Test Ticket';

export function deleteTicketByName() {
  cy.visit(contractUrl);
  cy.wait(5000);

  // Search for ticket
  cy.get(el.editTicket.searchInput, { timeout: 60000 })
    .should('be.visible')
    .clear()
    .type(testTicketName);

  cy.intercept('GET', '**/tickets?*').as('fetchTickets');
  cy.wait('@fetchTickets');

  cy.wait(5000);
  // Check if delete button is present
  cy.get('body').then($body => {
    const deleteBtnSelector = 'app-ticket-deletion-action.ng-star-inserted > .ng-star-inserted > button > .mat-icon';

    if ($body.find(deleteBtnSelector).length > 0) {
      cy.get(deleteBtnSelector).first().click();

      cy.get('input[formcontrolname="title"]').clear().type('Test');
      cy.get('textarea[formcontrolname="description"]').clear().type('Test');
      cy.contains('button.danger', 'Delete').click({ force: true });

      cy.log('✅ Ticket deleted');
    } else {
      cy.log('ℹ️ Delete button not found, skipping...');
    }
  });
}
