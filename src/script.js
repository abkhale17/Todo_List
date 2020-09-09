const AddTodoList = (() => {
	var todosList = [], defaultProject = []

	const addTask = (todo) => {
		todosList.push(todo)
		defaultProject.push(todo)
	}
	return {addTask}
})()

const Todos = (title, description, dueDate, priority, notes) => {
	let todo = {title, description, dueDate, priority, notes}
	AddTodoList.addTask(todo)
	ProjectList.chooseProject(todo)
}


const ProjectList = (() => {
	var projects = []

	const chooseProject = (todo) => {
		var index = Math.floor(Math.random() * projects.length)
		console.log(index)
		projects[index].todosList.push(todo)
		console.log(projects)
	}

	const createProject = (project) => {
		projects.push(project)
	}
	return {createProject, chooseProject}
})()

const Project = (title) => ProjectList.createProject({ title , todosList : []})

Project("study")
Project("Tour")
Project("Food")

Todos('a','b','c','d','e')
Todos('m','b','c','d','e')
