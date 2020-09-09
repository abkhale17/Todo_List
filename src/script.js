import {createNewTask, homePage, viewProjects} from "./DOM"

const AddTodoList = (() => {
	var todosList = [], defaultProject = []

	const addTask = (todo) => {
		todosList.push(todo)
		defaultProject.push(todo)
	}

	const fetchTodos = () => {
		homePage(todosList)
	}
	return {addTask, fetchTodos}
})()

const Todos = (title, description, notes, dueDate, priority = false, completion = false) => {
	let todo = {title, description, dueDate, priority, notes, completion}
	AddTodoList.addTask(todo)
	ProjectList.chooseProject(todo)
}


const ProjectList = (() => {
	var projects = []

	const chooseProject = (todo) => {
		var index = Math.floor(Math.random() * projects.length) // temporary, redundant code line
		projects[index].todosList.push(todo)
	}

	const createProject = (project) => {
		projects.push(project)
	}

	const fetchProjects = () => {
		viewProjects(projects)
	}
	return {createProject, chooseProject, fetchProjects}
})()

const Project = (title) => ProjectList.createProject({ title , todosList : []})

Project("study")
Project("Tour")
Project("Food")

Todos('a','b','c','d','e')
Todos('m','b','c','d','e')

const setTodosCompletion = (todo) => {
	todo.completion = !todo.completion
	// render page to view change
}

const changePriority = (todo) => {
	todo.priority = !todo.priority
	// render page to view change
}	

createNewTask();
AddTodoList.fetchTodos()
ProjectList.fetchProjects()
export default Todos
