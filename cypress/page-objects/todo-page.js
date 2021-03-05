export class TodoPage {
    open() {
        cy.visit('https://todomvc.com/examples/react/#/')
    }

    addTodo(todoText) {
        cy.get('.new-todo').type(todoText + '{enter}')
    }

    addTodos(...todos) {
        todos.forEach (
            todo => this.addTodo(todo)
        )
    }

    newTodoField() { return cy.get(".new-todo") }

    todos() { return cy.get('.todo-list li') }

    todoElement(todoText) {
        return cy.contains('.todo-list li',todoText)
    }

    complete(todoText) {
        this.todoElement(todoText).within(
            $listItem => { cy.get('.toggle').click() }
        )
    }

    delete(todoText) {
        this.todoElement(todoText).within(
            $listItem => cy.get('.destroy').invoke('show').click()
        )
    }


}