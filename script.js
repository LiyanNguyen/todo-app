let newTodoInput = document.querySelector("#newTodoInput");
let currentListDisplay = document.querySelector("#currentList");
let viewAllTodos = document.querySelector("#allTodos");
let viewActiveTodos = document.querySelector("#activeTodos");
let viewCompletedTodos = document.querySelector("#completedTodos");
let clearCompletedTodos = document.querySelector("#clearCompletedTodos");
let todoItemsLeft = document.querySelector("#todoItemsLeft");
let themeSwitcher = document.querySelector("#themeSwitcher");

// ACTIVE TODO ARRAY
let activeTodo = [
	"Complete online JavaScript course",
	"Jog around the park 3x",
	"10 minutes meditation",
	"Read for 1 hour",
	"Pick up groceries",
	"Complete TodoApp on Frontend Mentor",
];

// COMPLETED TODOS ARRAY
let completedTodo = [];

// ALL TODOS
let allTodoData = completedTodo.concat(activeTodo);

// ADD FUNCTIONS TO EACH CHECK BOXES
let addCheckBoxFunction = () => {
	let checkBoxes = document.querySelectorAll(".checkBox");
	checkBoxes.forEach((el) => {
		el.onclick = () => {
			// pass the value to the completed todo array
			completedTodo.push(el.nextSibling.textContent);
			el.parentElement.classList.add("completed");
			// then search from the active todo based on the value
			let indexToDelete = activeTodo.indexOf(el.nextSibling.textContent);
			// then delete it
			activeTodo.splice(indexToDelete, 1);
			// update the number of active todo items left
			todoItemsLeft.innerText = `${activeTodo.length} items left`;
			// remove the delete icon next to it
			el.nextElementSibling.remove();
			// then clone the checkbox
			let newEL = el.cloneNode(true);
			// then replace it with its newer self to remove all event listeners (BUG FIXED!)
			el.replaceWith(newEL);
		};
	});
}

// call this once on initial page load
addCheckBoxFunction();

// CREATE NEW TODO INPUT FUNCTION
newTodoInput.onkeydown = (event) => {
	if (event.key == "Enter") {
		activeTodo.push(newTodoInput.value);
		let li = document.createElement("li");
		li.innerHTML = `<div class="checkBox"></div>${newTodoInput.value}<img src="images/icon-cross.svg" alt="x icon">`;
		currentListDisplay.appendChild(li);
		newTodoInput.value = "";
		addCheckBoxFunction();
		// update the number of active todo items left
		todoItemsLeft.innerText = `${activeTodo.length} items left`;
	}
}

// RENDER COMPLETED TODOS
let displayCompletedTodos = () => {
	completedTodo.forEach((data) => {
		let completedList = document.createElement("li");
		completedList.classList.add("completed");
		completedList.innerHTML = `<div class="checkBox"></div>${data}<img src="images/icon-cross.svg" alt="x icon">`;
		currentListDisplay.appendChild(completedList);
	})
}

// RENDER ACTIVE TODOS
let displayActiveTodos = () => {
	activeTodo.forEach((data) => {
		let activeList = document.createElement("li");
		activeList.innerHTML = `<div class="checkBox"></div>${data}<img src="images/icon-cross.svg" alt="x icon">`;
		currentListDisplay.appendChild(activeList);
	});
}

// VIEW ALL TODOS FUNCTION
viewAllTodos.onclick = () => {
	currentListDisplay.innerHTML = "";
	displayCompletedTodos();
	displayActiveTodos();
	addCheckBoxFunction();
	viewAllTodos.classList.add("active")
	viewActiveTodos.classList.remove("active");
	viewCompletedTodos.classList.remove("active");
}

// VIEW ACTIVE TODOS FUNCTION
viewActiveTodos.onclick = () => {
	currentListDisplay.innerHTML = "";
	displayActiveTodos();
	addCheckBoxFunction();
	viewAllTodos.classList.remove("active");
	viewActiveTodos.classList.add("active");
	viewCompletedTodos.classList.remove("active");
};

// VIEW COMPLETED TODOS FUNCTION
viewCompletedTodos.onclick = () => {
	currentListDisplay.innerHTML = "";
	displayCompletedTodos();
	viewAllTodos.classList.remove("active");
	viewActiveTodos.classList.remove("active");
	viewCompletedTodos.classList.add("active");
};

// CLEAR THE CURRENT COMPLETED TODOS AND RENDER ALL THE ACTIVE TODOS
clearCompletedTodos.onclick = () => {
	completedTodo = [];
	currentListDisplay.innerHTML = "";
	displayActiveTodos();
	addCheckBoxFunction();
	viewAllTodos.classList.add("active");
	viewActiveTodos.classList.remove("active");
	viewCompletedTodos.classList.remove("active");
}

// THEME SWITCHER FUNCTION (WIP)
themeSwitcher.onclick = () => {
	alert("This Feature is still WIP")
}

// DELETE A TODO FUNCTION (WIP)
let deleteTodoIcon = document.querySelectorAll("#currentList li img");
deleteTodoIcon.forEach((e) => {
	e.onclick = () => {
    // find out the item from that todo item
    // then search from the active todo based on the value
    let indexToDelete = activeTodo.indexOf(e.previousSibling.textContent);
    // then delete it
		activeTodo.splice(indexToDelete, 1);
		// update allTodoData array as well (this is easier with framework)
		let allTodoData = completedTodo.concat(activeTodo);
		console.log(allTodoData)
		// then update the UI to with the removed active todo item

    // try to console log allTodoData array, see if it updates as well
  }
})

/*
NEW LEARNINGS: 
nextSibling
previousSibling
previousElementSibling
nextElementSibling
parentElement
cloneNode + replaceWith (TRICK TO REMOVE EVENTLISTENERS FROM AN ELEMENT)
*/

// BONUS DIFFICULT FEATURE:
// ALLOW DRAG AND DROP OF ITEMS