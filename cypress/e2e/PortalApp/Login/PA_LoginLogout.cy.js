//  Cypress & Environment
import 'cypress-wait-until';
import { elements } from "../../../support/Elements/elements";
const env = Cypress.env(); 
const el = elements();

//  Feature Support Functions
import { paLogin } from '../../../support/PortalApp/Login/PA_LoginGroups';

describe('Client Workspace Login and Logout', () => {
  it('should login and logout in Client Workspace', () => {
    cy.viewport(1920, 1080);
    const { email, password } = env;

    cy.log('✅ Logging in to Client Workspace');
    paLogin(email, password);
    cy.get(el.clientPortal.dashboard, { timeout: 50000 }).should('be.visible');
    cy.log('✅ Dashboard is visible');

    cy.log('Logging out of Client Workspace');
    cy.get('.name').click();
    cy.contains('Logout').should('be.visible').click();
    cy.wait(5000);

    cy.url().should('include', 'login');
    cy.get('.btn').should('be.visible');
    cy.log('✅ Successfully logged out');
  });
});
