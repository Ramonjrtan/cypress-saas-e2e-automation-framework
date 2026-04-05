// Cypress & Environment
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function poReviewTech() {
  // Step 1: Click the Reviews tab
  cy.contains(el.reviewsTabButton, 'Reviews')
    .should('exist')
    .should('be.visible')
    .click();

  cy.contains(el.ratingsHeader, 'Ratings')
    .should('be.visible');

  // Step 2: Click the New Rating button
  cy.contains(el.newRatingButton, 'New Rating')
    .should('be.visible')
    .click();

  cy.get(el.ratingModal)
    .find(el.ratingModalHeader)
    .should('contain.text', 'Add Ticket Rating');

  cy.get('.content > .loading-wrapper').should('not.exist'); // Wait until the loading spinner disappears

  // Step 3: Click on the "Reviewer" dropdown to open it
  cy.get(el.reviewerDropdown).click();

  // Step 4: Select the option "Ramon-GMAIL (You)" from the dropdown
  cy.get(el.reviewerDropdown)
    .find('.ng-dropdown-panel-items .ng-option')
    .contains('Ramon-Tan (You)')
    .click();

  // Step 5: Click on the "Technician" dropdown to open it
  cy.get(el.technicianRatingDropdown).click();

  // Step 6: Select the option "TEST TECHNICIAN" from the dropdown
  cy.get(el.technicianRatingDropdown)
    .find('.ng-dropdown-panel-items .ng-option')
    .contains('Technician Test 1')
    .click();

  // Step 7: Click the Excellent radio buttons
  cy.get(el.ratingRadio1).click();
  cy.get(el.ratingRadio2).click();
  cy.get(el.ratingRadio3).click();
  cy.get(el.ratingRadio4).click();

  // Step 8: Select the 5-star rating
  cy.get(el.starRating).eq(4).click();

  // Step 9: Click the Save button to submit the rating
  cy.contains(el.saveRatingButton, 'Save')
    .should('be.visible')
    .click();

  // Step 10: Verify success message appears
  cy.get(el.ratingSuccessMessage, { timeout: 10000 })
    .should('be.visible');

  // Step 11: Optionally check disappearance of the success message
  // cy.get(el.ratingSuccessMessage, { timeout: 10000 }) 
  //   .should('not.exist');
}
