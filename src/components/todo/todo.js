export class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.complete = false
        this.expanded = false
    }

    setTitle(newTitle) {
        this.title = newTitle
    }

    getTitle() {
        return this.title
    }

    getPriority() {
        return this.priority
    }

    getDueDate() {
        return this.dueDate
    }

    getDescription() {
        return this.description
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

    toggleExpand() {
        this.expanded = !this.expanded
    }
}