/**
 * This example commands.js shows you how to
 * create various custom commands and overwrite
 * existing commands.
 *
 * For more comprehensive examples of custom
 * commands please read more here:
 * https://on.cypress.io/custom-commands
 */

// Just for showcase, remove this
Cypress.Commands.add('typeText', (value: string) => {
  cy.get('input[name=firstName]').type(value, { force: true });
});
