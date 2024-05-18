// cart.spec.js
describe('Cart Feature', () => {
    beforeEach(() => {
        // Visit the page where the Cart component is rendered
        cy.visit('/');

        // Add the first three products to the cart
        for (let i = 0; i < 3; i++) {
            cy.get(`[data-cy=product-card]:eq(${i})`).find('[data-cy=add-to-cart]').click();
        }
        cy.get('[data-cy=show-cart]').first().click();
    });

    it('should display the shopping cart header with correct item count', () => {
        // Verify the shopping cart header and item count
        cy.get('[data-cy=cart-item-length]').contains('3');

    });

    it('should list all cart items in the cart listing', () => {
        // Check if CartListing renders all items
        cy.get('[data-cy=cart-listing]').should('have.length', 3);
    });

    it('should display the correct total in the cart summary', () => {
        // Check if CartSummary displays the correct total
        cy.get('[data-cy=cart-summary]').contains('Total');
        cy.get('[data-cy=cart-total]').should('contain', '$2260');
    });

    it('should update the item quantity in the cart', () => {
        // Increase the quantity of the first item
        cy.get('[data-cy=cart-item-quantity]').first().as('firstItemQuantity');
        cy.get('@firstItemQuantity').should('contain', '1');
        cy.get('[data-cy=increment-quantity]').first().click();
        cy.get('@firstItemQuantity').should('contain', '2');

        // Decrease the quantity of the first item
        cy.get('[data-cy=decrement-quantity]').first().click();
        cy.get('@firstItemQuantity').should('contain', '1');
    });

    it('should remove an item from the cart if the quantity reaches zero', () => {
        // Assuming the first item has a quantity of 1
        cy.get('[data-cy=decrement-quantity]').first().click();
        // The item should be removed from the cart
        cy.get('[data-cy=cart-listing]').should('have.length', 2);
    });

    it('should navigate to the checkout page when the checkout button is clicked', () => {
        cy.get('[data-cy=checkout-button]').click();
        cy.get('[data-cy=cart-item-length]').contains('0')
        cy.get('.Toastify').find('div').contains('Order Placed successfully!')
    });

    it('should allow continuing shopping when the continue shopping button is clicked', () => {
        cy.get('[data-cy=continue-shopping-button]').click();
        cy.get(`[data-cy=product-card]`).should('have.length.greaterThan', 1)
    });
});