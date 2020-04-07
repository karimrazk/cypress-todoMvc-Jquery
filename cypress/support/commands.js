Cypress.Commands.add("fill", (...label) => {
  label.forEach((element) => {
    cy.get(".new-todo").type(element + "{enter}");
  });
});
Cypress.Commands.add("completedItems", (...label) => {
  label.forEach((element) => {
    cy.contains(".todo-list li", element).find(".toggle").check();
  });
});
