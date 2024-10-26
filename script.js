let addTask = document.querySelector('.taskAdd')
let main = document.querySelector('.main')
function TaskAdder(value, isComplete) {
    value=value.trim();
    if (value === "")
        return;
    let task = document.createElement('div')
    task.classList.add('taskContainer')

    let content = document.createElement('TEXTAREA')
    content.classList.add('tasks')

    content.type = 'text'
    let imgContainer = document.createElement('div')
    imgContainer.classList.add('imageContainer')
    let comp = document.createElement('img')
    comp.id = 'comp'
    comp.src = 'complete.svg'
    let del = document.createElement('img')
    del.id = 'del'
    del.src = 'delete.svg'
    imgContainer.append(comp, del)

    content.value = value
    task.append(content, imgContainer)
    main.append(task)

    if (isComplete) {
        comp.classList.toggle('checked')
        comp.src = (comp.className.includes('checked')) ? 'checked.svg' : 'complete.svg';
    }
    
    content.addEventListener('change',()=>{
        saveInLocalStorage()
    })
    content.addEventListener("keypress", function(event) {
         if (event.key === "Enter") {
          event.preventDefault();
          saveInLocalStorage()
        }
      });
    comp.addEventListener('click', () => {
        comp.classList.toggle('checked')
        comp.src = (comp.className.includes('checked')) ? 'checked.svg' : 'complete.svg';
        saveInLocalStorage()
    })
    del.addEventListener('click', () => {
        del.parentElement.parentElement.remove()
        saveInLocalStorage()
    })
    
    saveInLocalStorage()
}

function saveInLocalStorage() {
    let tasks = document.querySelectorAll('.taskContainer')
    let taskArray = []
    tasks.forEach(task => {
        let label = task.querySelector('.tasks').value
        let checked = task.querySelector('#comp').className.includes('checked')
        taskArray.push({ label, checked });
    });

    localStorage.setItem('taskArray', JSON.stringify(taskArray))
}

function retrieveTasks() {
    let tasks = document.querySelectorAll('.taskContainer')
    let taskArray = (localStorage.getItem('taskArray')) ? JSON.parse(localStorage.getItem('taskArray')) : []
    taskArray.forEach(task => {
        let label = task['label']
        let checked = task['checked']
        console.log(label);

        TaskAdder(label, checked)
    });
}

retrieveTasks()
addTask.children[1].addEventListener('click', () => {
    TaskAdder(addTask.children[0].value, false)
    addTask.children[0].value = ''

}, false)
document.querySelector('#taskInput').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
     event.preventDefault();
     TaskAdder(addTask.children[0].value, false)
addTask.children[0].value = ''
   }
 });


