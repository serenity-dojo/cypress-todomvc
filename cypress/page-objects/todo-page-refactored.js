const NEW_TODO = ".new-todo"
const TODO_ITEMS = ".todo-list li"
const COMPLETE_BUTTON = ".toggle"
const DELETE_ICON = ".destroy"

export class TodoPageRefactored {
    open() {
        cy.visit('https://todomvc.com/examples/react/#/')
    }

    addTodo(todoText) {
        cy.get(NEW_TODO).type(todoText + '{enter}')
    }

    addTodos(...todos) {
        todos.forEach (
            todo => this.addTodo(todo)
        )
    }

    shouldShowItems(...expectedTodos) {
        for(var i = 0; i < expectedTodos.length; i++) {
            console.log(expectedTodos[i]);
            this.todos().eq(i).should('contain.text', expectedTodos[i])
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

    filterBy(filter) {
        cy.contains(filter).click()
    }

    delete(todoText) {
        this.todoElement(todoText).within(
            $listItem => cy.get(DELETE_ICON).invoke('show').click()
        )
    }
}