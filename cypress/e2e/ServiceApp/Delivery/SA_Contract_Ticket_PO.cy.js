// ===============================
// 📁 IMPORTS
// ===============================
import { login } from '../../../support/Login/SA_LoginGroups';
import { navigateContract } from '../../../support/ServiceApp/Delivery/SA_ContractGroups';
import { addTicket } from '../../../support/ServiceApp/Delivery/SA_AddTicketGroups';
import { editTicket } from '../../../support/ServiceApp/Delivery/SA_EditTicketGroups';
import { elements } from "../../../support/Elements/elements";
const el = elements();

import 'cypress-wait-until';  
const env = Cypress.env(); 

// ===============================
// 🧪 TEST SUITE
// ===============================
describe('Contract_Ticket_PO Flow', () => {

  // ===============================
  // 🔐 BEFORE HOOK: LOGIN SETUP
  // ===============================
  before(() => {
    cy.viewport(1920, 1080);
    login(env.email, env.password);
    cy.log('✅ Successfully logged in');

    cy.get(el.taskDashboardHeader, { timeout: 60000 })
      .should("be.visible")
      .and("contain", "Task Dashboard");
  });

  // ===============================
  // 🔄 MAIN TEST FLOW
  // ===============================
  it('Performs Client PO and Ticket flow within Dispatch SOW Contract', () => {
    cy.log('🔍 Navigating to Dispatch SOW Contract');
    navigateContract();

    cy.log('🎯 Hovering on D1 Logo and waiting for page load');
    cy.hoverD1Logo();
    cy.waitForPageLoad();
    cy.waitForSeconds(3); // Consider replacing with waitUntil conditionally

    cy.log('🧹 Deleting existing Client PO Number');
    cy.deleteClientPONumber();

    cy.log('📄 Re-navigating to contract and adding ticket');
    navigateContract();  // Optional, only if needed again
    addTicket();

    cy.log('✏️ Editing the created ticket');
    editTicket();

    cy.log('🚫 Disabling Client PO Number');
    cy.disableClientPONumber();
    cy.waitForPageLoad();

    cy.log('📎 Hovering logo, clicking breadcrumb, refreshing page');
    cy.hoverD1Logo();
    cy.clickContractBreadcrumb();
    cy.refreshAndWait(); // Optional: Add `.should` or `.get` check for page element here

    cy.log('➕ Adding new Client PO Number');
    cy.addClientPONumber();
    cy.waitForPageLoad();

    cy.log('♻️ Editing ticket again to verify PO is reflected');
    editTicket();
    cy.waitForPageLoad();

    cy.log('✅ Enabling PO');
    cy.enableClientPONumber();

    cy.log('🧹 Deleting staged ticket as cleanup');
    cy.deleteStagedTicket();
  });
});
