import { elements } from "../../../support/Elements/elements";
import { login } from "../../../support/Login/SA_LoginGroups";
import { deleteTicketByName } from "../../../support/ServiceApp/Delivery/SA_DeleteHelpers";
import { resetStaged } from "../../../support/ServiceApp/Delivery/SA_ResetStagedGroup";
import { editTicket } from '../../../support/ServiceApp/Delivery/SA_EditTicketGroups';
import { taskManagerPin } from "../../../support/ServiceApp/Delivery/SA_TaskManagerPinGroups";
import { navigateContract } from '../../../support/ServiceApp/Delivery/SA_ContractGroups';

const el = elements();
const env = Cypress.env();

// ✅ Name of ticket to delete
const testTicketName = 'Cypress Test Ticket';

describe('Delete Staged Ticket', () => {
  it('should delete a staged ticket successfully', () => {
    cy.viewport(1920, 1080);

    cy.log('🔐 Logging in');
    login(env.email, env.password);

    // Wait for dashboard to appear
    cy.get(el.taskDashboardHeader, { timeout: 60000 })
      .should('be.visible')
      .and('contain', 'Task Dashboard');
    cy.log('✅ Successfully logged in');

        navigateContract();
        cy.log('✅ Navigated to contract');

    // Edit the test ticket
    editTicket();
    cy.log('✏️ Ticket opened for editing');

    // Pin Task Manager
    taskManagerPin();
    cy.log('📌 Task Manager sidebar pinned');

    // Reset status to staged
    resetStaged();
    cy.log('🔄 Task status reset');

    // Delete the ticket
    deleteTicketByName(testTicketName);
    cy.log(`🗑️ Deleted ticket: ${testTicketName}`);

    cy.log('✅ Ticket deletion process completed');
  });
});
