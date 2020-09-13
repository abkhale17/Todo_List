import {createNewTask, homePage, viewProjects, createNewProject} from "./DOM"

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

const Todos = (title, description, notes, dueDate, priority = 3, completion = false, associatedProject) => {
	let todo = {title, description, dueDate, priority, notes, completion, associatedProject}
	AddTodoList.addTask(todo)
	ProjectList.chooseProject(todo, associatedProject)
}


const ProjectList = (() => {
	var projects = [], idx = 0;

	const chooseProject = (todo, associatedProject) => {
		associatedProject.todosList.push(todo)
	}

	const createProject = (project) => {
		project.index = idx
		idx += 1;
		projects.push(project)
		return project
	}

	const fetchProjects = () => {
		viewProjects(projects)
		createNewTask(projects)
	}
	return {createProject, chooseProject, fetchProjects}
})()

const Project = (title) => ProjectList.createProject({ title , todosList : [] })

var p1 = Project("study")
var p2 = Project("Tour")
var p3 = Project("Food")

var d1 = new Date('2021-10-06')
var d2 = new Date('2021-12-05')
Todos('todo1', 'description', 'notes', d1, 2, false, p1)
Todos('todo2', 'description2', 'notes2', d2, 1, true, p2)

const toggleCompletion = (todo) => {
	todo.completion = !todo.completion
	// render page to view change
}

const togglePriority = (todo) => {
	todo.priority = !todo.priority
	// render page to view change
}	

createNewProject()
AddTodoList.fetchTodos()
ProjectList.fetchProjects()
export {Todos, Project}
