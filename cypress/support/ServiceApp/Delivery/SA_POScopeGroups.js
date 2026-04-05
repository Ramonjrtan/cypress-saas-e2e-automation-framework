// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements(); 

export function poScope() {
  // Step 1: Click on PO Scope tab
  cy.contains(el.poScope.tabButton, 'Scope')
    .scrollIntoView()
    .should('be.visible')
    .click();

  // Step 2: Wait until the current page is loaded
  cy.contains(el.poScope.header, 'Schedule', { timeout: 10000 })
    .should('be.visible');

  // Step 3: Turn off toggle if it's on
  cy.get(el.poScope.toggle)
    .invoke('attr', 'class')
    .then((classList) => {
      if (classList.includes('cds--toggle__switch--checked')) {
        cy.get(el.poScope.toggle).click({ force: true });
      }
    });
    cy.wait(2000);

  // Step 4: Ensure dropdown is visible, enabled, and select value
  cy.get(el.poScope.scheduleDropdown)
    .scrollIntoView()
    .should('be.visible')
    .and('not.be.disabled');

  // Step 5: Wait until the dropdown has at least one valid option
  cy.get(el.poScope.dropdownOption)
    .should('have.length.greaterThan', 1);

  // Step 6: Select the first available option dynamically
  cy.get(el.poScope.scheduleDropdown)
    .select(1, { force: true })
    .blur()
  .then(($dropdown) => {
    // Manually trigger change event to ensure framework detects it
    $dropdown[0].dispatchEvent(new Event('change', { bubbles: true }));
  });

  cy.log('✅ Schedule selected');

  cy.wait(3000);

  // Step 7: Enter text in Required Tools field
  cy.get(el.poScope.textEditor, { timeout: 10000 })
    .each(($editor, index) => {
      cy.wrap($editor)
        .click()
        .clear()
        .type(`Cypress Automation Activity ${index + 1}`, { force: true })
     .blur() // important for triggering validation
      .then(($el) => {
        // Dispatch input/change events manually
        $el[0].dispatchEvent(new Event('input', { bubbles: true }));
        $el[0].dispatchEvent(new Event('change', { bubbles: true }));
      });
  });

  cy.log('✅ All text fields updated');

  // Step 8: Click on Save button
  cy.contains(el.poScope.saveButton, 'Save')
    .click({ force: true });

  cy.log('✅ Clicked the Save button');

  // Step 9: Confirm success message appears
  cy.get(el.poScope.successMessage, { timeout: 10000 }) 
    .should('be.visible');

  // Step 10: Ensure success message disappears before proceeding
  cy.get(el.poScope.successMessage, { timeout: 10000 }) 
    .should('not.exist');

  cy.log("✅ Success message appeared and disappeared.");
}
