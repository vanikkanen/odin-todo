import { UI } from "./UI"
import { Project } from "./components/project/project"
import { ProjectList } from "./components/projectList/projectList"
import { Todo } from "./components/todo/todo"

const projectList = new ProjectList()

const getAllTodos = () => {
    const projects = projectList.getProjects()
    const todos = []
    projects.forEach(project => {
        todos.push(...project.getTodos())
    })
    return todos
}

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
            const newTodo = new Todo(todoTitle.value, todoDescription.value, new Date(Date.parse(todoDate.value)), todoPriority.value)
            if (!targetProject.addTodo(newTodo)) return
            UI.renderTodos(targetProject.getTodos())
            break
        }
            
        case (event.target.classList.contains("cancel-todo-btn")): {
            const targetProject = projectList.getSelectedProject()
            UI.renderTodos(targetProject.getTodos())
            break
        }

        case (event.target.classList.contains("toggle-todo-btn")): {
            const todoIndex = event.target.parentElement.dataset.index
            const targetProject = projectList.getSelectedProject()
            const targetTodo = targetProject.getTodos()[todoIndex]
            targetTodo.toggleComplete()
            UI.renderTodos(targetProject.getTodos())
            break
        }

        case (event.target.classList.contains("delete-todo-btn")): {
            const todoIndex = event.target.dataset.index
            const targetProject = projectList.getSelectedProject()
            if(!targetProject.removeTodo(todoIndex)) return
            UI.renderTodos(targetProject.getTodos())
            break
        }

        case (event.target.classList.contains("all-tasks")): {
            const allTodos = getAllTodos()
            console.log(allTodos)
            UI.renderTodos(allTodos, false)
            break
        }

        case (event.target.classList.contains("today")): {
            const allTodos = getAllTodos()
            const today = new Date()
            const filteredTodos = allTodos.filter(todo => {
                return today.toDateString() === todo.getDueDate().toDateString()
            })
            UI.renderTodos(filteredTodos, false)
            break
        }

        case (event.target.classList.contains("next-7-days")): {
            const allTodos = getAllTodos()
            const today = new Date()
            today.setTime(0, 0, 0, 0)

            const seventhDay = new Date()
            seventhDay.setDate(today.getDate() + 7)
            seventhDay.setHours(23, 59, 59, 999)

            const filteredTodos = allTodos.filter(todo => {
                const dueDate = todo.getDueDate()
                return today.getTime() <= dueDate.getTime() &&
                       dueDate.getTime() <= seventhDay.getTime()
            })
            UI.renderTodos(filteredTodos, false)
            break
        }

    }
})