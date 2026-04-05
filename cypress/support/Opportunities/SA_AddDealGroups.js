// Cypress & Environment
import 'cypress-wait-until';
import { elements } from "../../support/Elements/elements.js";
const el = elements();

export function saAddDeal() {
  cy.wait(5000);

  // Step 1: Go to Deals page
  cy.visit(el.deals.dealsPageUrl, { timeout: 60000 });
  cy.log('✅ Successfully navigated to Deals page');

  // Step 2: Ensure header appears
  cy.get(el.deals.dealPageHeader, { timeout: 20000 })
    .contains('Deal')
    .should('be.visible');
  cy.log('✅ Deal page header is visible');

  cy.wait(5000);

  // Step 3: Click the "Add Deal" button
  cy.contains(el.deals.addDealButton, 'Add Deal')
    .should('be.visible')
    .click();
  cy.log('✅ Successfully clicked Add Deal');

  // Step 4: Ensure modal header appears
  cy.get(el.deals.addDealHeader)
    .contains('Add Deal')
    .should('be.visible');
  cy.log('✅ Add Deal modal header is visible');

  // Step 5: Handle Modal Appearance
  cy.get(el.deals.modalContainer, { timeout: 20000 })
    .should('exist')
    .and('be.visible');
  cy.log('✅ Modal is visible');

  cy.get(el.deals.modalContainer).within(() => {
    cy.get(el.deals.dealNameLabel).click();
    cy.log('✅ Deal Name label clicked successfully');

    cy.get(el.deals.dealNameInput)
      .should('be.visible')
      .type('Cypress Test Deal', { force: true });
    cy.log('✅ Deal Name entered successfully');

    cy.get(el.deals.scheduleDateInput).type('12/30/2025{enter}');
    cy.log('✅ Schedule date entered successfully');

    cy.get(el.deals.priorityDropdown).click();
    cy.get(el.deals.priorityOption).contains('High').click();
    cy.log('✅ Priority selected successfully');

    cy.get(el.deals.dealTypeDropdown).click();
    cy.get(el.deals.dealTypeOption).contains('Field Services - Dispatch').click();
    cy.log('✅ Deal Type selected successfully');

    cy.get(el.deals.descriptionTextarea).type('Cypress Test Deal');
    cy.log('✅ Description entered successfully');

    cy.get(el.deals.solutioningOwnerDropdown).click();
    cy.get(el.deals.solutioningOwnerInput).type('Ramon-GMAIL', { force: true });
    cy.get(el.deals.solutioningOwner).contains('Ramon-GMAIL').click();
    cy.log('✅ Solutioning Owner selected successfully');

    cy.get(el.deals.salesOwnerDropdown).click();
    cy.get(el.deals.salesOwnerInput).type('Ramon-GMAIL', { force: true });
    cy.get(el.deals.solutioningOwner).contains('Ramon-GMAIL').click(); // Reuse solutioningOwner selector
    cy.log('✅ Sales Owner selected successfully');

    cy.get(el.deals.clientDropdown).click();
    cy.get(el.deals.clientInput).type('Test Client (USE FOR TESTING)', { force: true });
    cy.get(el.deals.solutioningOwner).contains('Test Client (USE FOR TESTING)').click(); // Reuse selector
    cy.log('✅ Client selected successfully');

    cy.get(el.deals.firstNameInput).click().type('Ramon');
    cy.get(el.deals.lastNameInput).click().type('Tan');
    cy.log('✅ First and Last name entered successfully');

    const randomId = Math.floor(Math.random() * 10000);
    const randomEmail = `cypresstest${randomId}@gmail.com`;

    cy.get(el.deals.emailInput).clear().type(randomEmail);
    cy.get(el.deals.primaryContactPhoneInput).clear().type('18006626227');
    cy.get(el.deals.clientPhoneInput).clear().type('18006626227');
    cy.get(el.deals.addressInput).clear().type('2105 London Rd, Duluth, MN 55812, United States');
    cy.log('✅ Email, phone, and address filled in');

    cy.waitUntil(() =>
      cy.get(el.deals.saveButton).should('be.enabled'),
      { timeout: 10000, interval: 500 }
    );

    cy.get(el.deals.saveButton).first().click();
    cy.log('✅ Successfully clicked Save');

    // Confirm modal is closed
    cy.get(el.deals.modalContainer, { timeout: 5000 }).should('not.exist');
    cy.log('✅ Modal is not visible');
  });
}
