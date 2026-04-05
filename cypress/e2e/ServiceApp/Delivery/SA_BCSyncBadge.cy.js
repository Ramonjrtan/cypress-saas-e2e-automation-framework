// Cypress & Environment
import 'cypress-wait-until';
import { elements } from "../../../support/Elements/elements";
const el = elements();
const env = Cypress.env(); 

// Feature Support Functions (alphabetically)
import { activityBcSync } from '../../../support/ServiceApp/Delivery/SA_ActivityBCSyncGroups';
import { addActivity } from '../../../support/ServiceApp/Delivery/SA_AddActivityGroups';
import { addSchedule } from '../../../support/ServiceApp/Delivery/SA_AddScheduleGroups';
import { addSite } from '../../../support/ServiceApp/Delivery/SA_AddSiteGroups';
import { addTicket } from '../../../support/ServiceApp/Delivery/SA_AddTicketGroups';
import { addTicketBcSync } from '../../../support/ServiceApp/Delivery/SA_AddTicketBCSyncGroups';
import { editTicket } from '../../../support/ServiceApp/Delivery/SA_EditTicketGroups';
import { login } from '../../../support/Login/SA_LoginGroups';
import { navigateContract } from '../../../support/ServiceApp/Delivery/SA_ContractGroups';
import { poActivities } from '../../../support/ServiceApp/Delivery/SA_POActivitiesGroups';
import { poAssignTech } from '../../../support/ServiceApp/Delivery/SA_POAssignTechGroups';
import { poDeliverables } from '../../../support/ServiceApp/Delivery/SA_PODeliverablesGroups';
import { poScope } from '../../../support/ServiceApp/Delivery/SA_POScopeGroups';
import { poDetailsBcSync } from '../../../support/ServiceApp/Delivery/SA_PODetailsBCSyncGroups';
import { searchPageBCSync } from '../../../support/ServiceApp/Delivery/SA_SearchPageBCSyncGroups';

// Test block
describe('BC Sync Badge', () => {
  it('should show BC Sync Badge properly', () => {
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

    // Step 5: Verify Ticket BC Sync badge
    addTicketBcSync();
    cy.log('✅ Ticket BC Sync badge is visible');

    // Step 6: Add site
    addSite();
    cy.log('✅ Site added');

    // Step 7: Add activity
    addActivity();
    cy.log('✅ Activity added');

    // Step 8: Verify Activity BC Sync badge
    activityBcSync();
    cy.log('✅ Activity BC Sync badge is visible');

    // Step 9: Add schedule
    addSchedule();
    cy.log('✅ Schedule added');

    // Step 10: Click on Buy tab
    cy.get(el.buyTabIcon)
      .contains(el.buyTabText)
      .should('be.visible')
      .click();

    // Step 11: Wait until the page loads completely
    cy.contains(el.stagedLabel, 'Staged', { timeout: 10000 })
      .should('be.visible');

    // Step 12: Click on Edit PO button
    cy.get(el.editPoIcon)
      .contains('edit')
      .first()
      .click();

    // Step 13: Ensure modal appears
    cy.get(el.modalContainerLg, { timeout: 20000 })
      .should('exist')
      .and('be.visible');

    // Step 14: Ensure modal header appears
    cy.get(el.modalHeaderPo)
      .should('contain', 'Edit PO/WO');

    // Step 15: Add PO Scope
    poScope();
    cy.log('✅ PO Scope added');

    // Step 16: Add PO Activity
    poActivities();
    cy.log('✅ PO Activity added');

    // Step 17: Add PO Deliverables
    poDeliverables();
    cy.log('✅ PO Deliverables added');

    // Step 18: Assign Technician
    poAssignTech();
    cy.log('✅ PO Assigned Technician');

    // Step 19: Verify PO Details BC Sync badge
    poDetailsBcSync();
    cy.log('✅ PO Details BC Sync badge is visible');

    // Step 20: Navigate to contract again
    navigateContract();
    cy.log('✅ Navigated to contract');

    // Step 21: Verify BC Sync on Search Page
    searchPageBCSync();
    cy.log('✅ BC Sync badge is visible in search page');
  });
});
