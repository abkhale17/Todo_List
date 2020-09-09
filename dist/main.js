/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/*! exports provided: createNewTask, homePage, viewProjects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createNewTask\", function() { return createNewTask; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"homePage\", function() { return homePage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"viewProjects\", function() { return viewProjects; });\n/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script */ \"./src/script.js\");\nconst container = document.getElementById(\"container\")\nconst content = document.createElement(\"div\")\ncontent.setAttribute('id','content')\nconst projects = document.getElementById(\"projects\")\nconst createTodo = document.getElementById(\"createTodo\")\nconst todos = document.getElementById(\"todos\")\t\n\n\n\nconst homePage = (todoList) => {\n\n\tconst viewAllTodos = () => {\n\t\tvar data = document.createElement('p')\n\t\tdata.innerHTML = \"TODOS list will appear here:\"\n\t\tcontent.appendChild(data)\n\t\ttodoList.forEach( todo => {\n\t\t\tvar {title, description, notes, dueDate, priority, completion} = todo\n\t\t\tvar vals = [title, description, notes, dueDate, priority, completion]\n\t\t\tvar headings = ['title', 'description', 'notes', 'dueDate', 'priority', 'completion']\n\t\t\tfor (var i = 0; i < 5; i++) {\n\t\t\t\tlet li = document.createElement('li')\n\t\t\t\tli.innerHTML = `${headings[i]} : ${vals[i]}`\n\t\t\t\tcontent.appendChild(li)\n\t\t\t}\n\n\t\t\tcontent.appendChild(document.createElement('br'))\n\t\t\tcontainer.appendChild(content)\n\n\t\t})\n\t}\n\n\ttodos.addEventListener('click', (e) => {\n\t\tcontent.innerHTML = \"\"\n\t\tviewAllTodos()\n\t})\n\n\tviewAllTodos()\n}\n\n\nconst viewProjects = (projectList) => {\n\tconst viewAllProjects = () => {\n\t\tvar data = document.createElement('p')\n\t\tdata.innerHTML = \"Projects will appear here:\"\n\t\tcontent.appendChild(data)\n\t\tprojectList.forEach( project => {\n\t\t\tlet li = document.createElement('li')\n\t\t\tli.innerHTML = project.title\n\t\t\tcontent.appendChild(li)\n\t\t\tcontainer.appendChild(content)\n\t\t})\n\t}\n\n\tprojects.addEventListener('click', (e) => {\n\t\tcontent.innerHTML = \"\"\n\t\tviewAllProjects()\n\t})\n}\n\nconst createNewTask = () => {\n\n\tcreateTodo.addEventListener('click', (e) => {\n\t\tcontent.innerHTML = \"\"\n\t\tvar data = document.createElement('p')\n\t\tdata.innerHTML = \"Enter new Todo list detail\"\n\t\tcontent.appendChild(data)\n\t\tvar form = document.createElement('form')\n\t\tform.setAttribute('id','myForm')\n\t\tvar nameAttributes = ['title', 'description', 'notes']\n\n\t\t// create inputs for title, description, notes\n\t\tfor (var i = 0; i < nameAttributes.length; i++) {\n\t\t\tlet label = document.createElement('label')\n\t\t\tlabel.innerHTML = nameAttributes[i]\n\t\t\tvar input = document.createElement('input')\n\t\t\tinput.setAttribute('type','text')\n\t\t\tinput.setAttribute('name',nameAttributes[i])\n\t\t\tif(i == 0){\n\t\t\t\tinput.setAttribute('required', true)\n\t\t\t}\n\t\t\tlabel.appendChild(input)\n\t\t\tform.appendChild(label)\n\t\t\tform.appendChild(document.createElement('br'))\n\t\t\tform.appendChild(document.createElement('br'))\n\t\t}\n\n\t\t// due date as a Date() Object\n\t\tlet label = document.createElement('label')\n\t\tlabel.innerHTML = \"Due Date  \"\n\t\tvar d = document.createElement(\"input\");\n\t\td.setAttribute('required', true)\n\t\td.setAttribute(\"type\", \"date\");\n\t\td.setAttribute(\"value\", \"dd-mm-yyyy\");\n\t\tlabel.appendChild(d)\n\t\tform.appendChild(label);\n\t\tform.appendChild(document.createElement('br'))\n\t\tform.appendChild(document.createElement('br'))\n\n\t\t// checkbox for priority. mark checked as a Important\n\t\tlet labelcheck = document.createElement('label')\n\t\tlabelcheck.innerHTML = \"Priority\"\n\t\tvar checkbox = document.createElement(\"input\");\n\t\tcheckbox.setAttribute(\"type\", \"checkbox\");\n\t\tcheckbox.setAttribute(\"value\", \"dd-mm-yyyy\");\n\t\tlabelcheck.appendChild(checkbox)\n\t\tform.appendChild(labelcheck);\n\t\tform.appendChild(document.createElement('br'))\n\t\tform.appendChild(document.createElement('br'))\n\n\t\t// checkbox for completion status. mark checked for a Completed task!\n\t\tlet completion = document.createElement('label')\n\t\tcompletion.innerHTML = \"Completed? \"\n\t\tvar checkbox = document.createElement(\"input\");\n\t\tcheckbox.setAttribute(\"type\", \"checkbox\");\n\t\tcheckbox.setAttribute(\"value\", \"dd-mm-yyyy\");\n\t\tcompletion.appendChild(checkbox)\n\t\tform.appendChild(completion);\n\t\tform.appendChild(document.createElement('br'))\n\t\tform.appendChild(document.createElement('br'))\n\n\t\t// create Submit button \n\t\tvar submitBtn = document.createElement('button')\n\t\tsubmitBtn.setAttribute('type','submit')\n\t\tsubmitBtn.innerHTML = 'Submit'\n\t\tsubmitBtn.setAttribute('id','Submit')\n\t\tform.appendChild(submitBtn)\n\t\tcontent.appendChild(form)\n\t\tcontainer.appendChild(content)\n\n\t\t// add submit eventlistener on Form\n\t\tform.addEventListener('submit', (e) => {\n\t\t\te.preventDefault()\n\t\t\tvar formElems = form.elements\n\t\t\tlet title = formElems[0].value\n\t\t\tlet description = formElems[1].value\n\t\t\tlet notes = formElems[2].value\n\t\t\tlet due = formElems[3].value\n\t\t\tlet priority = formElems[4].checked\n\t\t\tlet completionStat = formElems[4].checked\n\t\t\tvar today = new Date();\n\t\t\tvar dueDate = new Date(due)\n\t\t\tif(dueDate.getTime() < today.getTime()) {\n\t\t\t\talert(\"Due date should be greater than todays date\")\n\t\t\t} else {\n\t\t\t\tconsole.log({dueDate})\n\t\t\t\tObject(_script__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(title, description, notes, dueDate, priority, completionStat)\n\t\t\t\tformElems[0].value = ''\n\t\t\t\tformElems[1].value = ''\n\t\t\t\tformElems[2].value = '' \n\t\t\t\tformElems[3].value = ''\n\t\t\t\tformElems[4].checked = false\n\t\t\t\tformElems[5].checked = false\n\t\t\t}\n\t\t})\n\t})\n}\n\n\n\n//# sourceURL=webpack:///./src/DOM.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ \"./src/DOM.js\");\n\n\nconst AddTodoList = (() => {\n\tvar todosList = [], defaultProject = []\n\n\tconst addTask = (todo) => {\n\t\ttodosList.push(todo)\n\t\tdefaultProject.push(todo)\n\t}\n\n\tconst fetchTodos = () => {\n\t\tObject(_DOM__WEBPACK_IMPORTED_MODULE_0__[\"homePage\"])(todosList)\n\t}\n\treturn {addTask, fetchTodos}\n})()\n\nconst Todos = (title, description, notes, dueDate, priority = false, completion = false) => {\n\tlet todo = {title, description, dueDate, priority, notes, completion}\n\tAddTodoList.addTask(todo)\n\tProjectList.chooseProject(todo)\n}\n\n\nconst ProjectList = (() => {\n\tvar projects = []\n\n\tconst chooseProject = (todo) => {\n\t\tvar index = Math.floor(Math.random() * projects.length) // temporary, redundant code line\n\t\tprojects[index].todosList.push(todo)\n\t}\n\n\tconst createProject = (project) => {\n\t\tprojects.push(project)\n\t}\n\n\tconst fetchProjects = () => {\n\t\tObject(_DOM__WEBPACK_IMPORTED_MODULE_0__[\"viewProjects\"])(projects)\n\t}\n\treturn {createProject, chooseProject, fetchProjects}\n})()\n\nconst Project = (title) => ProjectList.createProject({ title , todosList : []})\n\nProject(\"study\")\nProject(\"Tour\")\nProject(\"Food\")\n\nTodos('a','b','c','d','e')\nTodos('m','b','c','d','e')\n\nconst setTodosCompletion = (todo) => {\n\ttodo.completion = !todo.completion\n\t// render page to view change\n}\n\nconst changePriority = (todo) => {\n\ttodo.priority = !todo.priority\n\t// render page to view change\n}\t\n\nObject(_DOM__WEBPACK_IMPORTED_MODULE_0__[\"createNewTask\"])();\nAddTodoList.fetchTodos()\nProjectList.fetchProjects()\n/* harmony default export */ __webpack_exports__[\"default\"] = (Todos);\n\n\n//# sourceURL=webpack:///./src/script.js?");

/***/ })

/******/ });