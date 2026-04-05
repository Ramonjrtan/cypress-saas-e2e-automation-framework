// Cypress Plugins
import 'cypress-wait-until';

// Environment & Selectors
import { elements } from "../../../support/Elements/elements.js";
const el = elements();
const env = Cypress.env(); 

// Core Feature Support
import { login } from "../../../support/Login/SA_LoginGroups";
import { navigateContract } from "../../../support/ServiceApp/Delivery/SA_ContractGroups";
import { addTicket } from "../../../support/ServiceApp/Delivery/SA_AddTicketGroups";
import { editTicket } from "../../../support/ServiceApp/Delivery/SA_EditTicketGroups";
import { addSite } from "../../../support/ServiceApp/Delivery/SA_AddSiteGroups";
import { addActivity } from "../../../support/ServiceApp/Delivery/SA_AddActivityGroups";
import { addSchedule } from "../../../support/ServiceApp/Delivery/SA_AddScheduleGroups";
import { editPo } from "../../../support/ServiceApp/Delivery/SA_EditPOGroup";
import { poScope } from "../../../support/ServiceApp/Delivery/SA_POScopeGroups";
import { poActivities } from "../../../support/ServiceApp/Delivery/SA_POActivitiesGroups";
import { poAssignTech } from "../../../support/ServiceApp/Delivery/SA_POAssignTechGroups";
import { poDeliverables } from "../../../support/ServiceApp/Delivery/SA_PODeliverablesGroups";
import { poReviewTech } from "../../../support/ServiceApp/Delivery/SA_ReviewTechGroups";

// Utility Helpers
import { deleteTicketByName } from "../../../support/ServiceApp/Delivery/SA_DeleteHelpers.js";
import { resetStaged } from "../../../support/ServiceApp/Delivery/SA_ResetStagedGroup";
import { taskManagerPin } from "../../../support/ServiceApp/Delivery/SA_TaskManagerPinGroups";

// Constants
let testTicketName;

describe('Ticket lifecycle: Add, update, assign, review, and cleanup', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080);

    // Generate unique ticket name
    testTicketName = `Cypress Test Ticket`;
    Cypress.env('ticketName', testTicketName);

    cy.log('🔐 Logging in');
    login(env.email, env.password);

    cy.log('✅ Waiting for dashboard');
    cy.get(el.taskDashboardHeader, { timeout: 60000 })
      .should("be.visible")
      .and("contain", "Task Dashboard");
  });

  it('should add ticket, update details, PO details, assign and review technician', () => {
    navigateContract();
    cy.log('✅ Navigated to contract');

    addTicket();
    cy.log('✅ Ticket added');

    editTicket();
    cy.log('✅ Ticket edited');

    addSite();
    cy.log('✅ Site added');

    addActivity();
    cy.log('✅ Activity added');

    addSchedule();
    cy.log('✅ Schedule added');

    editPo();
    cy.log('✅ Buy tab clicked');

    poScope();
    cy.log('✅ PO Scope added');

    poActivities();
    cy.log('✅ PO Activity added');

    poDeliverables();
    cy.log('✅ PO Deliverables added');

    poAssignTech();
    cy.log('✅ Technician assigned');

    poReviewTech();
    cy.log('✅ Technician reviewed');
  });

  after(() => {
    navigateContract();
    cy.log('✅ Navigated to contract');

    editTicket();
    cy.log('✏️ Ticket opened for editing');

    taskManagerPin();
    cy.log('📌 Task Manager sidebar pinned');

    resetStaged();
    cy.log('🔄 Task status reset');

    // Delete the ticket
    deleteTicketByName(testTicketName);
    cy.log(`🗑️ Deleted ticket: ${testTicketName}`);

    cy.log('✅ Ticket deletion process completed');    
  });

});
