const itemOne = "item 1";
const itemTwo = "item 2";
const itemThree = "item 3";
const itemFoor = "item 4";
describe("Show items by categorys", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Show items by category all", () => {
    cy.fill(itemOne, itemTwo, itemThree, itemFoor);
    cy.get('.filters  a[href*="#/all"]').click();
    cy.get(".todo-list li").should(($p) => {
      expect($p).to.have.length(4);
    });
  });

  it("Show items by category active", () => {
    cy.fill(itemOne, itemTwo, itemThree, itemFoor);
    cy.completedItems(itemFoor, itemTwo);
    cy.get('.filters a[href*="#/active"]').click();
    cy.get(".todo-list > li").should(($list) => {
      expect($list).to.have.length(2);
      expect($list.eq(0)).to.contain(itemOne);
      expect($list.eq(1)).to.contain(itemThree);
    });
  });

  it("Show items by category completed", () => {
    cy.fill(itemOne, itemTwo, itemThree, itemFoor);
    cy.completedItems(itemFoor, itemTwo);
    cy.get('.filters a[href*="#/completed"]').click();
    cy.get(".todo-list li").should(($list) => {
      expect($list).to.have.length(2);
      expect($list.eq(0)).to.contain(itemTwo).to.have.class("completed");
      expect($list.eq(1)).to.contain(itemFoor).to.have.class("completed");
    });
  });

  it("Remove all items completed", () => {
    cy.fill(itemOne, itemTwo, itemThree, itemFoor);
    cy.completedItems(itemFoor, itemTwo);
    cy.get(".clear-completed").click();
    cy.contains(".todo-list li", itemTwo).should("not.exist", "completed");
    cy.contains(".todo-list li", itemFoor).should("not.exist", "completed");
  });
});
