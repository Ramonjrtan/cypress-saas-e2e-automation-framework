//  Cypress & Environment
import 'cypress-wait-until';
import { elements } from "../../../support/Elements/elements.js";
const el = elements();
const env = Cypress.env(); 

//  Feature Support Functions
import { login } from '../../../support/Login/SA_LoginGroups';
import { saAddTechnician } from "../../../support/ServiceApp/Technicians/SA_AddTechnicianGroups";       

//  Test block
describe('Add Technician', () => {
    it('should add a technician', () => {
    cy.viewport(1920, 1080);
    
    // Step 1: Perform login
    login(env.email, env.password);
    cy.log('✅ Successfully logged in');

    // Wait until Task Dashboard loads
    cy.get(el.taskDashboardHeader, { timeout: 60000 })
      .should("be.visible")
      .and("contain", "Task Dashboard");

    // Step 2: Add a new technician
    saAddTechnician();
    cy.log('✅ Technician added successfully');
    });
});
