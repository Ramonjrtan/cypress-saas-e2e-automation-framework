// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function addTeam() {
  const randomId = Math.floor(Math.random() * 10000);
  const teamName = `Cypress Test Team ${randomId}`;
  const teamEmail = `cypresstestteam${randomId}@gmail.com`;

  Cypress.env('savedTeamName', teamName);
  Cypress.env('savedTeamEmail', teamEmail);

  visitTeamManagementPage();
  clickAddTeamButton();
  fillTeamForm(teamName, teamEmail);
  submitTeamForm();
  verifyTeamSavedToast();
  verifyTeamInList(teamName, teamEmail);
}

// ------------------------
// ✅ Modular Step Functions
// ------------------------

function visitTeamManagementPage() {
  cy.visit(el.teams.teamManagementPage);
  cy.get('.custom-card > .title', { timeout: 20000 })
    .should('be.visible')
    .and('contain', 'Team Management');
  cy.log('✅ Navigated to Team Management page');
}

function clickAddTeamButton() {
  cy.get(el.teams.addTeamButton).click();
  cy.log('✅ Clicked Add Team button');
}

function fillTeamForm(name, email) {
  cy.get(el.teams.teamNameInput).click().type(name);
  cy.log(`✅ Team Name: ${name}`);

  cy.get(el.teams.teamEmailInput).click().type(email);
  cy.log(`✅ Email: ${email}`);

  cy.get(el.teams.teamMemberCombobox).click().type('Ramon-Tan', { timeout: 20000 })
    .type('{enter}', { timeout: 20000 });
  cy.get('.ng-option-label').click();
  cy.log('✅ Selected team member: Ramon-Tan');

  cy.get(el.teams.teamLeadDropdown).select('Ramon-Tan');
  cy.log('✅ Selected team lead: Ramon-Tan');
}

function submitTeamForm() {
  cy.get(el.teams.saveButton).contains('Save').click();
  cy.log('✅ Clicked Save');
}

function verifyTeamSavedToast() {
  cy.get(el.vendorRates.toastMessageContainer, { timeout: 10000 })
    .should('be.visible')
    .and('contain', 'Saved Successfully');
  cy.log('✅ Toast: Saved Successfully');

  cy.get(el.vendorRates.toastMessageContainer, { timeout: 10000 })
    .should('not.exist');
  cy.log('✅ Toast disappeared');
}

function verifyTeamInList(name, email) {
  visitTeamManagementPage();

  cy.get(el.teams.searchTeamInput).type(name);
  cy.log(`✅ Searching for team: ${name}`);

  cy.contains(el.teams.teamTitleCell, name, { timeout: 10000 })
    .should('be.visible');
  cy.log('✅ Team name found in list');

  cy.get(el.teams.teamEmailCell, { timeout: 10000 }).contains(email)
    .should('be.visible');
  cy.log('✅ Team email found in list');
}
