const container = document.getElementById("container")
const content = document.getElementById("content")
const projects = document.getElementById("projects")
const createTodo = document.getElementById("createTodo")
const todos = document.getElementById("todos")	
const createProject = document.getElementById("createProject")

const moment = require('moment');
import {Todos, Project} from './script'

const today = moment()

const homePage = (todoList) => {
	const viewAllTodos = () => {
		
		if(!todoList.length) {
			var data2 = document.createElement('h1')
			data2.innerHTML = "No Tasks at this moment"
			content.appendChild(data2)
		}
		
		todoList.forEach( (todo, idx) => {
			var {title, description, notes, dueDate, priority, completion} = todo
			let due = moment(dueDate)
			var vals = [description, notes, due.format('DD MMMM, YYYY'), priority, completion]
			var headings = ['Description', 'Notes', 'DueDate', 'Priority', 'Completion']

			let div = document.createElement('div')
			let viewBtn = document.createElement('button')
			viewBtn.innerHTML = `${todo.title}`
			if(vals[4]) {
				let correctClick = document.createElement('i')
				correctClick.classList.add('fa')
				correctClick.classList.add('fa-check-circle')
				correctClick.style.float = 'left'
				viewBtn.style.textDecoration = "line-through"
				viewBtn.style.color = "grey";
				viewBtn.appendChild(correctClick)
			} else {
				let bars = document.createElement('i')
				bars.classList.add('fa')
				bars.classList.add('fa-eye')
				bars.setAttribute('aria-hidden', 'true')
				bars.style.float = 'left'
				viewBtn.appendChild(bars)
			}
			
			let font = document.createElement('i')
			font.classList.add('fa')
			font.classList.add('fa-caret-down')
			
			viewBtn.appendChild(font)
			viewBtn.setAttribute('class','todo')
			

			div.appendChild(viewBtn)

			let wrapperTodo = document.createElement('div')
			wrapperTodo.setAttribute('id',`${todo.title}Wrapper`)

			wrapperTodo.classList.add('inactive')
			let cardBody = document.createElement('div')
			cardBody.classList.add('card-body')
			var icons = ['fa-info-circle', 'fa-sticky-note', 'fa-calendar-check-o', 'fa-star', 'fa-check-square']
			for (var i = 0; i < 5; i++) {
				let card = document.createElement('div')
				let h1 = document.createElement('h1')
				let icon = document.createElement('i')
				icon.style.float = 'left'
				icon.classList.add('fa')
				icon.classList.add(icons[i])
				icon.setAttribute('aria-hidden', 'true')
				h1.textContent = `${headings[i]}`
				h1.style.padding = '20px'
				h1.style.background = '#f7f7f7'
				h1.appendChild(icon)
				let p = document.createElement('p')
				p.style.padding = '20px'
				p.textContent = `${vals[i]}`
				card.appendChild(h1)
				card.appendChild(p)
				if(i == 2) {
					let eye = document.createElement('i')
					eye.style.float = 'left'
					eye.classList.add('fa')
					eye.classList.add('fa-bullseye')
					eye.setAttribute('aria-hidden', 'true')
					let p2 = document.createElement('p')
					p2.style.padding = '20px 0'
					p2.textContent = `${due.diff(today,'days')} days remaining`
					p2.style.display = 'inline-block'
					eye.style.marginLeft = "20px"
					p2.appendChild(eye)
					card.appendChild(p2)
				}
				
				cardBody.appendChild(card)
			}
			let editBtn = document.createElement('button')
			editBtn.innerHTML = "Edit"
			editBtn.setAttribute('type','button')
			editBtn.setAttribute('class','editBtn')
			cardBody.appendChild(editBtn)

			// create Delete button 
			var deleteBtn = document.createElement('button')
			deleteBtn.setAttribute('type','button')
			deleteBtn.setAttribute('class','deleteBtn')
			deleteBtn.innerHTML = 'Delete'
			cardBody.appendChild(deleteBtn)

			//-------edit form
			let editDiv = document.createElement('div')
			editDiv.style.background = '#f7f7f7'
			editDiv.style.borderTop = '5px solid black'
			editDiv.setAttribute('id',`${todo.title}Edit`)
			editDiv.classList.add('inactive')
			editDiv.classList.add('card-body')
			editDiv.classList.add('edit')
			var data = document.createElement('p')
			data.innerHTML = `Editing ${todo.title}... `
			data.style.textAlign = 'center'
			data.style.margin = "14px 0px"

			editDiv.appendChild(data)
			var form = document.createElement('form')
			form.setAttribute('id',`${todo.title}EditForm`)
			var nameAttributes = ['Title', 'Description', 'Notes']

			// create inputs for title, description, notes
			for (var i = 0; i < nameAttributes.length; i++) {
				let label = document.createElement('label')
				label.innerHTML = nameAttributes[i]
				var input = document.createElement('input')
				input.setAttribute('type','text')
				input.setAttribute('name',nameAttributes[i])
				input.setAttribute('id',nameAttributes[i])
				if(i == 0){
					input.setAttribute('required', true)
					input.setAttribute('maxlength', '15')
				}
				label.appendChild(input)
				form.appendChild(label)
				form.appendChild(document.createElement('br'))
				form.appendChild(document.createElement('br'))
			}


			let completionStatus = document.createElement('label')
			completionStatus.innerHTML = "Completed? "
			var checkbox = document.createElement("input");
			checkbox.setAttribute("type", "checkbox");
			completionStatus.appendChild(checkbox)
			form.appendChild(completionStatus);
			form.appendChild(document.createElement('br'))
			form.appendChild(document.createElement('br'))

			// create Update button 
			var updateBtn = document.createElement('button')
			updateBtn.setAttribute('type','submit')
			updateBtn.innerHTML = 'Update'
			updateBtn.setAttribute('class', `update`)
			form.appendChild(updateBtn)

			// create cancel button 
			var cancelBtn = document.createElement('button')
			cancelBtn.setAttribute('type','button')
			cancelBtn.innerHTML = 'Cancel'
			cancelBtn.setAttribute('class', `cancel`)
			form.appendChild(cancelBtn)

			var formElems = form.elements
			formElems[0].value = todo.title
			formElems[1].value =  todo.description
			formElems[2].value = todo.notes
			formElems[3].checked = todo.completion
			editDiv.appendChild(form)
			wrapperTodo.appendChild(cardBody)
			wrapperTodo.appendChild(editDiv)

			div.appendChild(wrapperTodo)
			content.appendChild(div)
			content.appendChild(document.createElement('br'))
			// container.appendChild(content)



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
				let ed_cls = ed.getAttribute('class')
				let arr = ed_cls.split(" ")
				console.log(arr.includes('active'))
				if(arr.includes('active')){
					ed.classList.remove('active')
					ed.classList.add('inactive')
				} else {
					ed.classList.remove('inactive')
					ed.classList.add('active')
				}
			})

			cancelBtn.addEventListener('click', (e) => {
				let ed = document.getElementById(`${todo.title}Edit`)
				ed.classList.remove('active')
				ed.classList.add('inactive')
			})

			const logUpdate = (e) => {
				e.preventDefault()
				var formElems = form.elements
				todo.title =  formElems[0].value
				todo.description =  formElems[1].value
				todo.notes =  formElems[2].value
				todo.completion =  formElems[3].checked
				todos.click()
			}

			const logDelete = (e) => {
				e.preventDefault();
				todoList.splice(idx, 1)
				todos.click();
			}

			updateBtn.addEventListener('click', logUpdate)

			deleteBtn.addEventListener('click', logDelete)

			todos.addEventListener('click', (e) => {
				content.innerHTML = ""
				viewAllTodos()
			})
		})
	}
	viewAllTodos()
}


