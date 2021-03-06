const NEW_TODO = '.new-todo'
const TODO_ITEMS = '.todo-list li'
const COMPLETE_BUTTON = '.toggle'
const DELETE_ICON = '.destroy'
const REACT_TODOAPP = 'https://todomvc.com/examples/react/#/'

export class TodoPage {
    open() {
        cy.visit(REACT_TODOAPP)
    }

    addTodo(todoText) {
        cy.get(NEW_TODO).type(todoText + '{enter}')
    }

    addTodos(...todos) {
        todos.forEach (
            todo => this.addTodo(todo)
        )
    }

    shouldShowItems(...expectedItems) {
        this.todos().should('have.length',expectedItems.length)
        for(var i = 0; i < expectedItems.length; i++) {
            this.todos().eq(i).should('contain.text', expectedItems[i])
        }
    }

    newTodoField() { return cy.get(NEW_TODO) }

    todos() { return cy.get(TODO_ITEMS) }

    todoElement(todoText) {
        return cy.contains(TODO_ITEMS,todoText)
    }

    complete(todoText) {
        this.todoElement(todoText).within(
            $listItem => { cy.get(COMPLETE_BUTTON).click() }
        )
    }

    delete(todoText) {
        this.todoElement(todoText).within(
            $listItem => cy.get(DELETE_ICON).invoke('show').click()
        )
    }

    filterBy(filter) {
        cy.contains(filter).click()
    }
}