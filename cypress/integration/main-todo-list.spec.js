const myItemOne="MyItem 1";
const myItemTwo="MyItem 2";
const myItemThree="MyItem 3";

describe("Items list tests", () => {

  before(   () => {
    cy.visit("/");
    cy.get(".new-todo").type(myItemOne + "{enter}");
    cy.get(".new-todo").type(myItemTwo + "{enter}");    
    cy.get(".new-todo").type(myItemThree + "{enter}");
  });

  context("Adding items itest", () => {

    it("Check if 3 items are added !", () => {
      cy.get('.todo-list li')
          .should('have.length', 3)
          .and('contain', 'MyItem')
          .find('.toggle')
          .should('not.be.checked')
    });

  });

  context("Completed/Active items tests", () => {

    it("Should assigne " + myItemOne + " to Completed category", () => {
    cy.contains(".todo-list li", myItemOne).find(".toggle").check();
    cy.get('.todo-list li')
        .filter('.completed')
        .should('have.length', 1)
    cy.contains(".todo-list li", myItemOne).should("have.class", "completed");
    });
 

    it("Should assigne " + myItemOne + " to Active category", () => {
      cy.contains(".todo-list li", myItemOne).find(".toggle").uncheck();
      cy.contains(".todo-list li", myItemOne).find(".toggle").should('not.be.checked');
      cy.contains(".todo-list li", myItemOne).should("not.have.class", "completed");

    });

  });


  context("Remove items tests", () => {

    it("Should remove " + myItemTwo, () => {
      cy.contains(".todo-list li", myItemTwo)
          .find(".destroy")
          .invoke("show")
          .click();
      
      cy.get('.todo-list li')
          .should('have.length', 2)
          .and('not.contain', myItemTwo)

    });


    it("Should remove item when it's an empty text ", () => {
      cy.contains(".todo-list li", myItemThree)
          .find(".edit")
          .invoke("show")
          .type("{selectall}  {del} {enter}");
  
      cy.contains(".todo-list li", myItemThree)
          .should('not.exist');   
    });

  });


  context("Update item test", () => {

    it("Should update " + myItemOne + " to First Item ", () => {
      cy.contains(".todo-list li", myItemOne)
          .find(".edit")
          .invoke("show")
          .type("{selectall} First Item {enter}");

      cy.contains(".todo-list li", myItemOne)
          .should('not.exist');   
      cy.contains(".todo-list li", "First Item")
          .should('exist');
    });
    
  });




});
