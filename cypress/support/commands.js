Cypress.Commands.add("addListItems", () => {
  cy.visit("/");
  cy.get(".new-todo").type("item 1  {enter}").should("have.value", "");
  cy.get(".new-todo").type("item 2  {enter}").should("have.value", "");
  cy.get(".new-todo").type("item 3  {enter}").should("have.value", "");
  cy.get(".new-todo").type("item 4  {enter}").should("have.value", "");
  cy.contains(".todo-list li", "item 2").find(".toggle").check();
  cy.contains(".todo-list li", "item 4").find(".toggle").check();
});
