//  Cypress & Environment
import { elements } from "../../../support/Elements/elements.js";
const el = elements();

export function saAddTechnician() {
  // Step 1: Visit technician profile
  cy.visit(el.techUrlProfile);
  cy.contains('h1, h2, h3', 'Technicians', { timeout: 10000 }).should('be.visible');
  cy.log('✅ Technician page loaded successfully');

  // Step 2: Open Add Technician form
  cy.get('.primary')
    .should('be.visible')
    .click();   
  cy.log('✅ New Technician button clicked successfully');

  cy.contains('h1, h2, h3', 'Add Technician', { timeout: 10000 }).should('be.visible');
  cy.log('✅ Add Technician page loaded successfully');

  // Step 3: Generate random technician name and email
  const randomId = Math.floor(Math.random() * 10000);
  const techName = `Cypress Test Technician ${randomId}`;
  const randomEmail = `cypresstest${randomId}@gmail.com`;

  // Step 4: Fill in technician details
  cy.get('input[formcontrolname="name"]', { timeout: 10000 }).type(techName);
  cy.get('input[formcontrolname="email"]', { timeout: 10000 }).clear().type(randomEmail);
  cy.get('input[formcontrolname="phone"]', { timeout: 10000 }).clear().type('18006626227');
  // cy.get('.ng-spinner-loader', { timeout: 20000 }).should('not.be.visible');
  cy.get('ng-select[placeholder="Vendor"] input[role="combobox"]', { timeout: 10000 })
    .click({ force: true })
    .type('TEST VENDOR (USE FOR TESTING)', { force: true });
  cy.contains('.ng-option', 'TEST VENDOR (USE FOR TESTING)', { timeout: 60000 }).click({ force: true });
  cy.log('✅ Entered technician details successfully');

  // Step 5: Enter and select address
  cy.get(el.addressInput)
    .type('2050 E Charleston Blvd, Las Vegas, NV 89104', { force: true, timeout: 60000 });

// Wait until dropdown options are rendered
cy.get(el.addressDropdown, { timeout: 10000 })
  .should('contain.text', '2050 E Charleston Blvd', { timeout: 3000 })
  .contains('2050 E Charleston Blvd')
  .click({ force: true });

  cy.contains('.info-header-wrapper > h4', 'Currently Selected Address', { timeout: 3000 }).should('be.visible');

  cy.log('✅ Entered technician details including address');

  // Step 6: Save the technician
  cy.contains('button', 'Save').should('be.enabled').click();
  cy.log('✅ Clicked Save to add technician');

    // Step 7: Verify success message
    cy.contains("Technician created successfully.", { timeout: 10000 })
    .should('be.visible');
  cy.log('✅ Location added');

  // Step 8: Ensure success message disappears before proceeding
  cy.contains("Technician created successfully.", { timeout: 10000 })
    .should('not.exist');
  cy.log('✅ Verified success message disappeared');

    // Step 1: Visit technician profile
  cy.visit(el.techUrlProfile);
  cy.contains('h1, h2, h3', 'Technicians', { timeout: 10000 }).should('be.visible');
  cy.log('✅ Technician page loaded successfully');

  cy.get('input[placeholder="Name Search..."]', { timeout: 10000 }).type('Cypress Test Technician', { force: true });
  cy.log('✅ Technician name entered successfully');
  cy.wait(3000);
  cy.log('✅ Waited for 3 seconds');
}