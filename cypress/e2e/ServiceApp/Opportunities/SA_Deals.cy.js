//  Cypress & Environment
import 'cypress-wait-until';
import { elements } from "../../../support/Elements/elements.js";
const el = elements();
const env = Cypress.env(); 


//  Feature Support Functions
import { login } from '../../../support/Login/SA_LoginGroups';
import { saAddDeal } from '../../../support/Opportunities/SA_AddDealGroups';          
import { deleteDeal } from '../../../support/Opportunities/SA_DeleteDealGroup';

//  Test block
describe('Add Delete Deal', () => {
    it('should add delete a Deal', () => {
    cy.viewport(1920, 1080);
    
    // Step 1: Perform login
    login(env.email, env.password);
    cy.log('✅ Successfully logged in');

    // Wait until Task Dashboard loads
    cy.get(el.taskDashboardHeader, { timeout: 60000 })
      .should("be.visible")
      .and("contain", "Task Dashboard");

    // Clean up any existing deals
    deleteDeal();
    cy.log('✅ Cleaned up existing Deals');
               
    // Step 2: Add new Deal
    saAddDeal();
    cy.log('✅ Deal added successfully');

    // Step 3: Delete the Deal
    deleteDeal();
    cy.log('✅ Deal deleted successfully');

       // Step 4: Verify Deal deletion scripts here
       
    });
});