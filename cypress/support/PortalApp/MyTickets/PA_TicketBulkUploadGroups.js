//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();
import 'cypress-file-upload';

export function paTicketBulkUpload() {
  // Step 1: Click My Tickets
  cy.get(el.clientPortal.myTicketsLink).should('be.visible').click();
  cy.log('✅ Step 1: Clicked My Tickets');

  // Step 2: Click "+ Add Ticket" button
  cy.contains('button', '+ Add Ticket').should('be.visible').click();
  cy.log('✅ Step 2: Clicked "+ Add Ticket"');

  // Step 3: Click "Bulk Ticket Upload"
  cy.contains('button', 'Bulk Ticket Upload').should('be.visible').click();
  cy.log('✅ Step 3: Clicked "Bulk Ticket Upload"');

  // Step 4: Open the Contract dropdown and select value
  cy.get('mat-select[formcontrolname="Contract"]').should('be.visible').click();
  cy.contains('mat-option', 'Dispatch SOW CP Test (USE FOR').should('be.visible').click();
  cy.log('✅ Step 4: Selected contract: Dispatch SOW CP Test');

  // Step 5: Upload file
  cy.get(el.deliverableFileInput, { timeout: 10000 })
    .should('be.visible')
    .attachFile('TicketUpload.xlsx', { force: true });
  cy.log('✅ Step 5: Attached file TicketUpload.xlsx');

  // Step 6: Click "Upload File" button
  cy.contains('button', 'Upload File').should('be.visible').click();
  cy.log('✅ Step 6: Clicked "Upload File"');

  // Step 7: Confirm success message
  cy.get("div[aria-label='Uploaded Successfully']", { timeout: 30000 }).should('be.visible');
  cy.log('✅ Step 7: Upload success message verified');

  // Step 8: Go back to My Tickets
  cy.get(el.clientPortal.myTicketsLink).should('be.visible').click();
  cy.log('✅ Step 8: Navigated back to My Tickets');
}
