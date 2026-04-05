// Cypress & Environment
import 'cypress-wait-until';
import 'cypress-real-events/support';

import { elements } from "../../../support/Elements/elements";

const el = elements();

// Constants
const testTicketName = 'Cypress Test Ticket';
const contractUrl = 'https://core.service-app.com/delivery/contract-detail/client/10001/contract/2706/tickets';

export function resetStaged() {
  const TICKET_NAME = 'Cypress Test Ticket';
  // Step 1: Wait and expand the Ticket accordion
  cy.contains(el.tasksUpdate.ticketAccordion, 'Ticket', { timeout: 10000 })
    .should('be.visible')
    .click();
  cy.log('✅ Expanded Ticket accordion');

cy.wait(3000);

  // Step 2: Click "Staged" toggle button
cy.contains('button', 'Staged', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click();

  cy.log('✅ Clicked Staged toggle');

  // Step 3: Wait until undo icon appears and click it
cy.get('body').then($body => {
  if ($body.find(':nth-child(2) > .wrapper > .content > app-completed-date > app-task-descriptors.ng-star-inserted > .reset-button > .mat-icon').length > 0) {
    cy.get(':nth-child(2) > .wrapper > .content > app-completed-date > app-task-descriptors.ng-star-inserted > .reset-button > .mat-icon', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
    cy.log('✅ Undo task performed');

      //confirm Reset
  cy.get('[buttontype="danger"] > .danger', { timeout: 10000 })
  .should('be.visible')
    .click({ force: true });
    cy.wait(5000);

  } else {
    cy.log('ℹ️ No reset button found, skipping...');
  }
});

  // //confirm Reset
  // cy.get('[buttontype="danger"] > .danger', { timeout: 10000 })
  // .should('be.visible')
  //   .click({ force: true });
  //   cy.wait(5000);

 cy.log('📄 Navigating to Tickets page');
    cy.visit(contractUrl);
    cy.wait(5000);

      // Step 1: Hover to reveal Task Manager sidebar
  cy.get(el.taskManager.sidebarHoverTab, { timeout: 60000 }).realHover();

}
