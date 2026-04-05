//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function saBulkUploadLocaton() {
  // Step 1: Wait for the page to load
  cy.wait(5000);

  // Step 2: Click on Clients tab (ensure visibility before clicking)
  cy.get(el.clientsTabIcon).contains('store').should('be.visible').click();
  cy.log('✅ Successfully Clicked Clients');

  // Step 3: Ensure the Clients page header appears
  cy.get(el.clientsPageHeader).contains('Clients').should('be.visible');
  cy.log('✅ Clients page header is visible');

  // Step 4: Clear and type in Search field
  cy.get(el.clientSearchField).clear().type('Cypress Test Client');
  cy.log('✅ Cleared and typed in Search field: Cypress Test Client');

  // Step 5: Verify client is visible in the table and click it
  cy.get(el.clientTable)
    .contains('Cypress Test Client')
    .should('be.visible')
    .click();
  cy.log('✅ Clicked on client "Cypress Test Client" to open details');

  // Wait for client details page to load
  cy.get(el.clientTitle).should('be.visible').contains('Cypress Test Client (Direct)');
  cy.log('✅ Client Details page is visible');

  // Step 7: Click on Add Location button
  cy.contains('button', 'Bulk Location Upload').should('be.visible').click();
  cy.log('✅ Clicked Bulk Location Upload');

  // Step 8: Wait for Bulk Upload page to load
  cy.contains('h4', 'Bulk Location Upload').should('be.visible');
  cy.log('✅ Bulk Location Upload page is visible');

// Step 14: Attach file to the hidden input field
cy.get(el.deliverableFileInput)
  .should('exist')
  .attachFile('SampleClientSites.xlsx', { force: true });
cy.log('✅ File SampleClientSites.xlsx attached successfully');


  // Step 7: Click on Upload File button
  cy.contains('button', 'Upload File').should('be.visible').click();
  cy.log('✅ Clicked Upload File');

  // Upload Result
  cy.get('h4').contains('Upload Result').should('be.visible');
  cy.get('mat-dialog-container').within(() => {
    cy.get('dt').contains('Total : 6').should('exist');
    cy.get('dt').contains('Successful : 6').should('exist');
    cy.get('dt').contains('Failed : 0').should('exist');
    cy.get('dt').contains('No Matches : 0').should('exist');
  });
  cy.log('✅ Verified upload results');

  // Step 9: Click Ok button in the dialog
  cy.get('mat-dialog-container').within(() => {
    cy.contains('button', 'Ok').click();
  });
  cy.log('✅ Clicked Ok button in the dialog');

  // Wait to allow any UI updates after closing the dialog
  cy.wait(10000);

  // Check for Location Numbers, Names, Addresses, and Cities
  const locationNumbers = [
    '123456789', '47370-257954', '22331-212325', '47089-256771', '22126-218024', '17127-178586'
  ];
  const locationNames = [
    'Default Name', 'Meritxell, 96', 'Al Jerf 1', 'McDonald\'s', 'Pizza Pan', 'Khalidiyah'
  ];
  const addresses = [
    '2050 East Charleston Boulevard', '96 Avinguda Meritxell', '26 University St', 
    'Belal Bin Rabah St', 'Al Salam St', 'Mubarak Bin Mohammed St'
  ];
  const cities = ['Las Vegas', 'Andorra la Vella', 'Ajman', 'Umm Al Quwain', 'Abu Dhabi', 'Abu Dhabi'];
  
  const country = ['United States', 'Andorra', 'United Arab Emirates', 'United Arab Emirates', 'United Arab Emirates', 'United Arab Emirates'];

  locationNumbers.forEach(num => cy.contains(num));
  locationNames.forEach(name => cy.contains(name));
  addresses.forEach(address => cy.contains(address));
  cities.forEach(city => cy.contains(city));
  country.forEach(country => cy.contains(country));


  cy.log('✅ All location details verified');
}
