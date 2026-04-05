// Cypress & Environment
import 'cypress-wait-until';
import { elements } from "../../../support/Elements/elements";
const el = elements();
const env = Cypress.env(); 

// Feature Support Functions
import { addActivity } from '../../../support/ServiceApp/Delivery/SA_AddActivityGroups';
import { addSchedule } from '../../../support/ServiceApp/Delivery/SA_AddScheduleGroups';
import { addSite } from '../../../support/ServiceApp/Delivery/SA_AddSiteGroups';
import { addTicket } from '../../../support/ServiceApp/Delivery/SA_AddTicketGroups';
import { editPo } from '../../../support/ServiceApp/Delivery/SA_EditPOGroup';
import { editTicket } from '../../../support/ServiceApp/Delivery/SA_EditTicketGroups';
import { login } from '../../../support/Login/SA_LoginGroups';
import { navigateContract } from '../../../support/ServiceApp/Delivery/SA_ContractGroups';
import { poActivities2 } from '../../../support/ServiceApp/Delivery/SA_POActivities2Groups';
import { poAssignTech } from '../../../support/ServiceApp/Delivery/SA_POAssignTechGroups';
import { poDeliverables } from '../../../support/ServiceApp/Delivery/SA_PODeliverablesGroups';
import { poScope } from '../../../support/ServiceApp/Delivery/SA_POScopeGroups';
import { ticketFinancials } from '../../../support/ServiceApp/Delivery/SA_TicketFinancialsGroup';
import { totalAssignedCostMargin } from '../../../support/ServiceApp/Delivery/SA_TotalAssignedCostAddMarginGroups';

// Test block
describe('Verify ticket Financials', () => {
  it('should verify Ticket Total Price and Total Authorized Cost', () => {
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

    // Step 8: Click on Buy tab
    editPo();
    cy.log('✅ Buy tab clicked');

    // Step 9: Add PO Scope
    poScope();
    cy.log('✅ PO Scope added');

    // Step 10: Add PO Activity
    poActivities2();
    cy.log('✅ PO Activity added');

    // Step 11: Add PO Deliverables
    poDeliverables();
    cy.log('✅ PO Deliverables added');

    // Step 12: Assign Technician
    poAssignTech();
    cy.log('✅ PO Assigned Technician');

    // Step 13: Verify Ticket Financials
    ticketFinancials();
    cy.log('✅ Ticket financials verified');

    // Step 14: Verify Total Assigned Cost with Margin
    totalAssignedCostMargin();
    cy.log('✅ Total Assigned Cost with Margin verified');

    cy.wait(3000); // Wait for any asynchronous operations to complete
    cy.log('✅ Test completed successfully');
  });
});
