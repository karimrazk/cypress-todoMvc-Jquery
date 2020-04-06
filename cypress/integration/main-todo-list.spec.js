const myItemOne="MyItem 1";
const myItemTwo="MyItem 2";
const myItemThree="MyItem 3";
const removeOne="DelItem 1";
const removeTwo="DelItem 2";
const updateText="First Item";

describe("Items list tests", () => {

  beforeEach(   () => {
    cy.visit("/");

  });

  context("Adding items test", () => {

    it("Check if 3 items are added !", () => {
      cy.get(".new-todo").type(myItemOne + "{enter}");
      cy.get(".new-todo").type(myItemTwo + "{enter}");    
      cy.get(".new-todo").type(myItemThree + "{enter}");

      cy.get('.todo-list li')
          .should('have.length', 3)
          .and('contain', myItemOne)
          .and('contain', myItemTwo)
          .and('contain', myItemThree)
          .find('.toggle')
          .should('not.be.checked')

    });

  });


  context("Remove items tests", () => {

    it("Should remove DelItem 1", () => {
      cy.get(".new-todo").type(removeOne + "{enter}");
      cy.get(".new-todo").type(removeTwo + "{enter}");

      cy.contains(".todo-list li", removeOne)
          .find(".destroy")
          .invoke("show")
          .click();
      
      cy.get('.todo-list li')
          .should('have.length', 1)
          .and('not.contain', removeOne)

    });




    it("Should remove item when it's an empty text ", () => {
      cy.get(".new-todo").type(removeTwo + "{enter}");

      cy.contains(".todo-list li", removeTwo)
          .find(".edit")
          .invoke("show")
          .type("{selectall}  {del} {enter}");
  
      cy.contains(".todo-list li", removeTwo)
          .should('not.exist');   
    });



    it("Should remove all items !", () => {

      cy.get(".new-todo").type(removeOne + "{enter}");
      cy.get(".new-todo").type(removeTwo + "{enter}");

     
      cy.get(".todo-list li").each(function () {
        cy.get(".destroy")
          .invoke("show")
          .click({ force: true, multiple: true });
      });
      cy.get('.todo-list li')
          .should('have.length', 0)
    });


  });


  context("Update item test", () => {

    it("Should update MyItem 1 to First Item ", () => {
      cy.get(".new-todo").type(myItemOne + "{enter}");
      cy.contains(".todo-list li", myItemOne)
          .find(".edit")
          .invoke("show")
          .type("{selectall}"+ updateText +"{enter}");

      cy.contains(".todo-list li", myItemOne)
          .should('not.exist');   
      cy.contains(".todo-list li", updateText)
          .should('exist');
    });
    
  });


  context("Completed items test", () => {


    it("Should assigne MyItem 1 to Completed category", () => {
      cy.get(".new-todo").type(myItemOne + "{enter}");

      cy.contains(".todo-list li", myItemOne).find(".toggle").check();
      cy.get('.todo-list li')
          .filter('.completed')
          .should('have.length', 1)
      cy.contains(".todo-list li", myItemOne).should("have.class", "completed");
    });

  });

});
