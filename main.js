let inputNewTask = document.querySelector('#inputNewTask');
let btnAddTask = document.querySelector('#btnAddTask');
let listTask = document.querySelector('#listTask');
let windowEdition = document.querySelector('#windowEdition');
let windowEditionBackground = document.querySelector('#windowEditionBackground');
let windowEditionBtnClose = document.querySelector('#windowEditionBtnClose');
let btnUpdateTask = document.querySelector('#btnUpdateTask');
let idTaskEdtion = document.querySelector('#idTaskEdtion');
let inputTaskNameEdit = document.querySelector('#inputTaskNameEdit');

inputNewTask.addEventListener('keypress', (e) => {

    if(e.keyCode == 13 ){
        let task={
            name: inputNewTask.value,
            id: generateId(),
        }
        addTask(task);
    }
});

windowEditionBtnClose.addEventListener('click', (e) => {
    alternativeWindowEdit();
});

btnAddTask.addEventListener('click', (e) => {
    let task={
        name: inputNewTask.value,
        id: generateId(),
    }
    addTask(task);
});

btnUpdateTask.addEventListener('click', (e) => {
    e.preventDefault();

    let idTask = idTaskEdtion.innerHTML.replace('#', '');

    let task={
        name: inputTaskNameEdit.value,
        id: idTask
    }

    let currentTask = document.getElementById(''+idTask+'');

    if(currentTask){
        let li = createTagLi(task);
        listTask.replaceChild(li, currentTask);
        alternativeWindowEdit();
    }else{
        alert('Elemento HTML não encontrado!');
    }
});

function generateId(){
    return Math.floor(Math.random() * 3000);
};

function addTask(task){
    let li = createTagLi(task);
    listTask.appendChild(li);
    inputNewTask.value = '';
}  

function createTagLi(task){
    let li = document.createElement('li');
    li.id = task.id;

    let span = document.createElement('span');
    span.classList.add('textTask');
    span.innerHTML = task.name;

    let div = document.createElement('div');

    let btnEdit = document.createElement('button');
    btnEdit.classList.add('btnAction');
    btnEdit.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEdit.setAttribute('onclick', 'edit('+task.id+')');

    let btnDelete = document.createElement('button');
    btnDelete.classList.add('btnAction');
    btnDelete.innerHTML = '<i class="fa fa-trash"></i>';
    btnDelete.setAttribute('onclick', 'del('+task.id+')');

    div.appendChild(btnEdit);
    div.appendChild(btnDelete);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function edit(idTask){
    let li = document.getElementById(''+ idTask + '');
    if(li){
        idTaskEdtion.innerHTML = '#' + idTask;
        inputTaskNameEdit.value = li.innerText;
        alternativeWindowEdit();
    }else{
        alert('Elemento HTML não encontrado!');
    }
    
}

function del(idTask){
    let confirm = window.confirm('Tem certeza que deseja excluir esta tarefa?');
    if (confirm){
        let li = document.getElementById(''+ idTask + '');
        if(li){
            listTask.removeChild(li);
        }else{
            alert('Elemento HTML não encontrado!');
        }
    }
}

function alternativeWindowEdit() {
    windowEdition.classList.toggle('open');
    windowEditionBackground.classList.toggle('open');
}

