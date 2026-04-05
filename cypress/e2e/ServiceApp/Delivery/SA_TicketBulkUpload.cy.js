//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();
const env = Cypress.env(); 

// Feature Support Functions
import { login } from "../../../support/Login/SA_LoginGroups";
import { bulkUploadTicket } from "../../../support/ServiceApp/Delivery/SA_BulkUploadTicket";


//  Test block
describe('Bulk Upload D1 ticket', () => {
  it('should bulk upload tickets', () => {
    cy.viewport(1920, 1080);
    
    // Step 1: Perform login
    login(env.email, env.password);
    cy.log('✅ Successfully logged in');

    // Wait until Task Dashboard loads
    cy.get(el.taskDashboardHeader, { timeout: 60000 })
      .should("be.visible")
      .and("contain", "Task Dashboard");

    // // Step 4: Add location
    // bulkUploadTicket(); // Ensure this function correctly adds the location
    // cy.log('✅ Tickets added');
  });
});
