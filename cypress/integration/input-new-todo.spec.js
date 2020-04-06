describe("add new todo test", () => {

    const textToType = "learn cypress";

    beforeEach(() => {
        cy.visit("/");
    });

    it("should add new todo to the list", () => {

        cy.get("input[class=new-todo]")
            .type(textToType + "{enter}")
            .should("have.value", "");

        cy.get("ul[class=todo-list] > li")
            .should("have.length", 1)
            .and("contain", textToType);

    });


});