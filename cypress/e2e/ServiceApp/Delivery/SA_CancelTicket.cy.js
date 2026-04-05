// Cypress & Environment
import 'cypress-wait-until';
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
import { cancelTicket } from '../../../support/ServiceApp/Delivery/SA_CancelTicketGroups';
import { cancelTicketStatus } from '../../../support/ServiceApp/Delivery/SA_CancelTicketStatus';

// Test block
describe('Add ticket, update details, then Cancel ticket', () => {
    
  it('should Add ticket, update details, then Cancel ticket', () => {
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

    // Step 7: Cancel the ticket
    cancelTicket();
    cy.log('✅ Ticket cancelled');

    // Step 8: Verify ticket status is Cancelled
    cancelTicketStatus();
    cy.log('✅ Ticket status verified as Cancelled');
  });

});
