// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function editPo() {
  let savedPONumber = ''; // Declare variable to store PO number

  // Step 1: Click on the Buy tab
  cy.wait(3000); // Wait for the page to load

  cy.get(el.buyTabIcon)
    .should('be.visible')
    .contains(el.buyTabText)
    .click();

  // Step 2: Wait for the 'Staged' label to appear to ensure the page has loaded
  cy.contains(el.stagedLabel, 'Staged', { timeout: 10000 })
    .should('be.visible');

  // ✅ Save PO number before editing
  cy.get('[headers="table-header-0-1-9"] > .buy-po-number')
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      savedPONumber = text.trim();
      cy.log('💾 Saved PO Number:', savedPONumber);
    });

  // Step 3: Click the first available Edit PO button
  cy.get(el.editPoIcon)
    .contains('edit')
    .first()
    .click();

  // Step 4: Wait for the large modal container to be visible
  cy.get(el.modalContainerLg, { timeout: 20000 })
    .should('exist')
    .and('be.visible');

  // Step 5: Verify the modal header contains 'Edit PO/WO' and saved PO number
  cy.then(() => {
    cy.get(el.modalHeaderPo)
      .should('be.visible')
      .and('contain', `Edit PO/WO ${savedPONumber}`);
  });
}
