//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();
const env = Cypress.env(); 

//  Feature Support Functions
import { paAddClientLocation } from '../../../support/PortalApp/Locations/PA_AddClientLocationGroups';
import { paEditDeleteLocation } from '../../../support/PortalApp/Locations/PA_EditDeleteLocationGroups';
import { paLogin} from '../../../support/PortalApp/Login/PA_LoginGroups';
import { paDeleteLocation } from '../../../support/PortalApp/Locations/PA_DeleteClientLocationGroups';

//  Test block
describe('Client Workspace - Add location', () => {
  it('should successfully add a new location through the Client Workspace', () => {
    cy.viewport(1920, 1080);

    // Step 1: Log in to the Client Workspace
    paLogin(env.email, env.password);
    cy.log('✅ Successfully logged in');

    // Step 2: Wait for the dashboard to load
    cy.get(el.clientPortal.dashboard, { timeout: 50000 }).should('be.visible');
    cy.log('✅ Dashboard is visible');

        //clean up any existing locations
    paDeleteLocation();
    cy.log('✅ Existing locations cleaned up'); 
    // Step 3: Add a new location
    paAddClientLocation();
    cy.log('✅ Location added via Locations tab');

        //clean up any existing locations
    paDeleteLocation();
    cy.log('✅ Existing locations cleaned up'); 

    // // Step 4: Edit and delete location
    // paEditDeleteLocation();
    // cy.log('✅ Location edited and deleted successfully');
  });
});
