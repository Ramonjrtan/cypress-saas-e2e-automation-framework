//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function addTicket() {
  cy.wait(5000);

  // Step 1: Click on the Tickets tab and wait for it to be visible
  cy.get(el.ticketsTabButton, { timeout: 60000 })
    .should('be.visible')
    .click();

  // Step 2: Ensure the Tickets tab is fully loaded
  cy.get(el.ticketsHeader, { timeout: 60000 })
    .should('contain', 'Tickets');

  // Step 3: Wait until the "Add Ticket" button is enabled and clickable
  cy.get(el.addTicketButton, { timeout: 10000 })
    .should('be.visible')
    .and('not.be.disabled');

  // Step 4: Click on "Add Ticket" button
  cy.get(el.addTicketButton, { timeout: 10000 })
    .should('be.visible')
    .click();

  // Step 5: Handle Modal Appearance
  cy.get(el.addTicketModal, { timeout: 20000 })
    .should('exist')
    .and('be.visible');

  cy.get(el.addTicketModal).within(() => {
    // Ensure "Ticket Title" input field is visible before interacting
    cy.contains(el.ticketTitleLabel, 'Ticket Title').click(); // Click the label first

    cy.get(el.ticketTitleInput)
      .should('be.visible')
      .then(($input) => {
        if ($input.val().trim().length > 0) {
          cy.wrap($input).clear();
        }
      })
      .type('Cypress Test Ticket');

    // Step 6: Store text from the Ticket Title input
    cy.get(el.ticketTitleInput).invoke('val').as('TicketName');

    // Step 7: Wait until the "Save" button is enabled before clicking
    cy.waitUntil(() => 
      cy.get(el.ticketSaveButton).first()
        .should('be.enabled'),
      { timeout: 10000, interval: 500 }
    );

    // Step 8: Click the Save button safely
    cy.get(el.ticketSaveButton).first()
      .should('be.visible')
      .click();
  });

  // Step 9: Verify "Saved Successfully" message appears
  cy.get(el.ticketSuccessMessage, { timeout: 60000 })
    .should('be.visible');

  // Step 10: Ensure success message disappears before proceeding
  cy.get(el.ticketSuccessMessage, { timeout: 10000 })
    .should('not.exist');

  cy.log("✅ Success message appeared and disappeared.");
}
