import { UI } from "./UI"
import { Project } from "./components/project/project"
import { ProjectList } from "./components/projectList/projectList"
import { Todo } from "./components/todo/todo"


export class Controller {
    static #projectList
    static #activeProject
    static #activeTodos

    static init() {
        // Load data from localStorage
        this.#loadFromStorage()

        // Load user to overview of all todos
        this.#activeTodos = [...this.#getAllTodos()]
        this.#activeProject = null
        UI.renderContentTitle("All tasks")
        UI.renderTodos(this.#activeTodos, this.#activeProject)
        UI.renderProjects(this.#projectList.getProjects())
        this.#addEventListeners()
    }

    static #loadFromStorage() {

        const raw = JSON.parse(localStorage.getItem("projectList"))
        if (raw === null) return new ProjectList()
        const loadedProjects = raw.projects.map(project => {
            const title = project.title
            const todos = project.todos.map(todo => {
                return new Todo(todo.title, todo.description, new Date(Date.parse(todo.dueDate)), todo.priority, todo.complete)
            })
            return new Project(title, todos)
        })

        this.#projectList = new ProjectList(loadedProjects)  
    }

    static #getAllTodos() {
        const projects = this.#projectList.getProjects()
        const todos = []
        projects.forEach((project, projectIndex) => {
            project.getTodos().forEach((todo, todoIndex) => {
                todos.push({todo, todoIndex, projectIndex})
            })
        })
        return todos
    }

