import {createNewTask, homePage, viewProjects, createNewProject} from "./DOM"


// const today = moment();
// console.log(today.format());

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

var p1 = Project("Study")
var p2 = Project("Tour")
var p3 = Project("Food")
var p4 = Project("Movies")
var p5 = Project("Health")

var d1 = new Date('2020-10-06')
var d2 = new Date('2021-12-05')
var d3 = new Date('2020-11-16')
var d4 = new Date('2020-12-05')
var d5 = new Date('2020-12-29')
Todos('Watch TeneT', 'Time...Reverse...Recursion...', "Nolan's big fan,Yo", d2, 1, false, p4)
Todos('Event @ IITB', 'description2', 'notes2', d2, 1, false, p1)
Todos('Daily Walk', 'For good and healthy Life!', '01. Daily routine', d2, 1, true, p5)
Todos('Task To Do 01', 'description', 'notes', d1, 2, false, p1)
Todos('Shopping', 'description', 'On weekends', d1, 2, true, p1)
Todos('The History of Time', 'Great book', 'Daily reminder', d1, 3, true, p1)


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
