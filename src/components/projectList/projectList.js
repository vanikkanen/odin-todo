import { Project } from "../project/project"

export class ProjectList {
    constructor(projects = []) {
        this.projects = projects
    }

    // Return true if adding project was succesfull, else return false
    addProject(project) {
        if (!project instanceof Project) return false
        this.projects.push(project)
        return true
    }

    // Return true if removing project was succesfull, else return false
    removeProject(index) {
        if (index < 0 || index >= this.projects.length) return false
        this.projects.splice(index, 1)
        return true
    }
}