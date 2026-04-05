//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();
const env = Cypress.env(); 

// Feature Support Functions
import { login } from "../../../support/Login/SA_LoginGroups";
import { navigateContract } from '../../../support/ServiceApp/Delivery/SA_ContractGroups';
import { addTicket } from '../../../support/ServiceApp/Delivery/SA_AddTicketGroups';
import { editTicket } from '../../../support/ServiceApp/Delivery/SA_EditTicketGroups';
import { addSite } from '../../../support/ServiceApp/Delivery/SA_AddSiteGroups';
import { addActivity } from '../../../support/ServiceApp/Delivery/SA_AddActivityGroups';
import { addSchedule } from '../../../support/ServiceApp/Delivery/SA_AddScheduleGroups';

// Test block
describe('Automatic task update', () => {
  it('should show toast message for Automatic task update', () => {
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
    cy.log('✅ Navigated to contract');

    // Step 3: Add a new ticket
    addTicket();
    cy.log('✅ Ticket added');

    // Step 4: Edit the ticket
    editTicket();
    cy.log('✅ Ticket edited');

    // Step 5: Add site
    addSite();
    cy.log('✅ Site added');

    // Step 6: Add activity
    addActivity();
    cy.log('✅ Activity added');

    // Step 7: Add schedule
    addSchedule();
    cy.log('✅ Schedule added');
  });
});
