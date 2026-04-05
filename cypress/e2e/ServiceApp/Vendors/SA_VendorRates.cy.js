//  Cypress & Environment
import { elements } from "../../../support/Elements/elements.js";
const el = elements();
const env = Cypress.env(); 

// Feature Support Functions
import { login } from "../../../support/Login/SA_LoginGroups";
import { saAddVendorRates } from "../../../support/ServiceApp/Vendors/SA_AddVendorRatesGroups";
import { saEditVendorRates } from "../../../support/ServiceApp/Vendors/SA_EditVendorRatesGroups";
import { saDeleteVendorRates } from "../../../support/ServiceApp/Vendors/SA_DeleteVendorRatesGroups";

//  Test block
describe('Add, Edit, Delete Vendor Rates', () => {

  it('should login and navigate to dashboard',() => {
    cy.viewport(1920, 1080);
    
    // Step 1: Perform login
    login(env.email, env.password);
    cy.log('✅ Successfully logged in');

    // Wait until Task Dashboard loads
    cy.get(el.taskDashboardHeader, { timeout: 60000 })
      .should("be.visible")
      .and("contain", "Task Dashboard");

    //clean up any existing vendor rates
    saDeleteVendorRates(); 
    cy.log('✅ Cleaned up existing Vendor Rates');
    
    // Step 2: Navigate to contract
    saAddVendorRates(); 
    cy.log('✅ Vendor Rates added');

    // Step 3: Edit the vendor rate
    saEditVendorRates(); 
    cy.log('✅ Vendor Rates edited successfully');

    // // Step 4: Delete the vendor rate
    // saDeleteVendorRates(); 
    // cy.log('✅ Vendor Rates deleted successfully');

    cy.reload(); // Reload the page to ensure all changes are applied
  });

});
