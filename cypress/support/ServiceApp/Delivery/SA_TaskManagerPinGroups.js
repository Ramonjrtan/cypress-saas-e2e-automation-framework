// Cypress & Environment
import 'cypress-wait-until';
import 'cypress-real-events/support';
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function taskManagerPin() {
  cy.wait(3000);

  // Step 1: Hover to reveal Task Manager sidebar
  cy.get(el.taskManager.sidebarHoverTab, { timeout: 60000 }).realHover();

  // Step 2: Click the Push Pin icon to pin the sidebar
  cy.get(el.taskManager.pinButton, { timeout: 10000 }).click();

  cy.wait(3000);
}
