// Cypress & Environment
import 'cypress-wait-until';
import { elements } from "../../support/Elements/elements.js";
const el = elements();


export function deleteDeal() {
  cy.wait(5000);

  // Step 1: Go to Deals page
  cy.visit(el.deals.dealsPageUrl, { timeout: 60000 });
  cy.log('✅ Successfully navigated to Deals page');

  // Step 2: Ensure header appears
  cy.get(el.deals.dealPageHeader, { timeout: 60000 })
    .contains('Deal')
    .should('be.visible');
  cy.log('✅ Deal page header is visible');

  cy.get(el.deals.dealSearchInput, { timeout: 60000 })
    .should('be.visible')
    .type('Cypress Test Deal', { force: true })
    .type('{enter}');
  cy.log('✅ Deal search input is visible and deal name entered');

  // Wait briefly for search results to load
  cy.wait(3000);

  // Step 3: Conditional check – if deal found, delete; else log
  cy.get('body').then($body => {
    if ($body.find(el.deals.deleteDealButton).length > 0) {
      // ✅ Deal found – proceed with deletion
      cy.log('✅ Deal found, proceeding with deletion');

      cy.get(el.deals.deleteDealButton, { timeout: 60000 }).click();

      cy.get(el.deals.confirmDeleteButton, { timeout: 60000 })
        .should('be.visible')
        .click();
      cy.log('✅ Successfully clicked Delete Deal button');

      cy.contains(el.deals.dealDeletionSuccessMessage, { timeout: 60000 })
        .should('be.visible');
      cy.log('✅ Deal deletion success message is visible');

      // Step 4: Ensure success message disappears before proceeding
      cy.contains(el.deals.dealDeletionSuccessMessage, { timeout: 60000 })
        .should('not.exist');
      cy.log('✅ Verified success message disappeared');

    } else {
      // Deal not found – log and exit
      cy.log('❌ Deal not found. No deletion needed.');
    }

    // Step 4: Verify Deal is no longer in the list
  cy.visit(el.deals.dealsPageUrl);
  cy.get(el.deals.dealSearchInput).should('be.visible').type('Cypress Test Deal{enter}');
  cy.wait(2000);
  cy.get('body').should('not.contain', 'Cypress Test Deal');
  cy.log('✅ Verified: Deal no longer visible in Deal list');

  });
}
