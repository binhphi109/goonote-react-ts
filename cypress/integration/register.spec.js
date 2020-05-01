/* eslint-disable no-undef */
/// <reference types="cypress" />

import { t } from '../support/i18n';

context('Actions', () => {
  beforeEach(() => {
    cy.visit('localhost:8080/register');
  });

  it('not type username and password', () => {
    // cy.get('#username')
    //   .type('').should('have.value', '');

    cy.get('.loginButton').click();

    cy.get('.username > .errorContainer').should('contain', t('login.username.error.required'));

    cy.get('.password > .errorContainer').should('contain', t('login.password.error.required'));
  });

  it('type wrong username or password', () => {
    cy.get('#username')
      .type('wrong username')
      .should('have.value', 'wrong username');

    cy.get('#password')
      .type('wrong password')
      .should('have.value', 'wrong password');

    cy.get('.loginButton').click();

    cy.get('.username > .errorContainer').should('not.exist');

    cy.get('.password > .errorContainer').should('not.exist');

    cy.get('.errorContainer.loginError').should('contain', t('login.action.save.error'));
  });

  it('type correct username and password', () => {
    cy.get('#username')
      .type('test')
      .should('have.value', 'test');

    cy.get('#password')
      .type('12345')
      .should('have.value', '12345');

    cy.get('.loginButton').click();

    cy.get('.username > .errorContainer').should('not.exist');

    cy.get('.password > .errorContainer').should('not.exist');
    
    cy.get('.errorContainer.loginError').should('not.exist');

  });
});
