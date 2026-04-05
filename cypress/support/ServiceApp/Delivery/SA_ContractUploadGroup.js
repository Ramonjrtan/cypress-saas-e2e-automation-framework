// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function contractUpload() {
  // Step 1: Visit the contract document upload page URL
  cy.visit(el.contractDocument.contractDocumentsPage);

  // Step 2: Verify the page header contains 'Documents' and is visible
  cy.get(el.contractDocument.pageHeader)
    .should('contain', 'Documents')
    .and('be.visible');

// Step 3: Search for existing document named "Test Document Name"
 cy.get('input[placeholder="Search"]', { timeout: 10000 })
  .should('be.visible')
  .clear()
  .type('Test Document Name');

  cy.wait(5000);

// Wait for the results or "no records" message
cy.get('body', { timeout: 10000 }).then(($body) => {
  if ($body.find('td[title="Test Document Name.xlsb"]', { timeout: 10000 }).length > 0) {
    // ✅ Document exists
    cy.log('✅ Document found');
    cy.get('td[title="Test Document Name.xlsb"]', { timeout: 10000 }).should('be.visible');
    // Add actions here if document exists
  } else if ($body.text().includes('No records available for the selected filters.')) {
    // ⚠️ Document not found
    cy.log('⚠️ Document not found');
    // Add fallback or create document if needed
  } 
  // else {
  //   // 🚨 Unexpected case
  //   throw new Error('Unexpected page state – neither document nor no-records message found');
  // }
});

  // Step 4: Check if delete button appears (indicating match found), delete if exists
  cy.get('body').then(($body) => {
    if ($body.find('[buttonstyle="danger"] > button > .mat-icon').length > 0) {
      cy.log('❌ Existing document found, deleting...');
      cy.get('[buttonstyle="danger"] > button > .mat-icon')
        .first()
        .click();
      cy.get('.cds--btn.cds--btn--danger').contains('Delete').should('be.visible').click();
      cy.wait(5000); // Wait for deletion to complete
      cy.get('input[placeholder="Search"]').clear(); // Clear search for fresh add
    } else {
      cy.log('✅ No existing document found, proceeding...');
    }
  });

  // Step 5: Click the "Add Document" button to open the upload modal
  cy.log('Clicking Add Document button');
  cy.get(el.contractDocument.addDocumentButton)
    .should('be.visible')
    .click();

  // Step 6: Wait for the modal container to be visible
  cy.get(el.contractDocument.modalContainer)
    .should('exist')
    .and('be.visible');

  // Step 7: Verify modal header contains 'Add Document'
  cy.get(el.contractDocument.modalHeader)
    .should('be.visible')
    .and('contain', 'Add Document');

  // Step 8: Enter the document name into the input field
  cy.log('Typing document name');
  cy.get(el.contractDocument.documentNameInput)
    .should('be.visible')
    .clear()
    .type('Test Document Name');

  // Step 9: Select Document Type
  cy.get(el.contractDocument.documentTypeDropdown)
    .should('be.visible')
    .select('Proforma');

  // Step 10: Enter description
  cy.get(el.contractDocument.descriptionTextarea)
    .should('be.visible')
    .type('This is a test document description');

  // Step 11: Attach the file
  cy.log('Attaching file');
  cy.get(el.deliverableFileInput)
    .should('exist')
    .attachFile('sample_xlsb.xlsb', { force: true });
  cy.log('✅ File sample_xlsb.xlsb attached successfully');

  // Step 12: Click Save
  cy.log('Clicking Save button');
  cy.get(el.contractDocument.saveButton)
    .should('be.visible')
    .click();

  // Step 13: Wait for modal to close
  cy.get(el.contractDocument.modalContainer).should('not.exist');
  cy.log('✅ Document upload completed');

  // Step 14: Search and verify document appears in list
  cy.get('input[placeholder="Search"]').type('Test Document Name');
  cy.get('[headers="table-header-0-0-1"]').should('contain', 'Test Document Name.xlsb');

  cy.wait(3000);
}
