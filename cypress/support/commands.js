Cypress.Commands.add(
  `login`,
  (usernameField, emailValue, passwordField, passwordValue) => {
    cy.get(`#root > div.nav > div > div > button`).click({ force: true });
    cy.wait(2000);
    cy.get(usernameField).type(emailValue);
    cy.get(passwordField).type(passwordValue);
    cy.get(
      `button[type="submit"][name="action"][class="c818c634d cab70d39b c9fec752d c570086c6 cf67a0f9a"]`
    ).click();
  }
);

Cypress.Commands.add(`logout`, () => {
  cy.get(`button[class="login"]`).click();
});
