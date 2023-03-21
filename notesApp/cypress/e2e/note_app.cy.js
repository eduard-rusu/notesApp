describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'testing',
      username: 'testing',
      password: 'testing'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('testing')
    cy.get('#password').type('testing')
    cy.get('#login-button').click()
    cy.contains('logged in as testing')
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('testing')
    cy.get('#password').type('testing123')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'Wrong credentials')
    cy.get('html').should('not.contain', 'logged in as testing')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testing', password: 'testing' })
    })

    it('a new note can be created', function() {
      cy.get('#make-visible').click()
      cy.get('#note-input').type('test note')
      cy.get('#note-important').check()
      cy.get('#create-note').click()
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.addNote({ content: 'test note', important: true })
      })

      it('it can be made not important', function() {
        cy.get('.note')
          .contains('test note')

        cy.get('.note')
          .contains('Make Unimportant')
          .click()

        cy.get('.note')
          .contains('test note')

        cy.get('.note')
          .contains('Make Important')
      })
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.addNote({ content: 'first note', important: false })
        cy.addNote({ content: 'second note', important: false })
        cy.addNote({ content: 'third note', important: false })
      })

      it('one of these can be made important', function () {
        cy.contains('second note')
          .parent()
          .contains('Make Important')
          .click()

        cy.contains('second note')
          .parent()
          .contains('Make Unimportant')
      })
    })
  })



})