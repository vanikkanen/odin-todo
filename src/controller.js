import { UI } from "./UI"
import { Project } from "./components/project/project"
import { ProjectList } from "./components/projectList/projectList"
import { Todo } from "./components/todo/todo"

const projectList = new ProjectList()

const getAllTodos = () => {
    const projects = projectList.getProjects()
    const todos = []
    projects.forEach((project, projectIndex) => {
        project.getTodos().forEach((todo, todoIndex) => {
            todos.push({todo, todoIndex, projectIndex})
        })
    })
    return todos
}

let activeTodos = []
let activeProject = null

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
            //TODO: Render the new project todos
            let activeProject = projectList.getProjects().length - 1
            UI.renderTodos([], activeProject)
            UI.renderContentTitle(newProject.getTitle())
            break
        }
            
        case (event.target.classList.contains("cancel-project-btn")): {
            UI.renderProjects(projectList.getProjects())
            break
        }

        case (event.target.classList.contains("sidebar-project")): {
            const projectIndex = event.target.dataset.index
            const targetProject = projectList.getProjects()[projectIndex]
            activeTodos = [...targetProject.getTodos().map((todo, todoIndex) => ({todo, todoIndex, projectIndex}))]
            activeProject = projectIndex
            UI.renderTodos(activeTodos, activeProject)
            UI.renderContentTitle(targetProject.getTitle())
            break
        }
        
        case (event.target.classList.contains("add-todo")): {
            const projectIndex = event.target.dataset.projectIndex
            UI.showTodoInput(projectIndex)
            break
        }

        case event.target.classList.contains("add-todo-btn"): {
            const projectIndex = event.target.parentElement.dataset.projectIndex
            const targetProject = projectList.getProjects()[projectIndex]

            const todoTitle = document.querySelector(".todo-title-input")
            const todoDate = document.querySelector(".todo-date-input")
            const todoDescription = document.querySelector(".todo-description-input")
            const todoPriority = document.querySelector(".todo-priority-input")
            if (!todoTitle.value || !todoDate.value || !todoPriority.value) return
            const newTodo = new Todo(todoTitle.value, todoDescription.value, new Date(Date.parse(todoDate.value)), todoPriority.value, targetProject)
            if (!targetProject.addTodo(newTodo)) return
            
            // Update active todos to match the project todos
            activeTodos = [...targetProject.getTodos().map((todo, todoIndex) => ({todo, todoIndex, projectIndex}))]
            UI.renderTodos(activeTodos, activeProject)
            break
        }
            
        case (event.target.classList.contains("cancel-todo-btn")): {
            const projectIndex = event.target.parentElement.dataset.projectIndex
            UI.renderTodos(activeTodos, activeProject)
            break
        }

        case (event.target.classList.contains("toggle-todo-btn")): {
            const todoIndex = event.target.parentElement.dataset.index
            const projectIndex = event.target.parentElement.dataset.projectIndex
            const targetProject = projectList.getProjects()[projectIndex]
            const targetTodo = targetProject.getTodos()[todoIndex]
            targetTodo.toggleComplete()
            UI.renderTodos(activeTodos, activeProject)
            break
        }

        case (event.target.classList.contains("delete-todo-btn")): {
            const todoIndex = event.target.parentElement.dataset.index
            const projectIndex = event.target.parentElement.dataset.projectIndex
            const targetProject = projectList.getProjects()[projectIndex]
            if(!targetProject.removeTodo(todoIndex)) return

            // Remove from activeTodos only if a project is selected
            if (activeProject !== null) {
                activeTodos = activeTodos.filter(({ todoIndex: index, projectIndex: pIndex }) => {
                    return !(index == todoIndex && pIndex == projectIndex);
                });
            } else {
                activeTodos = [...getAllTodos()]; // Refresh the todos if in filter mode
            }

            UI.renderTodos(activeTodos, activeProject)
            break
        }

        case (event.target.classList.contains("all-tasks")): {
            activeTodos = [...getAllTodos()]
            activeProject = null
            UI.renderTodos(activeTodos, activeProject)
            UI.renderContentTitle("All tasks")
            break
        }

        case (event.target.classList.contains("today")): {
            const allTodos = getAllTodos()
            const today = new Date()
            const filteredTodos = allTodos.filter(({ todo }) => {
                return today.toDateString() === todo.getDueDate().toDateString()
            })
            activeTodos = [...filteredTodos]
            activeProject = null
            UI.renderTodos(activeTodos, activeProject)
            UI.renderContentTitle("Today")
            break
        }

        case (event.target.classList.contains("next-7-days")): {
            const allTodos = getAllTodos()
            const today = new Date()
            today.setTime(0, 0, 0, 0)

            const seventhDay = new Date()
            seventhDay.setDate(today.getDate() + 7)
            seventhDay.setHours(23, 59, 59, 999)

            const filteredTodos = allTodos.filter(({ todo }) => {
                const dueDate = todo.getDueDate()
                return today.getTime() <= dueDate.getTime() &&
                       dueDate.getTime() <= seventhDay.getTime()
            })
            activeTodos = [...filteredTodos]
            activeProject = null
            UI.renderTodos(activeTodos, activeProject)
            UI.renderContentTitle("Next 7 days")
            break
        }

    }
})