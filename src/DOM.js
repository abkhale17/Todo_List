const container = document.getElementById("container")
const content = document.createElement("div")
content.setAttribute('id','content')
const projects = document.getElementById("projects")
const createTodo = document.getElementById("createTodo")
const todos = document.getElementById("todos")	

import Todos from './script'

const homePage = (todoList) => {

	const viewAllTodos = () => {
		var data = document.createElement('p')
		data.innerHTML = "TODOS list will appear here:"
		content.appendChild(data)
		todoList.forEach( todo => {
			let li = document.createElement('li')
			li.innerHTML = todo.title
			content.appendChild(li)
			container.appendChild(content)
		})
	}

	todos.addEventListener('click', (e) => {
		content.innerHTML = ""
		console.log('todos homepage')
		viewAllTodos()
	})

	viewAllTodos()
}


const viewProjects = (projectList) => {
	const viewAllProjects = () => {
		var data = document.createElement('p')
		data.innerHTML = "Projects will appear here:"
		content.appendChild(data)
		projectList.forEach( project => {
			let li = document.createElement('li')
			li.innerHTML = project.title
			content.appendChild(li)
			container.appendChild(content)
		})
	}

	projects.addEventListener('click', (e) => {
		content.innerHTML = ""
		viewAllProjects()
	})
}

const createNewTask = () => {

	createTodo.addEventListener('click', (e) => {
		content.innerHTML = ""
		var data = document.createElement('p')
		data.innerHTML = "Enter new Todo list detail"
		content.appendChild(data)
		var form = document.createElement('form')
		form.setAttribute('id','myForm')
		var nameAttributes = ['title', 'description', 'notes']
		for (var i = 0; i < nameAttributes.length; i++) {
			let label = document.createElement('label')
			label.innerHTML = nameAttributes[i]
			var input = document.createElement('input')
			input.setAttribute('type','text')
			input.setAttribute('name',nameAttributes[i])
			if(i == 0){
				input.setAttribute('required', true)
			}
			label.appendChild(input)
			form.appendChild(label)
			form.appendChild(document.createElement('br'))
			form.appendChild(document.createElement('br'))
		}
		var submitBtn = document.createElement('button')
		submitBtn.setAttribute('type','submit')
		submitBtn.innerHTML = 'Submit'
		submitBtn.setAttribute('id','Submit')
		form.appendChild(submitBtn)
		content.appendChild(form)
		container.appendChild(content)

		form.addEventListener('submit', (e) => {
			e.preventDefault()
			var formElems = form.elements
			let title = formElems[0].value
			let description = formElems[1].value
			let notes = formElems[2].value
			Todos(title, description, notes)
			formElems[0].value = ''
			formElems[1].value = ''
			formElems[2].value = '' 
		})
	})
}

export { createNewTask, homePage, viewProjects }