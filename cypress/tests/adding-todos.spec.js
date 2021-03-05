/// <reference types="cypress"/>

import { TodoPage } from "../page-objects/todo-page";

describe('When adding new todo items in the TODOMVC app', () => {

    const todoPage = new TodoPage()

    beforeEach(() => {
        todoPage.open()
    })

    it('Should tell the user what to do', () => {
        todoPage.newTodoField().should('have.attr', 'placeholder','What needs to be done?').and('be.enabled')
    })

    it('New todo items should appear in the todo list', () => {
        todoPage.addTodos('Walk the dog','Feed the cat')

        cy.contains('.todo-list li','Walk the dog')
        cy.contains('.todo-list li','Feed the cat')
        cy.get("li:nth-child(1)").should('contain.text','Walk the dog')
        cy.get("li:nth-child(2)").should('contain.text','Feed the cat')
    })

    it('Should show completed todos as completed', () => {
        todoPage.addTodos('Feed the lions','Walk the panther')
        todoPage.complete('Walk the panther')
        todoPage.todos().should('have.length',2)
        todoPage.todoElement('Walk the panther').should('have.class','completed')

    })

    it('Should delete items', () =>  {
        todoPage.addTodos('Feed the lions','Walk the panther')

        todoPage.delete('Walk the panther')

        todoPage.todos().should('have.length',1)
        
    })

    
});