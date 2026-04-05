//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();
const env = Cypress.env(); 

//  Feature Support Functions
import { paAddTicket } from '../../../support/PortalApp/MyTickets/PA_CreateTicketGroups';
import { paLogin } from '../../../support/PortalApp/Login/PA_LoginGroups';

//  Test block
describe('Client Workspace - Add Ticket Flow', () => {
  it('should successfully add a new ticket through the Client Workspace', () => {
    cy.viewport(1920, 1080);

    // Step 1: Log in to the Client Workspace
    paLogin(env.email, env.password);
    cy.log('✅ Successfully logged in');

    // Step 2: Wait for the dashboard to load
    cy.get(el.clientPortal.dashboard, { timeout: 50000 }).should('be.visible');
    cy.log('✅ Dashboard is visible');

    // Step 3: Add a new ticket
    paAddTicket();
    cy.log('✅ Ticket added');

    // Step 4: Navigate to My Tickets and extract ticket number
    cy.get(el.clientPortal.myTicketsLink).should('be.visible').click();
    cy.log('✅ Success: Clicked My Tickets');

    cy.contains('h1', 'My Tickets', { timeout: 60000 }).should("be.visible");
    cy.log('✅ Success: My Tickets page loaded');

    cy.get('.ticket-no').first()
      .invoke('text')
      .then((cpticketTitle) => {
        cy.log('Full text: ' + cpticketTitle);
        const cpticketNumber = cpticketTitle.trim().split(',')[1]; // e.g. 'FSDP-2706-239175'
        cy.wrap(cpticketNumber).as('paTicketNumber');
        cy.log('✅ Ticket Number: ' + cpticketNumber);
      });
  });
});
