//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();
const env = Cypress.env(); 

//  Feature Support Functions
import { saBulkUploadLocaton } from "../../../support/ServiceApp/Clients/SA_BulkUploadLocation";
import { login } from "../../../support/Login/SA_LoginGroups";

//  Test Block
describe('Bulk Upload Client Location', () => {

  it('should bulk upload client location', () => {
    cy.viewport(1920, 1080);
    
    // Step 1: Perform login
    login(env.email, env.password);
    cy.log('✅ Successfully logged in');

    // Wait until Task Dashboard loads
    cy.get(el.taskDashboardHeader, { timeout: 60000 })
      .should("be.visible")
      .and("contain", "Task Dashboard");

    // Step 2: Add location
    saBulkUploadLocaton();
    cy.log('✅ Location added');
  });
});
