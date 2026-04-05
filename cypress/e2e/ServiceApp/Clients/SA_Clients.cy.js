//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();
const env = Cypress.env(); 

//  Feature Support Functions
import { login } from "../../../support/Login/SA_LoginGroups";
import { saAddClient } from "../../../support/ServiceApp/Clients/SA_AddClientGroups";
import { saDeleteClient } from "../../../support/ServiceApp/Clients/SA_DeleteClientGroups";
import { saEditClient } from "../../../support/ServiceApp/Clients/SA_EditClientGroups";

// Test Block
describe('Add, Edit, Delete Client', () => {
  it('should add, update and delete a Client', () => {
    cy.viewport(1920, 1080);
    
    // Step 1: Perform login
    login(env.email, env.password);
    cy.log('✅ Successfully logged in');

    // Wait until Task Dashboard loads
    cy.get(el.taskDashboardHeader, { timeout: 60000 })
      .should("be.visible")
      .and("contain", "Task Dashboard");

    //Clean up any existing clients before starting
     saDeleteClient(); // Ensure this function correctly deletes the client
    cy.log('✅ Client deleted');

    // Step 2: Add Client using sa_addclient
    saAddClient(); // Ensure this function correctly adds the client
    cy.log('✅ Client added');

    // Step 3: Edit Client using sa_editclient
    saEditClient(); // Ensure this function correctly edits the client   
    cy.log('✅ Client edited');

    // Step 4: Delete Client using sa_deleteclient (uncomment if needed)
    // sa_deleteclient(); // Ensure this function correctly deletes the client
    // cy.log('✅ Client deleted');
  });
});