const viewProjects = (projectList) => {
	const viewAllProjects = () => {
		projectList.forEach( project => {
			let div = document.createElement('div')
			div.classList.add('card-body')
			div.classList.add('projects')
			let ul = document.createElement('ul')
			let li = document.createElement('li')
			li.innerHTML = project.title
			li.classList.add('titleProject')
			ul.appendChild(li)
			if(!project.todosList.length) {
				let p = document.createElement('p')
				p.innerHTML = `No Todos associated with project ${project.title}`
				p.style.marginTop = '2%'
				p.style.fontWeight = '299'
				ul.appendChild(p)
			} else {
				let innerul = document.createElement('ul')
				innerul.classList.add('todoLi')
				project.todosList.sort((todo1, todo2) => todo1.priority - todo2.priority) // sort todos priority wise
				for (var i = 0; i < project.todosList.length; i++) {
					var divLi = document.createElement('div')
					divLi.classList.add('divLi')
					divLi.style.paddingLeft = '0px'
					divLi.style.marginBottom = "20px"
					let innerli1 = document.createElement('li')
					let innerli2 = document.createElement('li')
					innerli1.innerHTML =` ${project.todosList[i].title}`
					var opacity
					var priority = project.todosList[i].priority
					if(priority === 1){
						opacity = 1
					} else if ( priority === 2) {
						opacity = 0.7
					} else {
						opacity = 0.4
					}
					innerli1.style.opacity = opacity
					innerli2.style.opacity = opacity
					let due = moment(project.todosList[i].dueDate)
					console.log(due)
					innerli2.innerHTML = `${due.format('YYYY-MM-DD')}`
					innerli2.style.float = 'right'
					divLi.appendChild(innerli1)
					divLi.appendChild(innerli2)
					ul.appendChild(divLi)
				}
				
			}
			div.appendChild(ul)
			content.appendChild(div)
		})
		
		// container.appendChild(content)
	}

	projects.addEventListener('click', (e) => {
		content.innerHTML = ""
		viewAllProjects()
	})
}

const createNewTask = (projectList) => {

	const createForm = () => {

		content.innerHTML = ""
		var form = document.createElement('form')
		form.setAttribute('id','myForm')
		var nameAttributes = ['Title', 'Description', 'Notes']

		// create inputs for title, description, notes
		for (var i = 0; i < nameAttributes.length; i++) {
			let label = document.createElement('label')
			label.innerHTML = nameAttributes[i]
			var input = document.createElement('input')
			input.setAttribute('type','text')
			label.setAttribute('for', nameAttributes[i])
			input.setAttribute('id',nameAttributes[i])
			if(i == 0){
				input.setAttribute('required', true)
				input.setAttribute('maxlength', '15')
			}
			
			form.appendChild(label)
			form.appendChild(document.createElement('br'))
			form.appendChild(input)
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
			// priorityDiv.appendChild(document.createElement('br'))
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
		// container.appendChild(content)

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

	createTodo.addEventListener('click', createForm)
}

const createNewProject = () => {
	createProject.addEventListener('click', (e) => {
		content.innerHTML = ""
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
		// container.appendChild(content)

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