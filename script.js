// Les fonctions globales
let form = document.querySelector("form");
let input = document.querySelector("#input");
let msg = document.querySelector("#msg");
let tasks = [];

// ecoute de l'evenement de soumission du formulaire
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
})

// gestion d'ajout des taches existantes au niveau de la liste des taches 
window.onload = function(){
    let savedTasks = localStorage.getItem("tasks");
    if(savedTasks){
        let tasks = JSON.parse(savedTasks);
        for(let i = 0 ; i < tasks.length ; i++){
            addTaskToList(tasks[i]);
        }
    }
}

// fonction qui verifie si l'utilisateur a saisi une tache ou pas et fait des actions en fonction de cela
function addTask() {
    let task = input.value;
    if (task === "") {
        msg.innerHTML = "Veuillez saisir une tâche !"
    }
    else {
        msg.innerHTML = "";
        addTaskToList(task);
        input.value = "";
    }
}

// fonction pour ajouter une tache a la liste des taches
function addTaskToList(task) {
    let containerTask = document.querySelector(".container-task")
    containerTask.innerHTML += 
    `<div class="row  py-3 align-items-center mx-1">
        <div class="col-12 col-md-10 bg-light d-flex align-items-center rounded-3 p-2">
            <div class="bg-danger w-100 rounded-3 p-1">
                <p> ${task} </p>
            </div>
        </div>
        <div class="col-12 col-md-2 actions ">
            <div class="d-flex rounded-3 bg-light p-1 flex-wrap justify-content-center gap-1 ">
                <button type="button" class="btn btn-danger btn-sm text-light fw-bold" onclick="changeToRed(this)">To do</button>
                <button type="button" class="btn btn-warning btn-sm text-light fw-bold " onclick="changeToOrange(this)" >Doing</button>
                <button type="button" class="btn btn-success btn-sm text-light fw-bold" onclick="changeToGreen(this)">Done</button>
            </div>
        </div>
    </div> `
    tasks.push(task);
    saveToLocalStorage();
}
// Fonction pour sauvegarder les tâches dans le localStorage
function saveToLocalStorage(){
    localStorage.setItem("tasks" , JSON.stringify(tasks));
}

// fonction pour ajout de la couleur red au clic du bouton to do
function changeToRed(e){
    e.parentElement.parentElement.previousElementSibling.querySelector("div").classList.remove("bg-warning");
    e.parentElement.parentElement.previousElementSibling.querySelector("div").classList.remove("bg-success");
    e.parentElement.parentElement.previousElementSibling.querySelector("div").classList.add("bg-danger");
}

// fonction pour ajout de la couleur orange au clic du bouton Doing
function changeToOrange(e){
    e.parentElement.parentElement.previousElementSibling.querySelector("div").classList.remove("bg-danger");
    e.parentElement.parentElement.previousElementSibling.querySelector("div").classList.remove("bg-success");
    e.parentElement.parentElement.previousElementSibling.querySelector("div").classList.add("bg-warning");
}

// fonction pour ajout de la couleur green au clic du bouton Done
function changeToGreen(e){
    e.parentElement.parentElement.previousElementSibling.querySelector("div").classList.remove("bg-danger");
    e.parentElement.parentElement.previousElementSibling.querySelector("div").classList.remove("bg-warning");
    e.parentElement.parentElement.previousElementSibling.querySelector("div").classList.add("bg-success");
}
