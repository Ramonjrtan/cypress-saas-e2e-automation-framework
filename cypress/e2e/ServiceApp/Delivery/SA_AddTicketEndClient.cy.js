//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();
const env = Cypress.env(); 

//  Feature Support Functions
import { login } from "../../../support/Login/SA_LoginGroups";
import { navigateContract } from '../../../support/ServiceApp/Delivery/SA_ContractGroups';
import { addTicketEndClient } from '../../../support/ServiceApp/Delivery/SA_AddTicketEndClientGroup';


//  Test block
describe('Add ticket, Select End Client', () => {
    
  it('should add ticket, should select valid end client', () => {
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
    addTicketEndClient();
    cy.log('✅ Ticket added');

  });
});
