import { TodoListComponent } from '../page-components/todo-list-component';

const todoList = new TodoListComponent()

export const complete = (todoText) => {
    
    todoList.elementWithText(todoText).within(
        $listItem => { cy.get('.toggle').click() }
    )
}
