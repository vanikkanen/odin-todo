import "./styles.css"
import {Todo} from "./components/todo/todo"
import { Project } from "./components/project/project"

console.log("Hello World!")
let test = new Todo("test","test","test","test")
console.log(test)
test.toggleComplete()
console.log(test)

let pro = new Project("test", [test])
console.log(pro)
pro.addTodo(new Todo("test2","test2","test2","test2"))
console.log(pro)
pro.removeTodo(1)
console.log(pro)