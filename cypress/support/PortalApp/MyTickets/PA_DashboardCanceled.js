export function paDashboardCanceled() {
  // Step 0: Intercept API call triggered by dashboard load
  cy.intercept('GET', '**/GetInfoForClient**').as('getClientInfo');
  cy.log('=== 📡 Step 0: Intercepted API call for dashboard ===');

  // Step 1: Load Year Filter Dashboard
  cy.log('=== 🔍 Step 1: Load Year Filter Dashboard ===');
  cy.get('#profile-tab4', { timeout: 60000 })
    .should('be.visible')
    .click();
  cy.log('✅ Clicked Year filter tab and waited for dashboard data');

  // Step 2: Check for Canceled Status Label
  cy.log('=== 🏷️ Step 2: Check for Canceled Status Label ===');
  cy.get(':nth-child(5) > .count_top', { timeout: 60000 })
    .should('exist')
    .should('be.visible')
    .should('have.text', 'Canceled');
  cy.log('✅ "Canceled" label is present and visible');

// Step 3: Wait for Ticket Status UI Load (Pantone Marker)
cy.log('=== ⏳ Step 3: Wait for Ticket Status UI Load (Pantone Marker) ===');

const pantoneSelector =
  'body > app-root:nth-child(1) > app-dashboard-layout:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > app-home:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(5) > div:nth-child(1)';

cy.get(pantoneSelector, { timeout: 60000 })
  .should('be.visible')
  .invoke('text')
  .then((pantoneText) => {
    const trimmedPantone = pantoneText.trim();
    cy.log(`✅ Found Pantone value: "${trimmedPantone}"`);

    // Assert: Pantone should not be empty
    expect(trimmedPantone).to.match(/\S+/, 'Pantone value should not be empty');
  });


  // Step 3.5a: Wait for spinner to appear (reloading starts)
  cy.log('=== 🌀 Step 3.5a: Waiting for spinner to appear ===');
  cy.get('.mat-mdc-progress-spinner', { timeout: 60000 }).should('exist');
  cy.log('✅ Spinner appeared');

  // Step 3.5b: Wait for spinner to disappear (reloading completes)
  cy.log('=== ⏳ Step 3.5b: Waiting for spinner to disappear ===');
  cy.get('.mat-mdc-progress-spinner', { timeout: 60000 }).should('not.exist');
  cy.log('✅ Spinner has disappeared — reload complete');

  // Step 3.5c: Wait again for Pantone value to reappear
  cy.log('=== 🔁 Step 3.5c: Waiting for Pantone marker to reappear ===');
  cy.get(pantoneSelector, { timeout: 60000 })
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      const trimmed = text.trim();
      cy.log(`✅ Refreshed Pantone value: "${trimmed}"`);
      expect(trimmed).to.not.be.empty;
    });

  // Step 4: Validate Canceled Count > 0
  cy.log('=== 🔢 Step 4: Validate Canceled Count > 0 ===');
  cy.get(':nth-child(5) > .count', { timeout: 60000 })
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      const count = parseInt(text.trim(), 10) || 0;
      cy.log(`ℹ️ Retrieved "Canceled" count: ${count}`);
      expect(count).to.be.greaterThan(0);
      // cy.log('✅ Canceled count is greater than 0');
    });
}
