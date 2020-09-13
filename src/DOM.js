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
		if(!todoList.length) {
			var data2 = document.createElement('p')
			data2.innerHTML = "No Tasks at this moment"
			content.appendChild(data2)
		}
		
		todoList.forEach( (todo, idx) => {
			var {title, description, notes, dueDate, priority, completion} = todo
			var vals = [description, notes, dueDate, priority, completion]
			var headings = ['description', 'notes', 'dueDate', 'priority', 'completion']

			let div = document.createElement('div')
			let viewBtn = document.createElement('button')
			viewBtn.innerHTML = `${todo.title}`
			div.appendChild(viewBtn)

			let wrapperTodo = document.createElement('div')
			wrapperTodo.setAttribute('id',`${todo.title}Wrapper`)
			wrapperTodo.classList.add('inactive')
			let infoDiv = document.createElement('div')

			for (var i = 0; i < 5; i++) {
				let li = document.createElement('li')
				li.innerHTML = `${vals[i]}`
				infoDiv.appendChild(li)
			}
			let editBtn = document.createElement('button')
			editBtn.innerHTML = "Edit"
			editBtn.setAttribute('type','button')
			infoDiv.appendChild(editBtn)

			// create Delete button 
			var deleteBtn = document.createElement('button')
			deleteBtn.setAttribute('type','button')
			deleteBtn.innerHTML = 'Delete'
			infoDiv.appendChild(deleteBtn)

			//-------edit form
			let editDiv = document.createElement('div')
			editDiv.setAttribute('id',`${todo.title}Edit`)
			editDiv.classList.add('inactive')
			var data = document.createElement('p')
			data.innerHTML = `Editing ${todo.title} `
			editDiv.appendChild(data)
			var form = document.createElement('form')
			form.setAttribute('id',`${todo.title}EditForm`)
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

			// create Update button 
			var updateBtn = document.createElement('button')
			updateBtn.setAttribute('type','submit')
			updateBtn.innerHTML = 'Update'
			updateBtn.setAttribute('id', `${todo.title}update`)
			form.appendChild(updateBtn)

			var formElems = form.elements
			formElems[0].value = todo.title
			formElems[1].value =  todo.description
			formElems[2].value = todo.notes

			editDiv.appendChild(form)
			wrapperTodo.appendChild(infoDiv)
			wrapperTodo.appendChild(editDiv)

			div.appendChild(wrapperTodo)
			content.appendChild(div)
			content.appendChild(document.createElement('br'))
			container.appendChild(content)


			viewBtn.addEventListener('click', (e) => {
				let wd = document.getElementById(`${todo.title}Wrapper`)
				let ed = document.getElementById(`${todo.title}Edit`)
				let wd_curCls = wd.getAttribute('class')
				let ed_curCls = ed.getAttribute('class')
				if(wd_curCls === 'active'){
					wd.classList.remove('active')
					wd.classList.add('inactive')
				} else {
					wd.classList.remove('inactive')
					wd.classList.add('active')
				}
				if(ed_curCls === 'active'){
					ed.classList.remove('active')
					ed.classList.add('inactive')
				}
			})

			editBtn.addEventListener('click', (e) => {
				let ed = document.getElementById(`${todo.title}Edit`)
				if(ed === 'active'){
					ed.classList.remove('active')
					ed.classList.add('inactive')
				} else {
					ed.classList.remove('inactive')
					ed.classList.add('active')
				}
			})

			const logUpdate = (e) => {
				e.preventDefault()
				var formElems = form.elements
				todo.title =  formElems[0].value
				todo.description =  formElems[1].value
				todo.notes =  formElems[2].value
				todos.click()
			}

			const logDelete = (e) => {
				e.preventDefault();
				todoList.splice(idx, 1)
				todos.click();
			}

			updateBtn.addEventListener('click', logUpdate)

			deleteBtn.addEventListener('click', logDelete)
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
				project.todosList.sort((todo1, todo2) => todo1.priority - todo2.priority) // sort todos priority wise
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

	const createForm = () => {

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
		label.appendChild(d)
		form.appendChild(label);
		form.appendChild(document.createElement('br'))
		form.appendChild(document.createElement('br'))

		let priorityDiv = document.createElement('div')
		priorityDiv.innerHTML = " Select Priority Level: "
		priorityDiv.appendChild(document.createElement('br'))
		let labels = ['Very Important', 'Important', 'Not Important']
		for (var i = 1; i < 4; i++) {
			let r = document.createElement('input')
			r.setAttribute('type','radio')
			r.setAttribute('id',`r${i}`)
			r.setAttribute('name','a')
			r.setAttribute('value',labels[i-1])
			var l = document.createElement('label')
			l.setAttribute('for',`r${i}`)
			l.innerHTML = labels[i-1]
			priorityDiv.appendChild(r)
			priorityDiv.appendChild(l)
			priorityDiv.appendChild(document.createElement('br'))
		}

		form.appendChild(priorityDiv)
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
			let s1 = document.getElementById('r1')
			let s2 = document.getElementById('r2')
			let s3 = document.getElementById('r3')
			let s = [s1, s2, s3]
			var radioChecked = [s1.checked, s2.checked, s3.checked]
			let priority = radioChecked.indexOf(true) + 1
			let completionStat = formElems[7].checked
			let elem = formElems[8]
			let associatedProject = projectList[elem.selectedIndex]
			var today = new Date();
			var dueDate = new Date(due)
			if(dueDate.getTime() < today.getTime()) {
				alert("Due date should be greater than todays date")
			} else {
				Todos(title, description, notes, dueDate, priority, completionStat, associatedProject)
				todos.click()
			}
		}

		// add submit eventlistener on Form
		form.addEventListener('submit', logSubmit )
	}

	createTodo.addEventListener('click', (e) => createForm())

	return {createForm}
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