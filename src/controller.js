import { UI } from "./UI"
import { Project } from "./components/project/project"
import { ProjectList } from "./components/projectList/projectList"

const projectList = new ProjectList()

document.addEventListener("click", (event) => {
    switch (true){
        
        case event.target.classList.contains("add-project"): {
            UI.showProjectInput()
            break
        }

        case event.target.classList.contains("add-project-btn"):{
            const input = document.querySelector(".project-input")
            if (!input.value) return
            const newProject = new Project(input.value)
            if (!projectList.addProject(newProject)) return
            UI.renderProjects(projectList.getProjects())
            break
        }
            
        case (event.target.classList.contains("cancel-project-btn")): {
            UI.removeProjectInput()
            UI.renderProjects(projectList.getProjects())
            break
        }

        case (event.target.classList.contains("sidebar-project")): {
            projectList.setSelectProject(event.target.dataset.index)
            const targetProject = projectList.getSelectedProject()
            UI.renderTodos(targetProject.getTodos())
            break
        }
    }
})



