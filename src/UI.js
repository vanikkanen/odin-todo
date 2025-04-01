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
        projects.forEach(project => {
            const projectElement = UI.#createProjectElement(project)
            sidebarProjects.appendChild(projectElement)
        });
        const addProjectElement = UI.#createAddProjectElement()
        sidebarProjects.appendChild(addProjectElement)
    }

    static #createProjectElement(project) {
        const sidebarObject = document.createElement("div")
        sidebarObject.classList.add("sidebar-obj")
        sidebarObject.textContent = project.getTitle()
        return sidebarObject
    }

    static #createAddProjectElement() {
        const sidebarObject = document.createElement("div")
        sidebarObject.classList.add("sidebar-obj", "add-project")
        sidebarObject.textContent = "Add project"
        return sidebarObject
    }
}

