export function saSearchDeleteClient() {
        // Click the edit icon
        cy.get('mat-icon[data-mat-icon-type="font"]').contains('edit').click();
        cy.log('✅ Clicked Edit icon');
  
        // Click the delete button
        cy.get('button.danger').contains('Delete').click();
        cy.log('✅ Clicked Delete button');
  
        // Click Yes to confirm deletion (wait for the confirmation modal)
        cy.get('button.danger').contains('Yes').click();
        cy.log('✅ Confirmed deletion by clicking Yes');
  
        // Verify success message after deletion
        cy.get("div[aria-label='Deleted Successfully']").should('be.visible');
        cy.log('✅ Verified success message');

}
