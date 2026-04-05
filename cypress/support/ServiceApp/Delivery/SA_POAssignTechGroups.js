// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function poAssignTech() {
  // Step 1: Click on PO Assignment tab
  cy.get(el.poAssignTech.techpoTabButton)
    .contains('Assignment')
    .scrollIntoView()
    .should('be.visible')
    .click();

  // Step 2: Wait until the "Purchase Order" page is fully loaded
  cy.contains(el.poAssignTech.poPageHeader, 'Purchase Order', { timeout: 10000 })
    .should('be.visible');

  // Step 3: Click "Create Technician Assignment" button
  cy.get(el.poAssignTech.createTechAssignmentButton)
    .should('be.visible')
    .click();

  // Step 4: Wait until the "Assign Technician" page is fully loaded
  cy.contains(el.poAssignTech.assignTechHeader, 'Assign Technician', { timeout: 60000 })
    .should('be.visible');

  cy.wait(10000); // Wait for the page to load

  // Turn the toggle ON
  cy.get('#mat-mdc-slide-toggle-3-label', { timeout: 60000 }).click({ force: true });
  cy.wait(3000); // Wait for the toggle to activate

  // Step 5: Search for a technician by name
  cy.get('input[placeholder="Search..."]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('Technician Test 1');

  cy.wait(3000); // Wait for the search results to load

  // Step 6: Wait until the radio button is visible
  cy.get(el.poAssignTech.techRadioButton, { timeout: 180000 })
    .should('exist')
    .and('be.visible');

  // Step 7: Click the first radio button to select a technician
  cy.get(el.poAssignTech.techRadioButton, { timeout: 30000 })
    .should('exist')
    .and('be.visible')
    .first()
    .click({ force: true });

  // Step 8: Click the "Finalize Assignment" button
  cy.get(el.poAssignTech.finalizeAssignmentButton)
    .contains('Finalize Assignment')
    .scrollIntoView()
    .should('be.visible')
    .click();

  // Step 9: Verify success message appears
  cy.get(el.poAssignTech.successAssignMessage, { timeout: 10000 })
    .should('be.visible');

  // Step 10: Ensure success message disappears before proceeding
  cy.get(el.poAssignTech.successAssignMessage, { timeout: 10000 })
    .should('not.exist');

  // Step 11: Verify "Technician Assigned" section is visible
  cy.get(el.poAssignTech.technicianAssignedSection)
    .contains('Technician Assigned')
    .should('be.visible');

  // Step 12: Click on "Purchase Order" breadcrumb to navigate back
  cy.contains(el.poAssignTech.breadcrumbToPo, 'Purchase Orders', { timeout: 10000 }).click();


  // Step 13: Wait until the "Add PO" section is visible
  cy.contains(el.poAssignTech.addPoHeader, 'Add PO', { timeout: 10000 })
    .should('be.visible');
}
