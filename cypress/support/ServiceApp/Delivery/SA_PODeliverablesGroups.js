// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements(); 

export function poDeliverables() {
  // Step 1: Click on PO Deliverable tab
  cy.contains(el.deliverablesTab, 'Deliverables', { timeout: 10000 })
    .scrollIntoView()
    .should('be.visible')
    .click();

  // Step 2: Wait until the "Add Required Deliverables" page is fully loaded
  cy.contains(el.deliverablesHeader, 'Add Required Deliverables', { timeout: 10000 })
    .should('be.visible');

  // Step 3: Click "Add Required Deliverable" button
  cy.get(el.addDeliverableButton)
    .contains('Add Required Deliverable')
    .should('be.visible')
    .click();

  // Step 4: Wait until "Add Deliverable Requirement" modal appears
  cy.get(el.addDeliverableModalHeader)
    .contains('Add Deliverable Requirement')
    .should('be.visible');

  // Step 5: Enter Deliverable Name
  cy.get(el.deliverableNameInput)
    .should('be.visible')
    .clear()
    .type('Deliverable Test');

  // Step 6: Click Deliverable Type dropdown
  cy.get(el.deliverableTypeDropdown)
    .should('be.visible')
    .click();

  // Step 7: Select "Photos" from the dropdown
  cy.get(el.deliverableTypeOption)
    .contains('Photos')
    .click();

  // Step 8: Enter "1" in the No. of Files field
  cy.get(el.noOfFilesInput)
    .should('be.visible')
    .clear()
    .type('1');

  // Step 9: Click the Save button
  cy.contains(el.deliverableSaveButton, 'Save')
    .should('be.visible')
    .click();

  // Step 10: Verify success message appears
  cy.get(el.deliverableAddedToast, { timeout: 10000 }) 
    .should('be.visible');

  // Step 11: Wait briefly to ensure UI is stable (optional wait or assertion can go here)

  // Step 12: Click Upload Deliverable button
  cy.contains(el.deliverableUploadButton, 'Upload Deliverable')
    .should('be.visible')
    .click();

  // Step 13: Wait until the "Upload Deliverables" modal is loaded
  cy.contains(el.deliverableUploadModalHeader, 'Upload Deliverables', { timeout: 10000 })
    .should('be.visible');

  // Step 14: Attach file to the hidden input field
  cy.get(el.deliverableFileInput)
    .should('exist')
    .attachFile('Test_upload1.jpg');

  // Step 15: Click Next button
  cy.get(el.deliverableNextButton)
    .contains('Next', { timeout: 10000 })
    .should('be.visible')
    .click();

  // Step 16: Click Save button
  cy.get(el.deliverableFinalSaveButton)
    .contains('Save', { timeout: 10000 })
    .should('be.visible')
    .click();

  // Step 17: Verify success message appears
  cy.get(el.deliverableFinalToast, { timeout: 10000 }) 
    .should('be.visible');
}
