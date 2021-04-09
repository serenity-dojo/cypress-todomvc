export const addTodo = (todoItem) => {
    cy.get('.new-todo').type(todoItem + '{enter}')
}

export const addTodos = (...todoItems) => {
    todoItems.forEach(
        todo => addTodo(todo)
    )
}