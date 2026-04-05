// Cypress & Environment
import 'cypress-wait-until';
import 'cypress-real-events/support';
import { taskManagerPin } from './SA_TaskManagerPinGroups';
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function tasksUpdate() {
  const taskSelector = (accordionId, nthChild) =>
    `app-accordion-row.${accordionId} > .ng-trigger-contentVisibility > :nth-child(${nthChild}) > .wrapper > app-task-actions > [style="background-color: #2ecc71;"] > .mat-icon`;

  const TICKET_NAME = 'Cypress Test Ticket';

  cy.wait(3000);

  // Step 1: Click Ticket accordion to expand
  cy.contains(el.tasksUpdate.ticketAccordion, 'Ticket', { timeout: 10000 }).click();
  cy.log('✅ Expanded Ticket accordion');

  // Step 2: Staged Tasks
  cy.get(taskSelector('ng-tns-c84663556-9', 2), { timeout: 10000 }).click();   // Add Site
  cy.log('✅ Clicked Add Site task');

  cy.get(taskSelector('ng-tns-c84663556-12', 3), { timeout: 10000 }).click();  // Add Schedule
  cy.log('✅ Clicked Add Schedule task');

  cy.get(taskSelector('ng-tns-c84663556-16', 4), { timeout: 10000 }).click();  // Add Activity
  cy.log('✅ Clicked Add Activity task');

  // Step 3: In Work Tasks
  cy.get(taskSelector('ng-tns-c84663556-20', 2), { timeout: 10000 }).click();  // Assign Tech
  cy.log('✅ Clicked Assign Technician task');

  cy.get(taskSelector('ng-tns-c84663556-24', 3), { timeout: 10000 }).click();  // 24hr Client Notification
  cy.log('✅ Clicked 24hr Client Notification task');

  cy.get(taskSelector('ng-tns-c84663556-28', 4), { timeout: 10000 }).click();  // 1hr Client Notification
  cy.log('✅ Clicked 1hr Client Notification task');

  cy.get(taskSelector('ng-tns-c84663556-32', 5), { timeout: 10000 }).click();  // Tech WO Check In
  cy.log('✅ Clicked Technician WO Check In task');

  cy.get(taskSelector('ng-tns-c84663556-36', 6), { timeout: 10000 }).click();  // Onsite Client Notification
  cy.log('✅ Clicked Onsite Client Notification task');

  cy.get(taskSelector('ng-tns-c84663556-40', 7), { timeout: 10000 }).click();  // Tech WO Check Out
  cy.log('✅ Clicked Technician WO Check Out task');

  cy.get(taskSelector('ng-tns-c84663556-44', 8), { timeout: 10000 }).click();  // Offsite Client Notification
  cy.log('✅ Clicked Offsite Client Notification task');

  cy.get(taskSelector('ng-tns-c84663556-48', 9), { timeout: 10000 }).click();  // Send Summary Report
  cy.log('✅ Clicked Send Summary Report task');

  // Step 4: Wrap Up Tasks
  cy.get(taskSelector('ng-tns-c84663556-52', 2), { timeout: 10000 }).click();  // Review Deliverables
  cy.log('✅ Clicked Review/Upload Deliverables task');

  cy.get(taskSelector('ng-tns-c84663556-56', 3), { timeout: 10000 }).click();  // Add Ticket Result
  cy.log('✅ Clicked Add Ticket Result task');

  cy.get(taskSelector('ng-tns-c84663556-60', 4), { timeout: 10000 }).click();  // Add Issue Labels
  cy.log('✅ Clicked Add Issue Label(s) task');

  cy.get(taskSelector('ng-tns-c84663556-64', 5), { timeout: 10000 }).click();  // Rate Technician
  cy.log('✅ Clicked Rate Technician task');

  cy.get(taskSelector('ng-tns-c84663556-68', 6), { timeout: 10000 }).click();  // Confirm Financials
  cy.log('✅ Clicked Confirm Financials task');

  // Step 5: Wait for toast to disappear
  cy.get(el.toastMsg.autoUpdate, { timeout: 10000 }).should('be.visible');
  cy.log('ℹ️ Toast message appeared');

  cy.get(el.toastMsg.autoUpdate, { timeout: 60000 }).should('not.exist');
  cy.log('✅ Toast message disappeared');

  // Step 6: Final accordion & tasks
  cy.contains(el.tasksUpdate.finalAccordion, 'Ticket', { timeout: 10000 }).click();
  cy.log('✅ Re-expanded Ticket accordion');

  cy.get(el.tasksUpdate.finalTaskInternalSource).click();
  cy.log('✅ Clicked Internal Source task');

  cy.get(el.tasksUpdate.finalTaskSubmitInvoice).click();
  cy.log('✅ Clicked Submit Invoice to Client task');
   cy.wait(3000);

  cy.get(el.tasksUpdate.finalTaskConfirmReceipt).click({ force: true });
  cy.log('✅ Clicked Confirm Receipt of Payment task');
  cy.wait(5000);

  // Step 7: Sidebar check
  cy.reload();
  cy.wait(10000);
  cy.log('🔄 Page reloaded');

  // Step 8: Wait until Ticket status is visible
  cy.get(el.tasksUpdate.ticketStatusLabel, { timeout: 60000 }).should('be.visible');
  cy.log('✅ Ticket status label is visible');

  // Step 9: Pin Task Manager sidebar
  taskManagerPin();

  // Step 10: Verify ticket task and status
  cy.get(el.tasksUpdate.ticketStatusLabel).should('contain', 'Client Complete');
  cy.log('✅ Ticket status: Client Complete');

  cy.get(el.tasksUpdate.taskStatusPill, { timeout: 30000 }).should('be.visible');
  cy.log('✅ Task status: Client Complete');

  // Step 11: Intercept tickets search request
  cy.intercept('GET', '**/tickets?*').as('fetchTickets');
  cy.log('🔍 Intercepted ticket search request');

  // Step 12: Visit ticket list and search
  cy.visit(el.ticketFinancials.ticketsListUrl);
  cy.wait(5000);
  cy.log('📄 Visited Tickets list page');

  cy.get(el.editTicket.searchInput, { timeout: 60000 })
    .should('be.visible')
    .then(($input) => {
      if ($input.val().trim().length > 0) {
        cy.wrap($input).clear();
        cy.log('🔄 Cleared existing search input');
      }
    })
    .type(TICKET_NAME);
  cy.log(`🔎 Searched for ticket: ${TICKET_NAME}`);

  cy.wait('@fetchTickets');
  cy.log('✅ Ticket search request completed');

  cy.get(el.editTicket.row, { timeout: 10000 }).should('have.length.greaterThan', 0);
  cy.log('✅ Ticket row(s) found');

  cy.get(el.editTicket.row).first().find(el.editTicket.link).should('be.visible');
  cy.log('✅ Clickable link found in first ticket row');

  // Step 13: Final verify ticket status in list page
  cy.get(el.tasksUpdate.ticketListStatusCell).should('contain', 'Client Complete');
  cy.log('✅ Verified ticket status in list: Client Complete');
}
