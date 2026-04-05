// Cypress & Elements
import { elements } from "../../../support/Elements/elements";
const el = elements();

export function addSchedule() {
  // Step 1: Click on Schedules tab
  cy.get(el.schedulesTabButton)
    .should('be.visible')
    .click();

  // Step 2: Click on Add Schedule
  cy.get(el.addScheduleButton)
    .should('be.visible')
    .click();

  // Step 3: Ensure modal appears
  cy.get(el.scheduleModalContainer, { timeout: 20000 })
    .should('exist')
    .and('be.visible');

  // Step 4: Ensure modal header appears
  cy.get(el.scheduleModalHeader, { timeout: 10000 })
    .should('contain', 'Add Schedule');

  // Step 5: Open calendar
  cy.get(el.calendarOpenButton)
    .should('be.visible')
    .click();

  // Step 6: Click on Next month button
  cy.get(el.calendarNextButton)
    .should('be.visible')
    .click();

  // Step 7: Select start date (30th day of month)
  cy.contains(el.calendarCellSelector, '30')
    .should('be.visible')
    .click({ force: true });

  // Select end date (also 30)
  cy.contains(el.calendarCellSelector, '30')
    .should('be.visible')
    .click({ force: true });

  // Step 8: Wait for selection to register
  cy.wait(1000);

  // Step 9: Enter time manually (09:00 AM)
  cy.get(el.timePickerButton, { timeout: 10000 })
    .should('be.visible')
    .click();

  cy.wait(1000);
  cy.get('.cancel').click();
  cy.wait(5000);

  cy.get(el.hourInput, { timeout: 10000 })
    .click({ force: true })
    .clear({ force: true })
    .type('09:00 AM', { force: true });

  cy.get('.submit').click();
  cy.wait(5000);

  // Step 10: Click Save
  cy.get(el.scheduleSaveButton)
    .should('be.visible')
    .click();

  // Step 11: Verify success message
  cy.get(el.scheduleSuccessMessage)
    .should('be.visible');

  // Step 12: Wait for 5 seconds
  cy.wait(5000);

  // Step 13: Click on Edit Schedule button
  cy.get(el.editScheduleButton)
    .should('be.visible')
    .click();

  // Step 14: Wait for modal to appear
  cy.get(el.scheduleModalContainer, { timeout: 20000 })
    .should('exist')
    .and('be.visible');

  // Step 15: Verify modal title
  cy.get(el.scheduleModalHeader, { timeout: 10000 })
    .should('contain', 'Edit Schedule');

  // Step 16: Enter new date and time
  cy.get(el.datePickerInput)
    .should('be.visible')
    .click();

  // Step 17: Select month and year
  cy.get(el.monthYearButton)
    .should('be.visible')
    .click();
  cy.get(el.selectYear2025)
    .should('be.visible')
    .click();
  cy.get(el.selectMonthNovember)
    .should('be.visible')
    .click();

  // Step 18: Select the day (December 30, 2025)
  cy.get(el.selectDayDecember30)
    .should('be.visible')
    .click();

  // Step 19: Ensure the time picker is visible
  cy.get(el.timePickerContainer)
    .should('be.visible');

  // Step 20: Set hour to 09
  cy.get(el.publishHourInput)
    .clear()
    .type('09');

  // Step 21: Set minutes to 00
  cy.get(el.minuteInput)
    .clear()
    .type('00');

  // Step 22: Confirm the selected date & time
  cy.get(el.confirmDateTimeButton)
    .should('be.visible')
    .click();

  // Step 23: Click Save
  cy.get(el.scheduleSaveButton)
    .should('be.visible')
    .click();

  // Toast: Task "Add Schedule"
  cy.get(el.toastMsg.autoUpdate, { timeout: 10000 })
    .should('be.visible')
    .contains('Task "Add Schedule" has been automatically completed.');
  cy.log('✅ Toast message for Add Schedule appears successfully');

  // Step 24: Verify success message
  cy.get(el.updateScheduleSuccessMessage)
    .should('be.visible');
    
  // Step 25: Optional - ensure success message disappears
   cy.get(el.updateScheduleSuccessMessage, { timeout: 10000 }).should('not.exist');

  cy.log("✅ Success message appeared and disappeared.");
}
