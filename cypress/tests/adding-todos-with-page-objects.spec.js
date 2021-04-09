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
        todoPage.todos().should('have.length',2)
        todoPage.todoElement('Walk the dog').should('be.visible')
        todoPage.todoElement('Feed the cat').should('be.visible')
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

    it('should now show completed todos in the active list', () => {
        todoPage.addTodos('Feed the lions','Walk the panther')
        todoPage.filterBy('Active')
        todoPage.shouldShowItems('Feed the lions', 'Walk the panther')

        todoPage.complete('Feed the lions')

        todoPage.shouldShowItems('Walk the panther')
    })
    
});