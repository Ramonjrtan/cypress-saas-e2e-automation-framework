//Cypress & Environment
import 'cypress-wait-until';
import 'cypress-real-events/support';


export function cancelTicket() {
  cy.wait(3000);

  // Step 1: Hover to reveal Task Manager sidebar
cy.get('div.tab.ng-star-inserted').realHover();

  // Step 2: Click the Push Pin icon to pin the sidebar
  cy.get('app-sidebar-header button:nth-child(2) mat-icon:nth-child(1)', { timeout: 10000 }).click();

  cy.wait(3000);
// Step 2: Click the More Options icon (three vertical dots)
  cy.get('mat-icon.material-symbols-outlined')
  .contains('more_vert')
  .should('be.visible')
  .click({ force: true });


  // Step 3: Click the Cancel Ticket button
cy.get('mat-icon.ticket-cancel-btn-icon', { timeout: 10000 })
  .should('be.visible')
  .and('contain.text', 'cancel')
  .click({ force: true });

  // Step 4: Verify Cancel Ticket modal is displayed
  cy.get('fieldflow-dialog[title="Cancel Ticket"] div.header > div', { timeout: 10000 })
    .contains('Cancel Ticket')
    .should('be.visible');

  // Step 5: Enter cancellation reason
  cy.get('textarea[placeholder="Enter reason for cancellation"]')
    .should('be.visible')
    .type('Cancel ticket testing');

  // Step 6: Click the Cancel button
  cy.get('button.danger.ng-star-inserted')
    .contains('Cancel')
    .should('be.visible')
    .click();

  // Step 7: Verify toast message
  const toast = 'div[aria-label="Ticket cancellation request has been submitted successfully."]';
  cy.get(toast, { timeout: 60000 }).should('be.visible');
  cy.get(toast, { timeout: 60000 }).should('not.exist');

  // Step 8: Click the Push Pin icon again to unpin the sidebar
  cy.get('app-sidebar-header button:nth-child(2) mat-icon:nth-child(1)', { timeout: 10000 }).realClick({ force: true });
  cy.wait(2000);

}
