//  Cypress & Environment
import 'cypress-wait-until';
import { elements } from "../../../support/Elements/elements";
const el = elements();
const env = Cypress.env(); 

//  Feature Support Functions
import { login } from '../../../support/Login/SA_LoginGroups';
import { contractUpload } from '../../../support/ServiceApp/Delivery/SA_ContractUploadGroup';

//  Test block
describe('Contract Document Upload', () => {
  it('should upload a document in Contract', () => {
    cy.viewport(1920, 1080);
    
    // Step 1: Perform login
    login(env.email, env.password);
    cy.log('✅ Successfully logged in');

    // Wait until Task Dashboard loads
    cy.get(el.taskDashboardHeader, { timeout: 60000 })
      .should("be.visible")
      .and("contain", "Task Dashboard");

    // Step 3: Click on the "Documents" tab and upload
    contractUpload();
    cy.log('✅ Contract document uploaded');
  });
});
