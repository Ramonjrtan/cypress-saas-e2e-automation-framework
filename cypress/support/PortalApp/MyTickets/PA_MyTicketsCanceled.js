// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function paMyTicketsCanceled() {
  const spinnerSelector =
    ':nth-child(1) > .col-sm-3 > .mat-mdc-progress-spinner > .mdc-circular-progress__indeterminate-container > .mdc-circular-progress__spinner-layer > .mdc-circular-progress__circle-left > .mdc-circular-progress__indeterminate-circle-graphic > circle';
  const pantoneSelector = '.status-count.ng-star-inserted > .count';

  // Step 1: Click My Tickets
  cy.get('.tickets > a', { timeout: 10000 }).should('be.visible').click();
  cy.log('✅ Step 1: Clicked My Tickets');

  // Step 2: Wait until Staged status element has a non-empty value
  cy.get(
    'body > app-root:nth-child(1) > app-dashboard-layout:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > app-home:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)',
    { timeout: 60000 }
  )
    .should('be.visible')
    .invoke('text')
    .should((text) => {
      expect(text.trim()).to.not.be.empty;
    });
  cy.log('✅ Step 2: Staged status value loaded');

  // Step 3: Enter date 1/1/2025
  cy.get(
    '.mat-mdc-form-field.ng-tns-c508571215-0 > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix > #date-picker-input',
    { timeout: 10000 }
  )
    .should('be.visible')
    .clear()
    .type('1/1/2025')
    .blur();
  cy.log('✅ Step 3: Entered date 1/1/2025');

  cy.wait(10000);

  // Step 3.1: Conditionally wait for spinner
  cy.log('⏳ Step 3.1: Checking if spinner appears...');
  cy.get('body', { timeout: 10000 }).then(($body) => {
    if ($body.find(spinnerSelector).length > 0) {
      cy.log('⏳ Spinner found, waiting for it to disappear...');
      cy.get(spinnerSelector, { timeout: 10000 }).should('exist');
      cy.get(spinnerSelector, { timeout: 60000 }).should('not.exist');
      cy.log('✅ Spinner appeared and disappeared');
    } else {
      cy.log('ℹ️ Spinner not found, continuing to next step...');
    }
  });

  // Step 3.2: Wait for Pantone value to appear
  cy.log('⏳ Step 3.2: Waiting for Pantone value to reappear...');
  cy.get(pantoneSelector, { timeout: 60000 })
    .should('be.visible')
    .invoke('text')
    .should((text) => {
      expect(text.trim()).to.not.be.empty;
    });
  cy.log('✅ Pantone value is visible again');

  // Step 4: Click the Status dropdown
  cy.get('ng-select:nth-of-type(3) input',{ timeout: 60000 }).should('be.visible').click();
  cy.log('✅ Step 4: Clicked Status dropdown');

  // Step 5: Select "Canceled" from dropdown
  cy.get('.ng-dropdown-panel').should('be.visible');
  cy.get('.ng-option-label.ng-star-inserted', { timeout: 60000 })
    .contains('Canceled')
    .should('be.visible')
    .click();
  cy.log('✅ Step 5: Selected "Canceled" status');

   cy.wait(20000);

  //Verify Canceled tickets showing in the table list
cy.get('td[headers="table-header-0-4-0"] > .status-disabled')
  .should('have.length.greaterThan', 0)
  .each(($el) => {
    cy.wrap($el)
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.eq('Canceled');
      });
  });

cy.log('✅ Verified all visible statuses are "Canceled"');



  // Step 6: Wait for updated Pantone value
  cy.log('⏳ Step 6: Waiting for Pantone marker (Canceled count)...');
  cy.get(pantoneSelector, { timeout: 60000 })
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      const trimmed = text.trim();
      cy.log(`✅ Found Pantone value: "${trimmed}"`);
      expect(trimmed).to.not.be.empty;
    });

  // Step 7: Recheck Pantone value after update
  cy.log('🔁 Step 7: Verifying Pantone value refresh...');
  cy.get(pantoneSelector, { timeout: 60000 })
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      const trimmed = text.trim();
      cy.log(`✅ Refreshed Pantone value: "${trimmed}"`);
      expect(trimmed).to.not.be.empty;
    });

  // Step 8: Validate count > 0
  cy.log('🔢 Step 8: Validate Canceled Count > 0');
  cy.get(pantoneSelector, { timeout: 60000 })
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      const count = parseInt(text.trim(), 10) || 0;
      cy.log(`ℹ️ Retrieved "Canceled" count: ${count}`);
      expect(count).to.be.greaterThan(0);
      // cy.log('✅ Step 8: Canceled count is greater than 0');
    });
}
