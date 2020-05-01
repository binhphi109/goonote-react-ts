/* eslint-disable no-undef */
/// <reference types="cypress" />

import { t } from '../support/i18n';

context('Actions', () => {
  beforeEach(() => {
    cy.login('test', '12345');
    cy.visit('localhost:8080/home');
  });

  it('not type username and password', () => {
    
  });

});
