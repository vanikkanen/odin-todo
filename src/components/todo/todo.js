export class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.complete = false
    }

    setTitle(newTitle) {
        this.title = newTitle
    }

    setDescription(newDescription) {
        this.description = newDescription
    }

    setDueDate(newDate) {
        this.dueDate = newDate
    }

    setPriority(newPriority) {
        this.priority = newPriority
    }

    toggleComplete() {
        this.complete = !this.complete
    }
}