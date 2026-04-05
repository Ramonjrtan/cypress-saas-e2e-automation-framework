//  Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function saAddVendor() {
  cy.wait(5000);

  // Step 1: Click on Vendors
  cy.contains(el.clientsTabIcon, 'tools_ladder').click();
  cy.log('✅ Successfully Clicked Vendors');

  // Step 2: Ensure header appears
  cy.get(el.clientsPageHeader, { timeout: 20000 })
    .contains('Vendors')
    .should('be.visible');
  cy.log('✅ Vendors page header is visible');

  cy.wait(5000);

  // Step 3: Click the "Add Vendor" button
  cy.contains(el.addClientsButton, 'Add Vendor')
    .should('be.visible')
    .click();
  cy.log('✅ Successfully Clicked Add Vendor');

  // Step 4: Ensure header appears
  cy.get(el.addVendorHeader)
    .contains('Basic Profile')
    .should('be.visible');
  cy.log('✅ Add Vendor page header is visible');

  // Step 5: Fill out the form fields
  const randomEmail = `cypresstest${Math.floor(Math.random() * 10000)}@gmail.com`;
  cy.get(el.vendorNameInput).type('Cypress Test Vendor');
  cy.get(el.vendorTypeDropdown).should('be.visible').select('Direct');
  cy.get(el.vendorEmailField).clear().type(randomEmail);
  cy.get(el.clientAddressField).clear().type('12 Baker Dr');
  cy.get(el.vendorStateProvinceField).clear().type('GA');
  cy.get(el.clientCityField).clear().type('Savannah');
  cy.get(el.vendorBusinessPhoneField).clear().type('1234567890');
  cy.get(el.vendorCountryDropdown).should('be.visible').select('71'); // United States
  cy.get(el.vendorZipPostalCodeField).clear().type('31410');
  cy.get(el.vendorPaymentTypeDropdown).scrollIntoView().should('be.visible').select('Check');
  cy.get(el.vendorPaymentTermsDropdown).should('be.visible').select('Net 30');
  cy.get(el.vendorCurrencyInput).should('be.visible').select('USD');
  cy.log('✅ Selected Currency: USD');

  // Step 6: Click Save
  cy.get(el.clientSaveButton)
    .contains('Save')
    .should('be.visible')
    .click({ force: true });
  cy.log('✅ Successfully Clicked Save');

  // Optional: Uncomment if you want success message verification
  cy.get(el.ticketSuccessMessage, { timeout: 10000 }).should('be.visible');
  cy.log('✅ Verified success message');
  cy.get(el.ticketSuccessMessage, { timeout: 10000 }).should('not.exist');
}
