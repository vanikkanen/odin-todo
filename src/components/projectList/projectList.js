import { Project } from "../project/project"

export class ProjectList {
    constructor(projects = []) {
        this.projects = projects
    }

    getProjects() {
        return [...this.projects]
    }

    getProject(index) {
        return this.projects[index]
    }


    // Return true if adding project was succesfull, else return false
    addProject(project) {
        if (!(project instanceof Project)) return false
        this.projects.push(project)
        return true
    }

    // Return true if removing project was succesfull, else return false
    removeProject() {
        const index = this.projects.indexOf(this.selectedProject)
        if (index < 0) return false
        this.projects.splice(index, 1)
        return true
    }
}