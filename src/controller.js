import { UI } from "./UI"
import { Project } from "./components/project/project"
import { ProjectList } from "./components/projectList/projectList"

const projectList = new ProjectList()

document.addEventListener("click", (event) => {
    console.log(event.target.classList)
    switch (true){
        
        case event.target.classList.contains("add-project"): {
            UI.showProjectInput()
        }

        case event.target.classList.contains("add-project-btn"):{
            console.log("Add project")
            const input = document.querySelector(".project-input")
            if (!input.value) {
                console.log("No name")
                return
            }
            const newProject = new Project(input.value)
            projectList.addProject(newProject)
            UI.renderProjects(projectList.getProjects())
        }
            
        case (event.target.classList.contains("cancel-project-btn")): {
            console.log("Cancel project")
            UI.removeProjectInput()
            UI.renderProjects(projectList.getProjects())
        }
    
    }
})



