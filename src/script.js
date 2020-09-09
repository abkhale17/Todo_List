const addTodoList = (() => {
	var todosList = [], defaultProject = []

	const addTask = (todo) => {
		todosList.push(todo)
	}
	return {addTask}
})()

const todos = (title, description, dueDate, priority, notes) => {
	let todo = {}
	todo.title = title;
	todo.description = description;
	todo.dueDate = dueDate;
	todo.priority = priority;
	todo.notes = notes;

	return todo

}

var newTask = todos('a','b','c','d','e')
addTodoList.addTask(newTask)

var newTask2 = todos('m','b','c','d','e')
addTodoList.addTask(newTask2)
