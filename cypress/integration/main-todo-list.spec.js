const myItemOne = "MyItem 1";
const myItemTwo = "MyItem 2";
const myItemThree = "MyItem 3";
const removeOne = "DelItem 1";
const removeTwo = "DelItem 2";
const updateText = "First Item";

describe("Items list tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });


  context("Remove items tests", () => {
    it("Should remove DelItem 1", () => {
      cy.fill(removeOne,removeTwo);

      cy.contains(".todo-list li", removeOne)
        .find(".destroy")
        .invoke("show")
        .click({ force: true });

      cy.get(".todo-list li")
        .should("have.length", 1)
        .and("not.contain", removeOne);
    });

    it("Should remove item when it's an empty text ", () => {
      cy.fill(removeTwo);

      cy.contains(".todo-list li", removeTwo)
        .find(".edit")
        .invoke("show")
        .type("{selectall}  {del} {enter}");

      cy.contains(".todo-list li", removeTwo).should("not.exist");
    });

    it("Should remove all items !", () => {

      cy.fill(removeOne,removeTwo);

      cy.get(".todo-list li").each(function () {
        cy.get(".destroy")
          .invoke("show")
          .click({ force: true, multiple: true });
      });
      cy.get(".todo-list li").should("have.length", 0);
    });
  });

  //other tests
  context("Update item test", () => {
    it("Should update MyItem 1 to First Item ", () => {
      cy.fill(myItemOne);
      
      cy.contains(".todo-list li", myItemOne)
        .find(".edit")
        .invoke("show")
        .type("{selectall}" + updateText + "{enter}");

      cy.contains(".todo-list li", myItemOne).should("not.exist");
      cy.contains(".todo-list li", updateText).should("exist");
    });
  });

});
