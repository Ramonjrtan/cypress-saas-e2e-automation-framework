import { elements } from "../../../support/Elements/elements";
const el = elements();

export function saDeleteClient() {
  const clientName = 'Cypress Test Client';

  cy.wait(5000);

  // Go to Clients tab
  cy.get(el.clientsTabIcon).contains('store').click();
  cy.log('✅ Clicked Clients tab');

  cy.get(el.clientsPageHeader).contains('Clients').should('be.visible');
  cy.log('✅ Clients page header is visible');

  // Search for the client
  cy.get(el.clientSearchField).clear().type(clientName);
  cy.log(`✅ Typed "${clientName}" in the search field`);

  cy.wait(5000);

  // Check if client exists in the table
  cy.get('body').then(($body) => {
    const clientExists = $body.find(`${el.clientTable} td`).filter((i, td) => td.innerText.trim() === clientName).length > 0;

    if (clientExists) {
      cy.log(`✅ Client "${clientName}" found in table`);

      // Click Edit button for that row
      cy.get(el.clientTable)
        .contains('td', clientName)
        .parent('tr')
        .within(() => {
          cy.get('button').contains('edit').click();
        });

      cy.log('✅ Clicked Edit Client icon');

      // Verify Edit Client Page
      cy.get(el.editClientPageHeader)
        .should('be.visible')
        .and('contain', 'Edit Client');
      cy.log('✅ Edit Client page header is visible');

      cy.get(el.clientNameField)
        .should('be.visible')
        .and('have.value', clientName)
        .then(($input) => {
          cy.log(`✅ Client Name field contains: "${$input.val()}"`);
        });

      // Click Delete
      cy.get(el.deleteButton, { timeout: 60000 }).contains('Delete').click();
      cy.log('✅ Clicked Delete button');

      // Confirm Deletion
      cy.get(el.confirmDeleteButton, { timeout: 60000 }).contains('Yes').click();
      cy.log('✅ Confirmed deletion');

      cy.wait(5000);
      // // Verify Success Message
      // cy.get(el.deleteSuccessMessage, { timeout: 60000 }).should('be.visible');
      // cy.log('✅ Deletion success message is visible');

      // cy.get(el.deleteSuccessMessage, { timeout: 60000 }).should('not.exist');
      // cy.log('✅ Deletion success message disappeared');

      // Re-check if deleted
      cy.get(el.clientsTabIcon).contains('store').click();
      cy.log('✅ Clicked Clients tab again');

      cy.get(el.clientsPageHeader).contains('Clients').should('be.visible');

      cy.get(el.clientSearchField).clear().type(clientName);
      cy.log(`🔍 Searching for "${clientName}" to verify deletion`);

      cy.get(el.noRecordsMessage)
        .contains('No records available for the selected filters.')
        .should('be.visible');
      cy.log(`✅ Verified that client "${clientName}" was deleted successfully`);

    } else {
      cy.log(`❌ Client "${clientName}" not found. Displaying no record message...`);
      cy.get(el.noRecordsMessage)
        .contains('No records available for the selected filters.')
        .should('be.visible');
    }
  });
}
