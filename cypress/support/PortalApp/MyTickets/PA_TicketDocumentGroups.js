// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();
import 'cypress-file-upload';

export function paTicketDocument() {
  // Step 1: Click Add Document
  cy.contains('button', el.clientPortal.addDocumentButton).click();
  cy.log('✅ Step 1: Clicked Add Document');

  // Step 2: Ensure "Add New Document" label is visible
  cy.contains('h2', el.clientPortal.addNewDocumentLabel).should('be.visible');
  cy.log('✅ Step 2: Add New Document label is visible');

  // Step 3: Enter Document Title
  cy.get(el.clientPortal.documentTitleInput).type(el.clientPortal.documentTitle);
  cy.log(`✅ Step 3: Entered Document Title: ${el.clientPortal.documentTitle}`);

  // Step 4: Select Document Type
  cy.get(el.clientPortal.documentTypeDropdown).click();
  cy.get(el.clientPortal.docDropdownOption)
    .contains(el.clientPortal.documentTypeOption)
    .click();
  cy.log(`✅ Step 4: Selected Document Type: ${el.clientPortal.documentTypeOption}`);

  // Step 5: Enter Document Description
  cy.get(el.clientPortal.documentDescriptionInput).type(el.clientPortal.documentDescription);
  cy.log(`✅ Step 5: Entered Document Description: ${el.clientPortal.documentDescription}`);

  // Step 6: Upload Document
  cy.get(el.clientPortal.fileUploadInput)
    .should('exist')
    .attachFile(el.clientPortal.fileToUpload);
  cy.wait(3000);
  cy.log(`✅ Step 6: Uploaded file: ${el.clientPortal.fileToUpload}`);

  // Step 7: Click Save
  cy.get(el.clientPortal.docSaveButton)
    .contains(el.clientPortal.saveButtonLabel)
    .click();
  cy.log('✅ Step 7: Clicked Save button');

  // Step 8: Verify Attached Documents label is visible
  cy.contains('label', el.clientPortal.attachedDocumentsLabel).should('be.visible');
  cy.log('✅ Step 8: Verified Attached Documents label is visible');
}
