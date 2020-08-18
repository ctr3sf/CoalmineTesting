//Open fresh window
describe('Log In and Test Canary', () => {
  it('Navigates to Canary (then bounced to Login) ', () => {
    cy.visit('https://issues.twinthread.com/board')

	cy.url().should('eq', 'https://dev.twinthread.com/Account/Login')
  })

//Login via a more secure manner
//This will use secret environment variables and another file to prevent
//hardcoding passwords, especially for code on a public facing repo
  it('Logging In Securely', () => {
    const username = Cypress.env('username')
    const password = Cypress.env('password')

    expect(username, 'username was set').to.be.a('string').and.not.be.empty
	//Same checking as above but prevents logging
	if (typeof password !== 'string' || !password) {
      throw new Error('Missing password value, set using CYPRESS_password=...')
    }
	
    cy.get('[name=Email]').type(username).should('have.value', username)
    //Same checking as above but prevents logging
    cy.get('[name=Password]').type(password, { log: false })
      .should(el$ => {
        if (el$.val() !== password) {
          throw new Error('Different value of typed password')
        }
      })
    cy.get('[type=button]').click()

	cy.url().should('eq', 'https://issues.twinthread.com/board')
  })

  it('Pick the first issue, then comment, and submit', () => {
	cy.get('ul').find('[id=card]').first().click()
	cy.get("[id=commentInput]").type("This is a test comment.")
	  .should('have.value', "This is a test comment.")
    //cy.get("[id=commentInput]").type("{enter}")
	//cy.get('ul').contains("This is a test comment.")
	//  .should('eq', "This is a test comment.")
  })

})