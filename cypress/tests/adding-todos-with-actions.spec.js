/// <reference types="cypress"/>

import {addTodo, addTodos} from '../actions/add'
import {complete} from '../actions/complete'
import { NewTodoForm } from '../page-components/new-todo-form';
import { TodoListComponent } from '../page-components/todo-list-component';

describe('When adding new todo items in the TODOMVC app', () => {

    const todoList = new TodoListComponent()
    const newTodoForm = new NewTodoForm();

    beforeEach(() => {
        cy.visit('https://todomvc.com/examples/react/#/')
    })

    it('Should tell the user what to do', () => {
        newTodoForm.inputField()
                    .should('have.attr', 'placeholder','What needs to be done?')
                    .and('be.enabled')
    })

    it('New todo items should appear in the todo list', () => {

        addTodo('Walk the dog')

        todoList.todos().should('have.length',1)
        todoList.todoElementNumber(0).should('have.text','Walk the dog')

    })
    
    it('should add a new item to the list', () => {

        cy.visit('https://todomvc.com/examples/angularjs/#/')

        cy.get('.new-todo').type('Feed the cats{enter}')

        cy.get('.todo-list li').should('have.length',1)

        cy.get('.filters').find('[href$="completed"]').click()

        cy.get('.todo-list li').should('have.length',0)
    })    

    it('Multiple new todo items should appear in order of appearance', () => {

        addTodos('Walk the dog', 'Feed the cat')

        todoList.todos().should('have.length',2)
        todoList.todoElementNumber(0).should('have.text','Walk the dog')

    })

    it('Should show completed todos as completed', () => {
        addTodos('Walk the dog', 'Feed the cat')

        complete('Walk the dog')

    })

    it('Should delete items', () =>  {
    })

    
});