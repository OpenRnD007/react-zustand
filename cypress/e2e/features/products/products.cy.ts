/// <reference types="cypress" />

// products.spec.ts
describe('Products Feature', () => {

    beforeEach(() => {
        cy.visit('/'); // Adjust if the ProductListing is rendered on a different route
    });

    // Products Component
    describe('Products Component', () => {
        it('successfully loads and displays the product listing', () => {
            cy.get('section').find('div').should('exist');
            cy.get('section').find('div').should('have.class', 'product-list');
        });
    });

    // ProductListing Component
    describe('ProductListing Component', () => {

        it('displays a list of products', () => {
            cy.get('article').should('have.length.at.least', 1);
            cy.get('article').should('have.class', 'product-card');
        });
    });

    // ProductCard Component
    describe('ProductCard Component', () => {

        it('displays product information', () => {
            cy.get('.product-card').first().as('firstCard');
            cy.get('@firstCard').find('img').should('have.attr', 'src').and('include', 'images.unsplash.com')
            cy.get('@firstCard').find('h2').should('contain', 'Nike')
            cy.get('@firstCard').find('p.text-sm').should('contain', 'shoes')
        });

        it('shows the correct price', () => {
            cy.get('.product-card').first().as('firstCard');
            cy.get('@firstCard').find('p.text-lg').should('contain', '$'); // Check if price contains a dollar sign
        });

        it('has a functional "Add to cart" button', () => {
            cy.get('.product-card').first().as('firstCard');
            cy.get('@firstCard').find('button').contains('Add to cart').click();
            cy.get('[data-cy=cart-item-length]').contains('1');
            cy.get('.Toastify').find('div').contains('added to cart successfully!') 
        });
    });
});