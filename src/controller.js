import { UI } from "./UI"
import { Project } from "./components/project/project"
import { ProjectList } from "./components/projectList/projectList"
import { Todo } from "./components/todo/todo"

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
        
        case (event.target.classList.contains("add-todo")): {
            UI.showTodoInput()
            break
        }

        case event.target.classList.contains("add-todo-btn"):{
            const targetProject = projectList.getSelectedProject()
            const todoTitle = document.querySelector(".todo-title-input")
            const todoDate = document.querySelector(".todo-date-input")
            const todoDescription = document.querySelector(".todo-description-input")
            const todoPriority = document.querySelector(".todo-priority-input")
            if (!todoTitle.value || !todoDate.value || !todoPriority.value) return
            const newTodo = new Todo(todoTitle.value, todoDate.value, todoDescription.value, todoPriority.value)
            if (!targetProject.addTodo(newTodo)) return
            UI.renderTodos(targetProject.getTodos())
            break
        }
            
        case (event.target.classList.contains("cancel-todo-btn")): {
            UI.removeProjectInput()
            UI.renderProjects(projectList.getProjects())
            break
        }


    }
})



