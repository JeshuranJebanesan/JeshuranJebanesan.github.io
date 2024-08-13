const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const add_task = document.getElementById("add-task");
const add = document.getElementById("add");
const remove = document.getElementById("remove");
const check = document.getElementById("check");

add_task.addEventListener("click", addTask);

function addTask(){
    if (inputBox.value === ''){
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        add.play();
    }
    inputBox.value = ''
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        check.play();
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        remove.play();
    }
})

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML)
}

function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showData();