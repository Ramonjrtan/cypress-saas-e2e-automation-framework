// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function poActivities() {
  // Step 1: Click the Activities tab
  cy.get(el.poTabButton)
    .scrollIntoView()
    .should('be.visible')
    .click();

  // Step 2: Wait for the activities API call to complete
  cy.intercept('GET', '**/api/PurchaseOrder/**/activities').as('getActivities');
  cy.wait('@getActivities', { timeout: 30000 });

  // Step 3: Click dropdown and select option
  cy.get('.mat-mdc-select-placeholder', { timeout: 30000 }).click();
  cy.get('#mat-option-2 > .mdc-list-item__primary-text', { timeout: 30000 }).click();

  // Step 4: Wait for the activity row to be visible
  cy.get('.table > tbody > tr.ng-star-inserted > :nth-child(2)')
    .should('exist')
    .as('activityRow');

  // Step 5: Click the activity row
  cy.get('@activityRow')
    .should('be.visible')
    .click();

  // Step 6: Wait for the checkbox to appear and click it
  cy.get(el.poActivityCheckbox, { timeout: 15000 })
    .should('exist')
    .should('be.visible')
    .click({ force: true });

  // Step 7: Check the checkbox if not already checked
  cy.get(el.poActivityCheckbox).then($checkbox => {
    if (!$checkbox.prop('checked')) {
      cy.get(el.poActivityCheckbox).check({ force: true });
    }
  });

  // Step 8: Enter "60" in the cost input field
  cy.get(el.poCostInput, { timeout: 15000 })
    .should('exist')
    .should('be.visible')
    .clear()
    .type('60')
    .type('{enter}');

  // Step 9: Click the Save button
  cy.get(el.poActivitySaveButton, { timeout: 15000 })
    .should('exist')
    .should('be.visible')
    .click();

  // Step 10: Verify success message appears
  cy.get(el.poActivitySuccessToast, { timeout: 10000 }) 
    .should('be.visible');

  // Step 11: Wait for success message to disappear
  cy.get(el.poActivitySuccessToast, { timeout: 10000 }) 
    .should('not.exist');

  cy.log("✅ PO activity successfully updated.");
}
