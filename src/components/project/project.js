import { Todo } from "../todo/todo"

export class Project {
    constructor(title, todos = []) {
        this.title = title
        this.todos = todos
    }

    setTitle(newTitle) {
        this.title = newTitle
    }

    // Return true if adding todo was succesfull, else return false
    addTodo(todo) {
        if (!todo instanceof Todo) return false
        this.todos.push(todo)
        return true
    }

    // Return true if removing todo was succesfull, else return false
    removeTodo(index) {
        if (index < 0 || index >= this.todos.length) return false
        this.todos.splice(index, 1)
        return true
    }

}