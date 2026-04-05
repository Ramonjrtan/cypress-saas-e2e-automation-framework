// Cypress & Environment
import { navigateContract } from '../../../support/ServiceApp/Delivery/SA_ContractGroups';
import dayjs from 'dayjs';
import 'cypress-file-upload';
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function bulkUploadTicket() {
  cy.wait(5000); // Optional initial wait

  // Step 1: Navigate to contract
  navigateContract();
  cy.log('✅ Navigated to contract');

  // Step 2: Click on Uploads tab
  cy.get(el.uploadsTabButton, { timeout: 60000 })
    .should('be.visible')
    .click();
  cy.log('✅ Clicked on Uploads tab');

  // Step 3: Confirm Ticket Uploads section loaded
  cy.get(el.ticketsHeader, { timeout: 60000 })
    .should('contain', 'Ticket Uploads')
    .and('be.visible');
  cy.log('✅ Confirmed Tickets tab is fully loaded');

  // Step 4: Click Bulk Upload button
  cy.get(el.bulkUploadButton, { timeout: 10000 })
    .should('be.visible')
    .click();
  cy.log('✅ Clicked on Bulk Upload button');

  // Step 5: Confirm modal is visible
  cy.get('[role="dialog"]', { timeout: 10000 })
    .should('exist')
    .and('be.visible');
  cy.log('✅ Modal popup is visible and ready');

  // Step 6: Confirm Bulk Ticket Upload header
  cy.get(el.bulkTicketHeader, { timeout: 10000 })
    .should('contain', 'Bulk Ticket Upload')
    .and('be.visible');
  cy.log('✅ Bulk Upload modal appeared');

  // Step 7: Enter upload title
  cy.get(el.bulkUploadName, { timeout: 10000 })
    .should('be.visible')
    .type('Cypress Test Ticket Bulk Upload');
  cy.log('✅ Entered bulk upload title');

  // Step 8: Intercept upload status request
  cy.intercept('POST', '**/api/status').as('uploadStatusCheck');

  // Step 9: Attach the file
  cy.get(el.deliverableFileInput)
    .should('be.visible')
    .click({ force: true })
    .attachFile('TicketUpload.xlsx', {
    subjectType: 'input',
    force: true
  });
  cy.log('✅ File TicketUpload.xlsx attached');

  // Step 10: Confirm file appears in list
  cy.get('fieldflow-section-card')
    .eq(1)
    .within(() => {
      cy.contains('TicketUpload.xlsx').should('exist');
    });
  cy.log('✅ File displayed in UI');

  // Step 11: Wait for file processing
  cy.wait('@uploadStatusCheck');
  cy.wait(5000); // Optional wait for UI stabilization

  // Step 12: Click Upload File button
  cy.get(el.uploadFileButton, { timeout: 10000 })
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });
  cy.log('✅ Clicked on Upload File button');

  // Step 13: Confirm modal closed
  cy.get('[role="dialog"]', { timeout: 15000 }).should('not.exist');
  cy.log('✅ Modal popup closed');

  // Step 14: Confirm page fully reloaded
  cy.document().its('readyState').should('eq', 'complete');
  cy.log('✅ Page reloaded after modal closure');

  // Step 15: Confirm status row is visible
  cy.get('tbody tr:first-child td:nth-child(6)', { timeout: 10000 })
    .should('be.visible');
  cy.log('✅ Status row appeared');

  // Step 16: Hover on D1 logo
  cy.get(el.saLogo).trigger('mouseover');
  cy.log('✅ Hovered on D1 Logo');

  // Step 17: Confirm upload status is "Successful"
  cy.get('tbody tr:first-child td:nth-child(6)', { timeout: 10000 })
    .should('contain.text', 'Successful');
  cy.log('✅ Upload status is Successful');

  // Step 18: Confirm date matches current time
  const formattedDate = dayjs().format('M/D/YY, h:mm A');
  cy.get('tbody tr:first-child td:nth-child(5)')
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.equal(formattedDate);
      cy.log(`✅ Upload Date: ${formattedDate}`);
    });
}
