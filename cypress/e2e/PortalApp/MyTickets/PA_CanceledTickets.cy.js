//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();
const env = Cypress.env(); 

//  Feature Support Functions
import { paLogin } from '../../../support/PortalApp/Login/PA_LoginGroups';
import { paMyTicketsCanceled } from "../../../support/PortalApp/MyTickets/PA_MyTicketsCanceled";
import { paDashboardCanceled } from "../../../support/PortalApp/MyTickets/PA_DashboardCanceled";

//  Test block
describe('Client Workspace - View Canceled Tickets from Dashboard', () => {
  it('Logs in and filters dashboard and My Tickets to Canceled status', () => {
    // Step 1: Set browser viewport
    cy.viewport(1920, 1080);
    cy.log('✅ Step 1: Viewport set to 1920x1080');

    // Step 2: Load credentials from environment
    const { email, password } = require('../../../../cypress.env.json');
    cy.log('✅ Step 2: Credentials loaded');

    // Step 3: Log in to Client Workspace
    paLogin(email, password);
    cy.log('✅ Step 3: Login function executed');

    // Step 4: Wait for the dashboard to load
    cy.get(el.clientPortal.dashboard, { timeout: 50000 }).should('be.visible');
    cy.log('✅ Step 4: Dashboard is visible');

    // Step 5: Apply Canceled filter in Dashboard
    paDashboardCanceled();
    cy.log('✅ Step 5: Dashboard filter set to "Canceled"');

    // Step 6: Navigate to My Tickets and validate Canceled tickets
    paMyTicketsCanceled();
    cy.log('✅ Step 6: My Tickets page filtered to "Canceled" tickets');

    // Final log
    cy.log('🎯 Test completed: Canceled tickets are visible in both Dashboard and My Tickets');
  });
});
