//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();
const env = Cypress.env(); 

//  Feature Support Functions
import { paLogin } from '../../../support/PortalApp/Login/PA_LoginGroups';
import { paAddTicket } from '../../../support/PortalApp/MyTickets/PA_CreateTicketGroups';

//  Test block
describe('Visit different origins', () => {
  it('should login and work across multiple origins', () => {
    cy.viewport(1920, 1080);

    const { email, password } = env;

    // Step 1: Log in to Client Workspace
    paLogin(email, password);
    cy.log('✅ Successfully logged in');

    // Step 2: Wait for the dashboard to load
    cy.get(el.clientPortal.dashboard, { timeout: 50000 }).should('be.visible');
    cy.log('✅ Dashboard is visible');

    // Step 3: Create a new ticket
    paAddTicket();
    cy.log('✅ Ticket created in client portal');

    // Step 4: Logout from Client Workspace
    cy.get('.name').should('be.visible').click();
    cy.contains('Logout').should('be.visible').click();
    cy.wait(3000);

    // Step 5: Intercept B2C redirect URL
    cy.intercept('GET', '**/b2c_1_dispatch3_signupsignin/**').as('b2cRedirect');

    // Step 6: Visit Core site
    cy.visit('https://core.service-app.com');

    // Step 7: Trigger B2C login
    cy.origin('https://core.service-app.com', () => {
      cy.get('.btn', { timeout: 20000 }).should('be.visible').click();
    });

    // // Step 8: Wait for B2C redirect
    // cy.wait('@b2cRedirect');

    // Step 9: Perform B2C Login
    cy.origin('https://dispatchone.b2clogin.com', {
      args: { email, password }
    }, ({ email, password }) => {
      cy.get('input[placeholder="Email Address"]').should('be.visible').type(email);
      cy.get('input[placeholder="Password"]').should('be.visible').type(password, { log: false });
      cy.get('button[type="submit"]').should('be.visible').click();
    });

    // Step 10: Confirm return to core site
    cy.wait(3000);
    cy.origin('https://core.service-app.com', () => {
      cy.url().should('include', 'core.service-app.com');
    });

    // Step 11: Wait for Task Dashboard to load
    cy.origin('https://core.service-app.com', {
      args: { taskDashboardHeader: el.taskDashboardHeader }
    }, ({ taskDashboardHeader }) => {
      cy.get(taskDashboardHeader, { timeout: 60000 })
        .should('be.visible')
        .and('contain', 'Task Dashboard');
      cy.log('✅ Task Dashboard is visible');
    });

    // Step 12: Navigate to contract page
    cy.origin('https://core.service-app.com', {
      args: {
        contractDetailsPage: el.contract.detailsPage,
        contractHeader: el.contract.header
      }
    }, ({ contractDetailsPage, contractHeader }) => {
      cy.visit(contractDetailsPage);
      cy.get(contractHeader, { timeout: 60000 })
        .should('be.visible')
        .and('contain', 'Contract Details');
      cy.log('✅ Navigated to contract');
    });

    // Step 13: Edit CP Ticket
    cy.intercept('GET', '**/tickets?*').as('fetchTickets');

    cy.origin('https://core.service-app.com', {
      args: {
        ticketTabButton: el.editTicket.tabButton,
        ticketTabHeader: el.editTicket.tabHeader,
        ticketRow: el.editTicket.row,
        ticketSearchInput: el.editTicket.searchInput,
        ticketDetailsHeader: el.editTicket.detailsHeader,
        buyTabIcon: el.buyTabIcon,
        ticketEmailLabel: el.sticketEmailLabel
      }
    }, ({
      ticketTabButton,
      ticketTabHeader,
      ticketRow,
      ticketSearchInput,
      ticketDetailsHeader,
      buyTabIcon,
      ticketEmailLabel
    }) => {

      // Step 1: Click on the Tickets tab
      cy.get(ticketTabButton, { timeout: 60000 }).should('be.visible').click();

      // Step 2: Wait for Tickets header to be visible
      cy.get(ticketTabHeader, { timeout: 60000 }).should('contain', 'Tickets');

      // Step 3: Wait for ticket table data and get the first ticket link
      cy.wait('@fetchTickets');
      cy.get(ticketRow, { timeout: 30000 }).should('have.length.greaterThan', 0);

      // Step 4: Extract ticket number
      cy.get(ticketRow).first().find('a[href*="/ticket"]').first()
        .should('be.visible')
        .invoke('attr', 'href')
        .then((href) => {
          const ticketNum = href.split('/').pop();
          cy.wrap(ticketNum).as('paTicketNumber');
        });

      // Step 5: Search for the ticket by number
      cy.get('@paTicketNumber').then((ticketNum) => {
        cy.get(ticketSearchInput)
          .should('be.visible')
          .clear()
          .type(ticketNum);
      });

      // Step 6: Wait for filtered results to load
      cy.wait('@fetchTickets');
      cy.get(ticketRow, { timeout: 10000 }).should('have.length.above', 0);

      // Step 7: Click the filtered ticket link
      cy.get(ticketRow).first().within(() => {
        cy.get('a[href*="/ticket"]')
          .should('exist')
          .should('be.visible')
          .then(($link) => {
            cy.wrap($link).click({ force: true });
          });
      });

      // Step 8: Wait for Ticket Details to load
      cy.get(ticketDetailsHeader, { timeout: 10000 })
        .should('contain', 'Ticket Details');

      cy.wait(2000);

      // Step 9: Click on Email tab
      cy.get(buyTabIcon)
        .contains('mail')
        .should('be.visible')
        .click();

      cy.wait(3000);

      // Step 10: Wait for conversation view
      cy.contains(ticketEmailLabel, 'No Conversation Selected', { timeout: 10000 })
        .should('be.visible');
    });

    // Step 14: (Optional) Final verification or teardown
  });
});
