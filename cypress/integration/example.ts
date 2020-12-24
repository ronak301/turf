/**
 * Just for showcase, remove this file
 */

describe('Examples', () => {
  const commentsIds: [number?] = [];

  before(() => {
    for (let i = 0; i < 2; i += 1) {
      cy.request('https://jsonplaceholder.cypress.io/comments').then(
        ({ status, body }) => {
          if (status === 200) {
            commentsIds.push(body[i].id);
          }
        }
      );
    }
  });

  beforeEach(() => {
    cy.visit('/');
    cy.wrap(commentsIds).as('commentsIds');
  });

  it('Successfully loads', () => {
    cy.visit('/');
  });

  it('Toggle redux', () => {
    cy.get('[data-cy=toggle-redux-value]')
      .contains('false')
      .get('[data-cy=toggle-redux-button]')
      .click()
      .get('[data-cy=toggle-redux-value]')
      .contains('true');
  });

  it('404 page', () => {
    cy.visit('/404').get('h1').contains('Not found');
  });

  it('Can access @commentsIds alias from request(s)', () => {
    cy.get('@commentsIds').then((ids) => {
      expect(ids).to.be.a('array');
      expect(ids).to.include(1);
    });
  });

  it('Type input text through support/commands and fixtures', () => {
    cy.fixture('example').then(({ name }) => {
      cy.visit('/form');
      cy.typeText(name);
      cy.get('input[name=firstName]').should('have.value', name);
    });
  });
});
