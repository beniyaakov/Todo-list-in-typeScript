interface Todo {
	text: string;
	completed: boolean;
}
const btn = document.getElementById('btn')! as HTMLButtonElement;
const btnDelete = document.getElementById('btnDelete')! as HTMLButtonElement;
const input = document.getElementById('toDoInput')! as HTMLButtonElement;
const form = document.querySelector('form')!;
const list = document.getElementById("toDoList")! as HTMLUListElement

let todos: Todo[] = readTodos();
viewInfo()


function viewInfo() {
	todos.forEach(createTodoElement)
}

function readTodos():Todo[] {
	const tososJSON = localStorage.getItem("todos")!

	if (tososJSON === null) return [];
	return JSON.parse(tososJSON)
}

function saveTodos() {
	localStorage.setItem('todos', JSON.stringify(todos))

}

function handleSubmit(e: SubmitEvent) {
	e.preventDefault()
	if (input.value == "") return;
	const newTodo: Todo = {
		text: input.value,
		completed: false,
	}
	createTodoElement(newTodo)
	todos.push(newTodo)
	saveTodos()
	input.value = ""
}

function createTodoElement(todo: Todo) {
	
	const newLi = document.createElement('li')
	const checkBox = document.createElement("input")
	checkBox.type = "checkbox"
	checkBox.checked = todo.completed
	checkBox.addEventListener("change", () => {
		todo.completed = checkBox.checked;
		saveTodos()
	})

	newLi.append(todo.text)
	newLi.append(checkBox)
	list?.append(newLi)
}

form.addEventListener('submit', handleSubmit)
btnDelete.addEventListener('click', () => {
	localStorage.clear()
	list.innerHTML= ""
})