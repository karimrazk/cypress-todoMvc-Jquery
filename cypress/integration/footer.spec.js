describe("Show items by categorys", () => {
  it("Show items by category all", () => {
    cy.visit("/#/all");
    cy.addListItems();

    cy.get(".todo-list li").should(($p) => {
      expect($p).to.have.length(4);
    });
  });

  it("Show items by category active", () => {
    cy.addListItems();
    cy.visit("/#/active");
    cy.get(".todo-list > li").should(($list) => {
      expect($list).to.have.length(2);
      expect($list.eq(0)).to.contain("item 1");
      expect($list.eq(1)).to.contain("item 3");
    });
  });

  it("Show items by category completed", () => {
    cy.visit("/");
    cy.addListItems();
    cy.visit("/#/completed");
    cy.get(".todo-list li").should(($list) => {
      expect($list).to.have.length(2);
      expect($list.eq(0)).to.contain("item 2").to.have.class("completed");
      expect($list.eq(1)).to.contain("item 4").to.have.class("completed");
    });
  });

  it("Remove all items completed", () => {
    cy.visit("/");
    cy.addListItems();
    cy.get(".clear-completed").click();
    cy.contains(".todo-list li", "item 2").should("not.exist", "completed");
    cy.contains(".todo-list li", "item 4").should("not.exist", "completed");
  });
});
