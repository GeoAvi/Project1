let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('task-counter');
const taskscompCounter = document.getElementById('task-comp-counter');
let popup = document.getElementById('popup');
let togpopup = document.getElementById('togpopup');
let taskscompPopup = document.getElementById('taskcomppopup')
const tds = document.querySelectorAll('li');


console.log('working');

function addTaskToDOM(task){
	const li = document.createElement('li');
	li.innerHTML =`<input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''}  class="custom-checkbox"/><label for="${task.id}">${task.text}</label> <img src="trash-can-solid.svg" class="delete" data-id="${task.id}"/>`;
        taskList.append(li);
}

function renderList(){ 
	taskList.innerHTML ='';
	for(let i=0; i<tasks.length; i++){
	addTaskToDOM(tasks[i]);
	}

	tasksCounter.innerHTML=tasks.length;
	const newTask = tasks.filter(function(task){
	return task.done == true;
	})
	const nT = Math.trunc(newTask.length/tasks.length*100);
	taskscompCounter.innerHTML= nT+'%';

	if(taskscompCounter.innerHTML ==='100%'){
		taskCompPopupOpen();
	}
	// tasks = newTask;
	return;
}

function handleClickListener(e){
	const target = e.target;
	console.log(target);

	if(target.className=='delete'){
		const taskId = target.dataset.id;
		deleteTask(taskId);
		return;
	}

	else if(target.className ==='custom-checkbox'){
	const taskId = target.id;
		toggleTask(taskId);
		return;
	}
}

function addTask (task) {
	if (task){
		tasks.push(task);
		renderList();
		taskAddPopupOpen();
		return;
	}
	alert('Task creation unsuccessfully');
}

function deleteTask (taskId) {
	const newTask = tasks.filter(function(task){
	return task.id !== taskId;
	})

	tasks = newTask;
	renderList();
	alert('Task deleted successfully');
	return;
} 

function toggleTask(taskId){
	const task = tasks.filter(function(task){
		return task.id===taskId;
	});
	if (task.length>0){
		const currentTask = task[0];

		currentTask.done = !currentTask.done;
		renderList();
		if(currentTask.done==true){
		taskTogPopupOpen();
		return;
	}
		else
			return;
	}
	alert('Task could not be toggled');
}

function taskAddPopupOpen(){
	popup.classList.add("open-popup");
	return;
}

function taskAddPopupClose(){
	popup.classList.remove("open-popup");
	return;
}

function taskTogPopupOpen(){
togpopup.classList.add("togopen-popup")
return;
}

function taskTogPopupClose(){
	togpopup.classList.remove("togopen-popup");
	return;
}

function taskCompPopupOpen(){
	taskscompPopup.classList.add("taskcomppopup-open")
	return;
}

function taskCompPopupClose(){
	taskscompPopup.classList.remove("taskcomppopup-open")
	return;
}

function handleInputKeypress(e){
	if(e.key ==='Enter'){
		const text = e.target.value;


	if(!text){
		alert('Task cannot be empty')
		return;
	}


	const task ={
		text,
		id: Date.now().toString(),
		done: false
	};

	e.target.value='';
	addTask(task);
	}
}

addTaskInput.addEventListener('keyup', handleInputKeypress);
document.addEventListener('click', handleClickListener);