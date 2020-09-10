const container = document.getElementById("container")
const content = document.createElement("div")
content.setAttribute('id','content')
const projects = document.getElementById("projects")
const createTodo = document.getElementById("createTodo")
const todos = document.getElementById("todos")	
const createProject = document.getElementById("createProject")

import {Todos, Project} from './script'

const homePage = (todoList) => {

	const viewAllTodos = () => {
		var data = document.createElement('p')
		data.innerHTML = "TODOS list will appear here:"
		content.appendChild(data)
		todoList.forEach( todo => {
			var {title, description, notes, dueDate, priority, completion} = todo
			var vals = [title, description, notes, dueDate, priority, completion]
			var headings = ['title', 'description', 'notes', 'dueDate', 'priority', 'completion']
			for (var i = 0; i < 5; i++) {
				let li = document.createElement('li')
				li.innerHTML = `${headings[i]} : ${vals[i]}`
				content.appendChild(li)
			}

			content.appendChild(document.createElement('br'))
			container.appendChild(content)

		})
	}

	todos.addEventListener('click', (e) => {
		content.innerHTML = ""
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
			console.log(project)
			let ul = document.createElement('ul')
			let li = document.createElement('li')
			li.innerHTML = project.title
			ul.appendChild(li)
			if(!project.todosList.length) {
				let p = document.createElement('p')
				p.innerHTML = `No Todos associated with project ${project.title}`
				ul.appendChild(p)
			} else {
				let innerul = document.createElement('ul')
				for (var i = 0; i < project.todosList.length; i++) {
					let innerli = document.createElement('li')
					innerli.innerHTML = `${project.todosList[i].title} *dueDate: ${project.todosList[i].dueDate}`
					innerul.appendChild(innerli)
				}
			ul.appendChild(innerul)
			}
			content.appendChild(ul)
		})
		
		container.appendChild(content)
	}

	projects.addEventListener('click', (e) => {
		content.innerHTML = ""
		viewAllProjects()
	})
}

const createNewTask = (projectList) => {

	createTodo.addEventListener('click', (e) => {
		content.innerHTML = ""
		var data = document.createElement('p')
		data.innerHTML = "Enter new Todo list detail"
		content.appendChild(data)
		var form = document.createElement('form')
		form.setAttribute('id','myForm')
		var nameAttributes = ['title', 'description', 'notes']

		// create inputs for title, description, notes
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

		// due date as a Date() Object
		let label = document.createElement('label')
		label.innerHTML = "Due Date  "
		var d = document.createElement("input");
		d.setAttribute('required', true)
		d.setAttribute("type", "date");
		d.setAttribute("value", "dd-mm-yyyy");
		label.appendChild(d)
		form.appendChild(label);
		form.appendChild(document.createElement('br'))
		form.appendChild(document.createElement('br'))

		// checkbox for priority. mark checked as a Important
		let labelcheck = document.createElement('label')
		labelcheck.innerHTML = "Priority"
		var checkbox = document.createElement("input");
		checkbox.setAttribute("type", "checkbox");
		checkbox.setAttribute("value", "dd-mm-yyyy");
		labelcheck.appendChild(checkbox)
		form.appendChild(labelcheck);
		form.appendChild(document.createElement('br'))
		form.appendChild(document.createElement('br'))

		// checkbox for completion status. mark checked for a Completed task!
		let completion = document.createElement('label')
		completion.innerHTML = "Completed? "
		var checkbox = document.createElement("input");
		checkbox.setAttribute("type", "checkbox");
		completion.appendChild(checkbox)
		form.appendChild(completion);
		form.appendChild(document.createElement('br'))
		form.appendChild(document.createElement('br'))

		// choose a project associated with this todo.
		let labelChoose = document.createElement('label')
		labelChoose.innerHTML = "Choose associated Project: "
		let select = document.createElement('select')
		select.setAttribute('id',"selectProject")
		for (var i = 0; i < projectList.length; i++) {
			let opt = document.createElement('option')
			opt.innerHTML = projectList[i].title
			select.appendChild(opt)
		}
		labelChoose.appendChild(select)
		form.appendChild(labelChoose)
		form.appendChild(document.createElement('br'))
		form.appendChild(document.createElement('br'))

		// create Submit button 
		var submitBtn = document.createElement('button')
		submitBtn.setAttribute('type','submit')
		submitBtn.innerHTML = 'Submit'
		submitBtn.setAttribute('id','Submit')
		form.appendChild(submitBtn)
		content.appendChild(form)
		container.appendChild(content)

		//Listen to Submit action func
		const logSubmit = (e) => {
			e.preventDefault()
			var formElems = form.elements
			let title = formElems[0].value
			let description = formElems[1].value
			let notes = formElems[2].value
			let due = formElems[3].value
			let priority = formElems[4].checked
			let completionStat = formElems[5].checked
			let elem = formElems[6]
			let associatedProject = projectList[elem.selectedIndex]
			var today = new Date();
			var dueDate = new Date(due)
			if(dueDate.getTime() < today.getTime()) {
				alert("Due date should be greater than todays date")
			} else {
				console.log({dueDate})
				Todos(title, description, notes, dueDate, priority, completionStat, associatedProject)
				formElems[0].value = ''
				formElems[1].value = ''
				formElems[2].value = '' 
				formElems[3].value = ''
				formElems[4].checked = false
				formElems[5].checked = false
				todos.click()
			}
		}

		// add submit eventlistener on Form
		form.addEventListener('submit', logSubmit )
	})
}

const createNewProject = () => {
	createProject.addEventListener('click', (e) => {
		content.innerHTML = ""
		var data = document.createElement('p')
		data.innerHTML = "Enter new Project detail"
		content.appendChild(data)
		var form = document.createElement('form')
		form.setAttribute('id','myForm')

		let label = document.createElement('label')
		label.innerHTML = "Project Title"
		var input = document.createElement('input')
		input.setAttribute('type','text')
		input.setAttribute('name','projectTitle')
		input.setAttribute('required', true)
		label.appendChild(input)
		form.appendChild(label)
		form.appendChild(document.createElement('br'))
		form.appendChild(document.createElement('br'))

		// create Submit button 
		var submitBtn = document.createElement('button')
		submitBtn.setAttribute('type','submit')
		submitBtn.innerHTML = 'Submit'
		submitBtn.setAttribute('id','Submit')
		form.appendChild(submitBtn)
		content.appendChild(form)
		container.appendChild(content)

		//Listen to Submit action func
		const logSubmit = (e) => {
			e.preventDefault()
			var formElems = form.elements
			let projectTitle = formElems[0].value
			Project(projectTitle)
			formElems[0].value = ''
			projects.click()
		}

		// add submit eventlistener on Form
		form.addEventListener('submit', logSubmit )

	})
}

export { createNewTask, homePage, viewProjects, createNewProject }