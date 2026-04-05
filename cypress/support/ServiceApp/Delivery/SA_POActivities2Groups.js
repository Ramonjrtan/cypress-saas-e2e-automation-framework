// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function poActivities2() {
  // Step 1: Click the Activities tab
  cy.get(el.poTabButton)
    .scrollIntoView()
    .should('be.visible')
    .click();

  // Step 2: Wait for the activities API call to complete
  cy.intercept('GET', '**/api/PurchaseOrder/**/activities').as('getActivities');
  cy.wait('@getActivities', { timeout: 30000 });

  // Click the dropdown to ensure it is visible
  cy.get('.mat-mdc-select-placeholder', { timeout: 30000 }).click();

  // Select from the dropdown
  cy.get('#mat-option-2 > .mdc-list-item__primary-text', { timeout: 30000 }).click();

  // Step 3: Wait for the activity row to exist
  cy.get('.table > tbody > tr.ng-star-inserted > :nth-child(2)', { timeout: 30000 })
    .should('exist')
    .as('activityRow');

  // Step 4: Click the activity row
  cy.get('@activityRow')
    .should('be.visible')
    .click();

  // Step 5: Wait for the checkbox to appear and click it
  cy.get(el.poActivityCheckbox, { timeout: 15000 })
    .should('exist')
    .should('be.visible')
    .click({ force: true });

  // Step 6: Check the checkbox if not already checked
  cy.get(el.poActivityCheckbox).then($checkbox => {
    if (!$checkbox.prop('checked')) {
      cy.get(el.poActivityCheckbox).check({ force: true });
    }
  });

  // Step 7: Enter "45" in the cost input field
  cy.get(el.poCostInput, { timeout: 15000 })
    .should('exist')
    .should('be.visible')
    .clear()
    .type('45')
    .type('{enter}');

  // Step 8: Click the Save button
  cy.get(el.poActivitySaveButton, { timeout: 15000 })
    .should('exist')
    .should('be.visible')
    .click();

  // Step 9: Verify success message appears
  cy.get(el.poActivitySuccessToast, { timeout: 10000 }) 
    .should('be.visible');

  // Step 10: Wait for success message to disappear
  cy.get(el.poActivitySuccessToast, { timeout: 10000 }) 
    .should('not.exist');

  cy.log("✅ PO activity successfully updated.");
}
