//Dom values
const input = document.getElementById("new-task");
const addbtn = document.getElementById("add-btn");
const list = document.querySelector(".todoLists");

//Load save todo from localstorage
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    //save current todo
    localStorage.setItem('todos', JSON.stringify(todos));
    
}

//create dom node for todo object and append it to list
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    //chcekbox for toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        //Visual strike through
        textspan.style.textDecoration = todo.completed?'line-through':"";
    saveTodos();
    })
    //text of todo
    const textspan = document.createElement("span");
    textspan.textContent = todo.text;
    textspan.style.margin = '0 8px';
    if (todo.completed) {
        textspan.style.textDecoration = 'line-through';
    }

        //double-click to edit todo
        textspan.addEventListener("dblclick",()=> {
            const newText = prompt("Edit todo", todo.text);
            if (newText !== null) {
                todo.text = newText.trim()
                textspan.textContent = todo.text;
                saveTodos();
            }
        })

        //Delete Todo Button
        const delBtn = document.createElement('button');
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
            todos.splice(index, 1)
            render();
            saveTodos();

        })

        li.appendChild(checkbox);
        li.appendChild(textspan);
        li.appendChild(delBtn);
    return li;
}

//render whole todolist
function render() {
    list.innerHTML = '';

    //recreate each item
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node)
    });

}


function addTodo() {
    const text= input.value.trim();
    if (!text) {
        return
    }

    //push a new todo object
    todos.push({ text, completed: false });
    input.value = '';
    render();
    saveTodos();
}

addbtn.addEventListener("click", addTodo);
render();