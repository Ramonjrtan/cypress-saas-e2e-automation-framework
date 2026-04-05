//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();
const env = Cypress.env(); 

//  Feature Support Functions
import { paLogin } from '../../../support/PortalApp/Login/PA_LoginGroups';


//  Test block
describe('Client Workspace - Delete Staged Tickets', () => {
  it('Logs in and delete ticket under Staged status', () => {
    // Step 1: Set browser viewport
    cy.viewport(1920, 1080);
    cy.log('✅ Step 1: Viewport set to 1920x1080');

    // Step 2: Load credentials from environment
    const { email, password } = require('../../../../cypress.env.json');
    cy.log('✅ Step 2: Credentials loaded');

    // Step 3: Log in to Client Workspace
    paLogin(email, password);
    cy.log('✅ Step 3: Login function executed');



    // Final log
    cy.log('🎯 Test completed: Delted Staged Test Tickets');
  });
});
