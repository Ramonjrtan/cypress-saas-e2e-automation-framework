// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();
const env = Cypress.env(); 

// Feature Support Functions (Alphabetized)
import { addTicket } from '../../../support/ServiceApp/Delivery/SA_AddTicketGroups';
import { editTicket } from '../../../support/ServiceApp/Delivery/SA_EditTicketGroups';
import { login } from '../../../support/Login/SA_LoginGroups';
import { navigateContract } from '../../../support/ServiceApp/Delivery/SA_ContractGroups';
import { taskManagerPin } from '../../../support/ServiceApp/Delivery/SA_TaskManagerPinGroups';
import { tasksUpdate } from '../../../support/ServiceApp/Delivery/SA_TasksUpdateGroup';

describe('Add ticket and complete Task workflow', () => {
  it('should add a ticket, edit it, pin Task Manager, and complete tasks', () => {
    cy.viewport(1920, 1080);

    // Step 1: Perform login
    login(env.email, env.password);
    cy.log('✅ Successfully logged in');

    // Wait until Task Dashboard loads
    cy.get(el.taskDashboardHeader, { timeout: 60000 })
      .should("be.visible")
      .and("contain", "Task Dashboard");

    // Step 2: Navigate to contract
    navigateContract();
    cy.log('✅ Contract - Navigated');

    // Step 3: Add a new ticket
    addTicket();
    cy.log('✅ Ticket - Added');

    // Step 4: Edit the ticket
    editTicket();
    cy.log('✅ Ticket - Edited');

    // Step 5: Pin the Task Manager sidebar
    taskManagerPin();
    cy.log('✅ Task Manager - Sidebar pinned');

    // Step 6: Update and complete all tasks
    tasksUpdate();
    cy.log('✅ Tasks - Updated and completed');
  });
});
