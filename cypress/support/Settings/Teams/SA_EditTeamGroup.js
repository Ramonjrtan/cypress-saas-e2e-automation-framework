// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function editTeam() {
  // Step 1: Visit Team Management page
  cy.visit(el.teams.teamManagementPage);
  cy.get('.custom-card > .title', { timeout: 20000 })
    .should('be.visible')
    .and('contain', 'Team Management');
  cy.log('✅ Step 1: Navigated to Team Management page');

  // Step 2: Search Team
  const savedName = Cypress.env('savedTeamName');
  cy.get(el.teams.searchTeamInput).type(savedName);
  cy.log(`✅ Step 2: Searched for team: ${savedName}`);

  // Step 3: Wait until searched Title element shows correctly
  cy.contains(el.teams.teamTitleCell, savedName, { timeout: 10000 })
    .should('be.visible');
  cy.log('✅ Step 3: Searched team title is visible');

  cy.wait(2000);

  // Step 4: Click edit icon for the searched team
  cy.get(el.teams.editIcon, { timeout: 10000 }).click();
  cy.log('✅ Step 4: Clicked Edit icon for saved team');

  cy.wait(5000);

  // Step 5: Add new team member from dropdown
  cy.get(el.teams.teamMemberDropdown, { timeout: 20000 })
    .type('Ramon-GMAIL')
    .type('{enter}');
  cy.log('✅ Step 5: Selected "Ramon-GMAIL" from dropdown');

  // Step 6: Click Update button
  cy.get(el.teams.updateButton).click();
  cy.log('✅ Step 6: Clicked Update button');

  // Step 7: Verify toast message appears and disappears
  cy.get(el.vendorRates.toastMessageContainer, { timeout: 10000 })
    .should('be.visible')
    .and('contain', 'Updated Successfully');
  cy.log('✅ Step 7a: Toast message: Updated Successfully');

  cy.get(el.vendorRates.toastMessageContainer, { timeout: 10000 })
    .should('not.exist');
  cy.log('✅ Step 7b: Toast message disappeared');

  // Step 8: Verify still on Team Detail page
  cy.get('h6.title')
    .should('exist')
    .and('contain.text', 'Team Detail');
  cy.log('✅ Step 8: Navigated to Team Detail');

  // Step 9: Cancel and go back to Team Management page
  cy.get(el.teams.cancelButton).click();
  cy.log('✅ Step 9: Clicked Cancel');

  // Step 10: Verify return to Team Management page
  cy.get('h6.title')
    .should('exist')
    .and('contain.text', 'Team Management');
  cy.log('✅ Step 10: Returned to Team Management');
}
