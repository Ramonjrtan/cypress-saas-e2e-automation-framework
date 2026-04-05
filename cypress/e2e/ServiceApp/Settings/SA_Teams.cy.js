// Cypress & Environment
import 'cypress-wait-until';
import { elements } from "../../../support/Elements/elements.js";
const el = elements();
const env = Cypress.env(); 

// Feature Support Functions
import { login } from "../../../support/Login/SA_LoginGroups";
import { addTeam} from '../../../support/Settings/Teams/SA_AddTeamGroup';
import { editTeam } from '../../../support/Settings/Teams/SA_EditTeamGroup';
import { deleteTeam } from '../../../support/Settings/Teams/SA_DeleteTeamGroup';

//  Test block
describe('Add Team', () => {
    it('should add a new Team', () => {
    cy.viewport(1920, 1080);
    
    // Step 1: Perform login
    login(env.email, env.password);
    cy.log('✅ Successfully logged in');

    // Wait until Task Dashboard loads
    cy.get(el.taskDashboardHeader, { timeout: 60000 })
      .should("be.visible")
      .and("contain", "Task Dashboard");

      //Clean up any existing teams
        deleteTeam();
        cy.log('✅ Clean up existing Teams');

        // Step 2: Add a new team
        addTeam();
        cy.log('✅ Team added successfully');

        // Step 3: edit the team
        editTeam();
        cy.log('✅ Team edited successfully');

        // Step 4: Delete the team
        deleteTeam();
        cy.log('✅ Team deleted successfully');
    });
});