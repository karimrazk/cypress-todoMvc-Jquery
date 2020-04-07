describe("add new todo test", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    it("should add new todo to the list", () => {
        cy.get("input[class=new-todo]")
            .type("learn cypress" + "{enter}")
            .should("have.value", "");

        cy.get("ul[class=todo-list] > li")
            .should("have.length", 1)
            .and("contain", "learn cypress")
            .find(".toggle")
            .should("not.be.checked");
    });

    it("Should toggle all items ", () => {

        cy.fill("learn js ", "learn ecma");
        cy.get("label").contains("Mark all as complete").click();

        cy.get("ul[class=todo-list] > li").should(($list) => {
            expect($list).to.have.length(2);
            expect($list.eq(0)).to.contain("learn js").to.have.class("completed");
            expect($list.eq(1)).to.contain("learn ecma").to.have.class("completed");
        });

    });
});