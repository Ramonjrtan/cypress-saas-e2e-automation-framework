// Cypress & Elements
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function addSite() {
  // Step 1: Click on Sites tab
  cy.get(el.sitesTabButton)
    .should('be.visible')
    .click();

  // Step 2: Wait until "Site Info" header is loaded
  cy.get(el.siteInfoHeader, { timeout: 20000 })
    .should("be.visible")
    .and("contain", "Site Info");

  // Step 3: Select "End Client" from the dropdown
  cy.get(el.endClientDropdown)
    .should("be.visible")
    .click()
    .type("Test Client (USE FOR TESTING){enter}");

  // Step 4: Click "Add Location" button
  cy.get(el.addLocationButton)
    .scrollIntoView()
    .should("be.visible")
    .and("not.be.disabled")
    .click();

  // Step 5: Ensure modal appears
  cy.get(el.siteModalContainer, { timeout: 20000 })
    .should("exist")
    .and("be.visible");

  // Step 6: Wait for modal header
  cy.get(el.siteModalHeader, { timeout: 10000 })
    .should("contain", "Select Site");

  // Step 7: Search for site location
  cy.get(el.searchInput)
    .should("be.visible")
    .clear()
    .type("Test location McD")
    .wait(3000);

  // Step 8: Select the radio button
  cy.get(el.radioButton)
    .should("exist")
    .click({ force: true })
    .wait(3000);

  // Step 9: Click "Save Client Site"
  cy.get(el.saveClientSiteButton)
    .should("be.visible")
    .click();

  // Toast: Task "Add Site"
  cy.get(el.toastMsg.autoUpdate, { timeout: 60000 })
    .should('be.visible')
    .contains('Task "Add Site" has been automatically completed.');
  cy.log('✅ Toast message for Add Site appears successfully');

  // Step 10: Verify success message
  cy.get(el.siteSuccessMessage, { timeout: 60000 })
    .should('be.visible');

  // Step 11: Ensure success message disappears before proceeding
  cy.get(el.siteSuccessMessage, { timeout: 60000 })
    .should('not.exist');

  cy.get(el.toastMsg.autoUpdate, { timeout: 60000 })
    .should('not.exist');

  cy.log("✅ Success message appeared and disappeared.");
}
