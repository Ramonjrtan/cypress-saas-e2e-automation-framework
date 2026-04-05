// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function deleteTeam() {
  const teamKeyword = 'Cypress Test Team';

  // Step 1: Visit Team Management page
  cy.visit(el.teams.teamManagementPage);
  cy.wait(5000);
  cy.get('.custom-card > .title', { timeout: 60000 })
    .should('be.visible')
    .and('contain', 'Team Management');
  cy.log('✅ Step 1: Navigated to Team Management page');

  // Step 2: Search Team
  cy.get(el.teams.searchTeamInput).type(teamKeyword);
  cy.log(`✅ Step 2: Searched for team: ${teamKeyword}`);
  cy.wait(3000);

  // Step 3: Conditionally proceed if team exists
  cy.get('body').then($body => {
    const matchingTeams = $body.find(el.teams.teamTitleCell).filter((i, el) => el.innerText.includes(teamKeyword));
    
    if (matchingTeams.length > 0) {
      cy.log('✅ Step 3: Team found. Proceeding with deletion');

      // Step 4: Click delete icon
      cy.get(el.teams.deleteIcon, { timeout: 10000 }).first().click();
      cy.log('✅ Step 4: Clicked on the Delete icon');

      // Step 5: Confirm delete
      cy.get(el.teams.deleteButton).click();
      cy.log('✅ Step 5: Clicked the Delete button');

      // Step 6: Verify toast
      cy.get(el.vendorRates.toastMessageContainer, { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Deleted Successfully');
      cy.log('✅ Step 6: Toast message: Deleted Successfully');

      cy.get(el.vendorRates.toastMessageContainer, { timeout: 10000 })
        .should('not.exist');
      cy.log('✅ Step 6: Toast message disappeared');

      // Step 7: Reload and verify it's gone
      cy.visit(el.teams.teamManagementPage);
      cy.get('.custom-card > .title', { timeout: 20000 })
        .should('be.visible')
        .and('contain', 'Team Management');
      cy.log('✅ Step 7: Reloaded Team Management page');

      cy.get(el.teams.searchTeamInput).type(teamKeyword);
      cy.log(`✅ Step 7: Re-searched for team: ${teamKeyword}`);

      cy.get('.nodata').should('be.visible');
      cy.log('✅ Step 7: No data message is visible (team deleted)');
    } else {
      cy.log('❌ Step 3: Team not found. Skipping deletion.');
    }
  });
}
