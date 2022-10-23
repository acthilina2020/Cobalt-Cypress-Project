/// <reference types="cypress" />

describe(`sign in as a valid user, adding items to cart, purchase and log out`, () => {
  beforeEach(() => {
    cy.visit(`/products`, { retryOnNetworkFailure: true });
    Cypress.on(`uncaught:exception`, (err, runnable) => {
      return false;
    });
  });

  it(`verify the url`, () => {
    cy.url().should(
      `include`,
      `/competent-engelbart-3915c0.netlify.app/products`
    );
  });

  it(`verify the title`, () => {
    cy.title().should(`include`, `Trends Clothing Store`);
  });

  it(`verify user can login, add items, complete the purchase and log out`, () => {
    cy.login(`#username`, `acthilina@gmail.com`, `#password`, `Password123`); // Use re-usable custom command to login
    cy.url().should(`include`, `competent-engelbart-3915c0.netlify.app`); // verify the url after logged in
    cy.get(`[href="/products"] > li`).click(); // Click on products tab
    cy.get(
      `:nth-child(1) > .cocktail-footer > .btn-container > .add-cart`
    ).dblclick({ force: true }); // add two items to cart
    cy.get(`a > .fa`).click({ force: true }); // navigate to the cart
    cy.get(
      `#root > div.section.section-center > div.cart > div.amount-btns > h3`
    )
      .invoke(`text`)
      .then((number) => {
        // verify two items are added
        expect(number).equal(`2`);
      });
    cy.get(`.StripeCheckout > span`).click(); // click on pay now button

    // find the iframe and then the elements to enter shipping details
    cy.iframe(
      `body > iframe[name="stripe_checkout_app"][class="stripe_checkout_app"]`
    )
      .find(`#email`)
      .should(`be.visible`)
      .type(`acthilina@gmail.com`);
    cy.iframe(
      `body > iframe[name="stripe_checkout_app"][class="stripe_checkout_app"]`
    )
      .find(`#shipping-name`)
      .should(`be.visible`)
      .type(`Kasun`);
    cy.iframe(
      `body > iframe[name="stripe_checkout_app"][class="stripe_checkout_app"]`
    )
      .find(`#shipping-street`)
      .should(`be.visible`)
      .type(`1 john street`);
    cy.iframe(
      `body > iframe[name="stripe_checkout_app"][class="stripe_checkout_app"]`
    )
      .find(`#shipping-zip`)
      .should(`be.visible`)
      .type(`M8R4Y6`);
    cy.iframe(
      `body > iframe[name="stripe_checkout_app"][class="stripe_checkout_app"]`
    )
      .find(`#shipping-city`)
      .should(`be.visible`)
      .type(`Toronto`);
    cy.iframe(
      `body > iframe[name="stripe_checkout_app"][class="stripe_checkout_app"]`
    )
      .find(`#submitButton > span > span`)
      .click();

    // find the iframe and then enter credit card details to complete the transaction
    cy.iframe(
      `body > iframe[name="stripe_checkout_app"][class="stripe_checkout_app"]`
    )
      .find(`#card_number`)
      .should(`be.visible`)
      .type(`4242 4242 4242 4242`);
    cy.iframe(
      `body > iframe[name="stripe_checkout_app"][class="stripe_checkout_app"]`
    )
      .find(`#cc-exp`)
      .should(`be.visible`)
      .type(`102022`);
    cy.iframe(
      `body > iframe[name="stripe_checkout_app"][class="stripe_checkout_app"]`
    )
      .find(`#cc-csc`)
      .should(`be.visible`)
      .type(`333`);
    cy.iframe(
      `body > iframe[name="stripe_checkout_app"][class="stripe_checkout_app"]`
    )
      .find(`#submitButton > span > span`)
      .click();
    cy.logout(); // Use re-usable custom command to log out
  });
});
