export class UI {

    static #removeAddProjectElement() {
        const addProject = document.querySelector(".add-project")
        addProject.remove()
    }

    static #removeAddTodoElement() {
        const addTodo = document.querySelector(".add-todo")
        addTodo.remove()
    }

    static showProjectInput() {
        const sidebar = document.querySelector(".sidebar-projects")
        const projectInput = document.createElement("div")
        projectInput.classList.add("add-project-input", "sidebar-obj")
        const input = document.createElement("input")
        input.type = "text"
        input.placeholder = "Enter project name..."
        input.classList.add("project-input")

        const addBtn = document.createElement("button")
        addBtn.textContent = "Add"
        addBtn.classList.add("add-project-btn")

        const cancelBtn = document.createElement("button")
        cancelBtn.textContent = "Cancel"
        cancelBtn.classList.add("cancel-project-btn")

        projectInput.appendChild(input)
        projectInput.appendChild(addBtn)
        projectInput.appendChild(cancelBtn)

        //Remove the add project field
        UI.#removeAddProjectElement()

        sidebar.appendChild(projectInput)
    }

    static renderProjects(projects) {
        const sidebarProjects = document.querySelector(".sidebar-projects")
        sidebarProjects.innerHTML = ""
        projects.forEach((project, index) => {
            const projectElement = UI.#createProjectElement(project, index)
            sidebarProjects.appendChild(projectElement)
        });
        const addProjectElement = UI.#createAddProjectElement()
        sidebarProjects.appendChild(addProjectElement)
    }

    static showTodoInput(projectIndex) {
        const todoList = document.querySelector(".todo-list")

        const todoInput = document.createElement("div")
        todoInput.dataset.projectIndex = projectIndex
        todoInput.classList.add("todo-item", "todo-input")

        const inputContainer = document.createElement("div")
        inputContainer.classList.add("todo-inputs-container")
        // Title
        const titleInput = document.createElement("input")
        titleInput.type = "text"
        titleInput.placeholder = "Enter todo name..."
        titleInput.classList.add("todo-title-input")
        // Due date
        const dateInput = document.createElement("input")
        dateInput.type = "date"
        dateInput.classList.add("todo-date-input")
        // Description
        const descriptionInput = document.createElement("input")
        descriptionInput.type = "text"
        descriptionInput.placeholder = "Enter todo description..."
        descriptionInput.classList.add("todo-description-input")
        // Priority
        const priorityDiv = document.createElement("div")
        const priorityInput = document.createElement("input")
        priorityInput.type = "range"
        priorityInput.min = 1
        priorityInput.max = 3
        priorityInput.id = "todo-priority"
        priorityInput.classList.add("todo-priority-input")

        const priorityLabel = document.createElement("label")
        priorityLabel.for = "todo-priority"
        priorityLabel.textContent = "Priority"

        priorityDiv.appendChild(priorityLabel)
        priorityDiv.appendChild(priorityInput)

        // Buttons
        const btnContainer = document.createElement("div")
        btnContainer.classList.add("input-todo-buttons")

        const addBtn = document.createElement("button")
        addBtn.textContent = "Add"
        addBtn.classList.add("add-todo-btn")

        const cancelBtn = document.createElement("button")
        cancelBtn.textContent = "Cancel"
        cancelBtn.classList.add("cancel-todo-btn")

        btnContainer.appendChild(addBtn)
        btnContainer.appendChild(cancelBtn)

        // Add to the elements to the div
        inputContainer.appendChild(titleInput)
        inputContainer.appendChild(dateInput)
        inputContainer.appendChild(descriptionInput)
        inputContainer.appendChild(priorityDiv)

        todoInput.appendChild(inputContainer)
        todoInput.appendChild(btnContainer)

        UI.#removeAddTodoElement()
        todoList.appendChild(todoInput)
    }

    static renderTodos(todos, addToProjectIndex = null) {
        const todoList = document.querySelector(".todo-list")
        todoList.innerHTML = ""
        todos.forEach(({todo, todoIndex, projectIndex}) => {
            const todoElement = UI.#createTodoElement(todo)
            todoElement.dataset.index = todoIndex
            todoElement.dataset.projectIndex = projectIndex
            todoList.appendChild(todoElement)
        })
        if (addToProjectIndex !== null) {
            const addTodoElement = UI.#createAddTodoElement(addToProjectIndex)
            todoList.appendChild(addTodoElement)
        }
    }

    static renderContentTitle(title) {
        const contentTitle = document.querySelector(".content-title")
        contentTitle.textContent = title
    }

    static #createTodoElement(todo) {
        const todoElement = document.createElement("div")

        const basicContent = document.createElement("div")
        basicContent.classList.add("basic-todo-content")
        const priorityClass = `priority-${todo.getPriority()}`
        todoElement.classList.add("todo-item", priorityClass)

        const infromation = document.createElement("span")
        infromation.textContent =  `${todo.getTitle()} - ${todo.getDueDate().toLocaleDateString()}`

        const completeBtn = document.createElement("button")
        completeBtn.textContent = todo.complete ? "✔" : "○";
        if (todo.complete) {
            todoElement.classList.add("complete-todo")
        }
        completeBtn.classList.add("toggle-todo-btn");

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "X"
        deleteBtn.classList.add("delete-todo-btn")

        const todoContent = document.createElement("div")
        todoContent.classList.add("todo-content")
        if (todo.expanded) {
            todoContent.classList.add("show")
        }
        const description = document.createElement("p")
        description.textContent = `${todo.getDescription()}`
        todoContent.appendChild(description)

        basicContent.appendChild(infromation)
        basicContent.appendChild(completeBtn)
        basicContent.appendChild(deleteBtn)
        todoElement.append(basicContent)
        todoElement.appendChild(todoContent)

        return todoElement
    }

    static #createProjectElement(project, index) {
        const sidebarObject = document.createElement("div")
        sidebarObject.classList.add("sidebar-obj", "sidebar-project")
        sidebarObject.dataset.index = index
        sidebarObject.textContent = project.getTitle()
        return sidebarObject
    }

    static #createAddProjectElement() {
        const sidebarObject = document.createElement("div")
        sidebarObject.classList.add("sidebar-obj", "add-project")
        sidebarObject.textContent = "Add project"
        return sidebarObject
    }

    static #createAddTodoElement(projectIndex) {
        const todoListElement = document.createElement("div")
        todoListElement.dataset.projectIndex = projectIndex
        todoListElement.classList.add("add-todo", "todo-item")
        todoListElement.textContent = "Add new todo"
        return todoListElement
    }
}

