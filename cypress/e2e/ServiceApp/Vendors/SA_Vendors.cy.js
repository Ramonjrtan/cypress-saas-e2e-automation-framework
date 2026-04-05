//  Cypress & Environment
import { elements } from "../../../support/Elements/elements.js";
const el = elements();
const env = Cypress.env(); 

// Feature Support Functions
import { login } from "../../../support/Login/SA_LoginGroups";
import { saAddVendor } from "../../../support/ServiceApp/Vendors/SA_AddVendorGroups";
import { saEditVendor } from "../../../support/ServiceApp/Vendors/SA_EditVendorGroups";
import { saDeleteVendor } from "../../../support/ServiceApp/Vendors/SA_DeleteVendorGroups";

//  Test block
describe('Add, Edit, Delete Vendors', () => {
  it('should add, edit, and delete a vendor', () => {
    cy.viewport(1920, 1080);
    
    // Step 1: Perform login
    login(env.email, env.password);
    cy.log('✅ Successfully logged in');

    // Wait until Task Dashboard loads
    cy.get(el.taskDashboardHeader, { timeout: 60000 })
      .should("be.visible")
      .and("contain", "Task Dashboard");

    //clean up any existing vendors before starting the test
    saDeleteVendor(); 
    cy.log('✅ Cleaned up existing vendors');

    // Step 3: Add Vendor
    saAddVendor();
    cy.log('✅ Vendor added');

    // Step 4: Edit Vendor
    saEditVendor();
    cy.log('✅ Vendor edited');

    // // Step 5: Delete Vendor 
    // sa_deletevendor(); // Make sure this function includes all necessary validations
    // cy.log('✅ Vendor deleted');
  });
});