    static #saveToLocalStorage() {
        localStorage.setItem("projectList", JSON.stringify(this.#projectList))
    }

    static #addEventListeners() {
        document.addEventListener("click", (event) => {

            switch (true) {
                  
                  case event.target.classList.contains("add-project"): {
                      UI.showProjectInput()
                      break
                  }
          
                  case event.target.classList.contains("add-project-btn"):{
                      const input = document.querySelector(".project-input")
                      if (!input.value) return
                      const newProject = new Project(input.value)
                      if (!this.#projectList.addProject(newProject)) return
                      UI.renderProjects(this.#projectList.getProjects())
                      this.#activeProject = this.#projectList.getProjects().length - 1
                      UI.renderTodos([], this.#activeProject)
                      UI.renderContentTitle(newProject.getTitle())
                      break
                  }
                      
                  case (event.target.classList.contains("cancel-project-btn")): {
                      UI.renderProjects(this.#projectList.getProjects())
                      break
                  }
          
                  case (event.target.classList.contains("sidebar-project")): {
                      const projectIndex = event.target.dataset.index
                      const targetProject = this.#projectList.getProjects()[projectIndex]
                      this.#activeTodos = [...targetProject.getTodos().map((todo, todoIndex) => ({todo, todoIndex, projectIndex}))]
                      this.#activeProject = +projectIndex
                      UI.renderTodos(this.#activeTodos, this.#activeProject)
                      UI.renderContentTitle(targetProject.getTitle())
                      break
                  }
                  
                  case (!!event.target.closest(".delete-project-btn")): {
                      const deleteBtn = event.target.closest(".delete-project-btn");
                      const projectElement = deleteBtn.closest(".sidebar-project");
                      const projectIndex = +projectElement.dataset.index
                      if (!projectList.removeProject(projectIndex)) return
                      
                      // If active project was deleted, reset everything
                      if (this.#activeProject === projectIndex) {
                          this.#activeProject = null
                          this.#activeTodos = []
                          UI.renderContentTitle("")
                      } 
                      UI.renderProjects(this.#projectList.getProjects())
                      UI.renderTodos(this.#activeTodos, this.#activeProject)
                      break
                  }
          
                  case (event.target.classList.contains("add-todo")): {
                      const projectIndex = event.target.dataset.projectIndex
                      UI.showTodoInput(projectIndex)
                      break
                  }
          
                  case event.target.classList.contains("add-todo-btn"): {
                      const projectIndex = event.target.parentElement.parentElement.dataset.projectIndex
                      const targetProject = this.#projectList.getProjects()[projectIndex]
          
                      const todoTitle = document.querySelector(".todo-title-input")
                      const todoDate = document.querySelector(".todo-date-input")
                      const todoDescription = document.querySelector(".todo-description-input")
                      const todoPriority = document.querySelector(".todo-priority-input")
                      if (!todoTitle.value || !todoDate.value || !todoPriority.value) return
                      const newTodo = new Todo(todoTitle.value, todoDescription.value, new Date(Date.parse(todoDate.value)), todoPriority.value)
                      if (!targetProject.addTodo(newTodo)) return
                      
                      // Update active todos to match the project todos
                      this.#activeTodos = [...targetProject.getTodos().map((todo, todoIndex) => ({todo, todoIndex, projectIndex}))]
                      UI.renderTodos(this.#activeTodos, this.#activeProject)
                      break
                  }
                      
                  case (event.target.classList.contains("cancel-todo-btn")): {
                      UI.renderTodos(this.#activeTodos, this.#activeProject)
                      break
                  }
          
                  case (!!event.target.closest(".toggle-todo-btn")): {
                      const toggleBtn = event.target.closest(".toggle-todo-btn");
                      const todoElement = toggleBtn.closest(".todo-item");
                      const todoIndex = todoElement.dataset.index
                      const projectIndex = todoElement.dataset.projectIndex
                      const targetProject = this.#projectList.getProjects()[projectIndex]
                      const targetTodo = targetProject.getTodos()[todoIndex]
                      targetTodo.toggleComplete()
                      UI.renderTodos(this.#activeTodos, this.#activeProject)
                      break
                  }
          
                  case (!!event.target.closest(".delete-todo-btn")): {
                      const deleteBtn = event.target.closest(".delete-todo-btn");
                      const todoElement = deleteBtn.closest(".todo-item");
                      const todoIndex = todoElement.dataset.index
                      const projectIndex = todoElement.dataset.projectIndex
                      const targetProject = this.#projectList.getProjects()[projectIndex]
                      if(!targetProject.removeTodo(todoIndex)) return
          
                      // Remove from activeTodos only if a project is selected
                      if (this.#activeProject !== null) {
                        this.#activeTodos = this.#activeTodos.filter(({ todoIndex: index, projectIndex: pIndex }) => {
                              return !(index == todoIndex && pIndex == projectIndex);
                          });
                      } else {
                        this.#activeTodos = [...getAllTodos()]; // Refresh the todos if in filter mode
                      }
          
                      UI.renderTodos(this.#activeTodos, this.#activeProject)
                      break
                  }
          
                  case (!!(event.target.closest(".basic-todo-content") || event.target.classList.contains("todo-item")) && !event.target.classList.contains("todo-input")): {
                      const todoElement = event.target.closest(".todo-item")
                      const todoIndex = todoElement.dataset.index
                      const projectIndex = todoElement.dataset.projectIndex
                      const targetProject = this.#projectList.getProjects()[projectIndex]
                      const targetTodo = targetProject.getTodos()[todoIndex]
                      if (targetTodo.getDescription() === "") return
                      targetTodo.toggleExpand()
                      UI.renderTodos(this.#activeTodos, this.#activeProject)
                      break
                  }
          
                  case (event.target.classList.contains("all-tasks")): {
                      this.#activeTodos = [...this.#getAllTodos()]
                      this.#activeProject = null
                      UI.renderTodos(this.#activeTodos, this.#activeProject)
                      UI.renderContentTitle("All tasks")
                      break
                  }
          
                  case (event.target.classList.contains("today")): {
                      const allTodos = this.#getAllTodos()
                      const today = new Date()
                      const filteredTodos = allTodos.filter(({ todo }) => {
                          return today.toDateString() === todo.getDueDate().toDateString()
                      })
                      this.#activeTodos = [...filteredTodos]
                      this.#activeProject = null
                      UI.renderTodos(this.#activeTodos, this.#activeProject)
                      UI.renderContentTitle("Today")
                      break
                  }
          
                  case (event.target.classList.contains("next-7-days")): {
                      const allTodos = this.#getAllTodos()
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
          
                      const seventhDay = new Date()
                      seventhDay.setDate(today.getDate() + 7)
                      seventhDay.setHours(23, 59, 59, 999)
          
                      const filteredTodos = allTodos.filter(({ todo }) => {
                          const dueDate = todo.getDueDate()
                          return today.getTime() <= dueDate.getTime() &&
                                 dueDate.getTime() <= seventhDay.getTime()
                      })
                      this.#activeTodos = [...filteredTodos]
                      this.#activeProject = null
                      UI.renderTodos(this.#activeTodos, this.#activeProject)
                      UI.renderContentTitle("Next 7 days")
                      break
                  }
              }
              this.#saveToLocalStorage()
          })
    }
}

