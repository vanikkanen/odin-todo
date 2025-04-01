export class UI {

    static removeProjectInput() {
        const projectInput = document.querySelector(".add-project-input")
        projectInput.remove()
    }

    static #removeAddProjectElement() {
        const addProject = document.querySelector(".add-project")
        addProject.remove()
    }

    static showProjectInput() {
        const sidebar = document.querySelector(".sidebar")
        const projectInput = document.createElement("div")
        projectInput.classList.add("add-project-input")
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

    static renderTodos(todos) {
        const todoList = document.querySelector(".todo-list")
        todoList.innerHTML = ""

        todos.forEach((todo, index) => {
            const todoElement = UI.#createTodoElement(todo, index)
            todoList.appendChild(todoElement)
        })
        const addTodoElement = UI.#createAddTodoElement()
        todoList.appendChild(addTodoElement)
    }

    static #createTodoElement(todo, index) {
        const todoElement = document.createElement("div")
        todoElement.classList.add("todo-item")
        todoElement.dataset.index = index

        const title = document.createElement("span")
        title.textContent = todo.getTitle()

        const completeBtn = document.createElement("button")
        completeBtn.textContent = todo.complete ? "✔" : "○";
        completeBtn.classList.add("toggle-todo-btn");

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "X"
        deleteBtn.classList.add("delete-todo-btn")

        todoElement.appendChild(title)
        todoElement.appendChild(completeBtn)
        todoElement.appendChild(deleteBtn)

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

    static #createAddTodoElement() {
        const todoListElement = document.createElement("div")
        todoListElement.classList.add("todo-item", "add-todo")
        todoListElement.textContent = "Add new todo"
        return todoListElement
    }
}

