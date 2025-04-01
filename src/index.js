import "./styles.css"
import {Todo} from "./components/todo/todo"
import { Project } from "./components/project/project"

console.log("Hello World!")
let test = new Todo("test","test","test","test")
console.log(test)
test.toggleComplete()
console.log(test)
