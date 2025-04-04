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

        const title = document.createElement("div")
        title.textContent = `${todo.getTitle()}`

        const dueDate = document.createElement("div")
        dueDate.textContent = `${todo.getDueDate().toLocaleDateString()}`

        const completeBtn = document.createElement("button")
        completeBtn.classList.add("toggle-todo-btn");
        if (todo.complete) {
            todoElement.classList.add("complete-todo")
            completeBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                    width="24" height="24" 
                    fill="currentColor"
                    aria-label="Mark not done">
                    <title>radiobox-blank</title>
                    <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" />
                </svg>
            `
        } else {
            completeBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                    width="24" height="24" 
                    fill="currentColor"
                    aria-label="Mark done">
                    <title>check-bold</title>
                    <path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
            `;
        }

        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("delete-todo-btn")
        deleteBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="24" height="24" 
                fill="currentColor"
                aria-label="Delete">
            <title>Delete</title>
            <path d="M9,3V4H4V6H5V19A2,2 0 0,0 
                    7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,
                    6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
            </svg>
        `;
        
        const todoContent = document.createElement("div")
        todoContent.classList.add("todo-content")
        if (todo.expanded) {
            todoContent.classList.add("show")
        }
        const description = document.createElement("p")
        description.textContent = `${todo.getDescription()}`
        todoContent.appendChild(description)

        basicContent.appendChild(title)
        basicContent.appendChild(dueDate)
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

        const title = document.createElement("div")
        title.classList.add("sidebar-project-title")
        title.textContent = project.getTitle()

        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("delete-project-btn")
        deleteBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="24" height="24" 
                fill="currentColor"
                aria-label="Delete">
            <title>Delete</title>
            <path d="M9,3V4H4V6H5V19A2,2 0 0,0 
                    7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,
                    6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
            </svg>
        `;

        sidebarObject.appendChild(title)
        sidebarObject.appendChild(deleteBtn)

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

