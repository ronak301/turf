/// <reference types="cypress" />

// Just for showcase, remove this
declare namespace Cypress {
  interface Chainable {
    typeText(value: string): Chainable<Subject>;
  }
}
