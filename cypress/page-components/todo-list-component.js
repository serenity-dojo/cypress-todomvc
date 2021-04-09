export class TodoListComponent {
    todos() { return cy.get('.todo-list li') }

    elementWithText(todoText) {
        return cy.contains('.todo-list li',todoText)
    }

    todoElementNumber(todoNumber) {
        return cy.get('.todo-list li').eq(todoNumber)
    }
}