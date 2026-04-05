// Cypress & Elements
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function addActivity() {
  // Step 1: Click on Activities tab
  cy.contains(el.activitiesTabButton, 'Activities')
    .should('be.visible')
    .click();

  // Step 2: Wait until the page is fully loaded
  cy.waitUntil(() => cy.get('body').should('not.have.class', 'loading'), {
    timeout: 10000,
    interval: 500,
  });

  // Step 3: Click "Add Activity" after ensuring it's visible
  cy.contains(el.addActivityButton, 'Add Activity')
    .should('be.visible')
    .click();

  // Step 4: Ensure modal appears
  cy.get(el.modalContainer, { timeout: 20000 })
    .should('exist')
    .and('be.visible');

  // Step 5: Ensure modal header appears
  cy.get(el.modalHeader, { timeout: 10000 })
    .should('contain', 'Add Activity');

  cy.wait(5000); // Wait for 5 seconds to ensure the modal is fully loaded

  // Function to search and select the activity with retry limit
  const searchAndSelectActivity = (retryCount = 0) => {
    const maxRetries = 3;

    cy.get(el.activityInput)
      .should('be.visible')
      .type('Automation Test Activity');

    cy.get(el.activityRow, { timeout: 10000 })
      .should('be.visible')
      .then(($activity) => {
        if ($activity.is(':visible')) {
          cy.wrap($activity).click();
        } else {
          if (retryCount < maxRetries) {
            cy.clear(el.activityCheckbox);
            cy.wait(5000);
            searchAndSelectActivity(retryCount + 1);
          } else {
            throw new Error('Activity not found after retries');
          }
        }
      });

    cy.get(el.activityCheckbox, { timeout: 10000 }).click({ force: true });
  };

  // Step 6: Search and select activity
  searchAndSelectActivity();

  // Step 9: Click on Save Activity
  cy.get(el.activitySaveButton).click({ force: true });

  // Toast: Task "Add Activities"
  cy.get(el.toastMsg.autoUpdate, { timeout: 10000 })
    .should('be.visible')
    .contains('Task "Add Activities" has been automatically completed.');
  cy.log('✅ Toast message for Add Activities appears successfully');

  // Step 10: Confirm success message appears
  cy.get(el.activitySuccessMessage, { timeout: 10000 })
    .should('be.visible');

  // Step 11: Ensure success message disappears before proceeding
  cy.get(el.imageSuccess).should('not.exist');
}
