// getElementsByClassName -  this will return the solution in array format
// const taskContainer = document.getElementsByClassName("task_container")

// parent element store cards
const taskContainer = document.querySelector(".task__container");
// global store
let globalStore = [];

const newcard = ({
    id,
    imageUrl,
    taskTitle,
    taskDescription,
    taskType
}) => `
    <div class="col-md-6 col-lg-4" id=${id}>
        <div class="card">
            <div class="card-header d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-success">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button type="button" id=${id} class="btn btn-outline-danger onclick="deleteCard.apply(this,arguments)">
                    <i class="fas fa-trash-alt" id=${id} onclick="deleteCard.apply(this,arguments)"></i>
                </button>
            </div>
            <img src=${imageUrl} alt="Card image cap" class="card-img-top">
            <div class="card-body">    
                <h5 class="card-title">${taskTitle}</h5>
                <p class="card-text">${taskDescription}</p>
                <span class="badge bg-primary">${taskType}</span>
            </div>
            <div class="card-footer text-muted">
                <button
                type="button"
                class="btn btn-outline-primary float-end">
                    Open Task
                </button>
            </div>
        </div>
    </div>`;

const loadInitialTaskCards = () => {
    // access localstorage
    // if no key found then null will be returned
    const getInitialData = localStorage.getItem("tasky");
    // console.log(getInitialData);
    // checking if data found
    if (!getInitialData) {
        return;
    }
    // convert stringified- object to object
    const { cards } = JSON.parse(getInitialData);
    // map around the array to generate HTML card and injecct it to DOM
    cards.map((cardObject) => {
        const createNewCard = newcard(cardObject);
        taskContainer.insertAdjacentHTML("beforeend", createNewCard);
        globalStore.push(cardObject);
    });
};

const updateLocalStorage = () => localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));

const saveChanges = () => {
    const taskData = {
        // this function return current date
        id: `${Date.now()}`, // unique id for card
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value
    };

    // parent object browser -> window
    // parent object html -> DOM - > document

    // passing data to newcard
    const createNewCard = newcard(taskData);

    // inserting the html
    // parameter as where to insert
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    // pushing the data to the global store
    globalStore.push(taskData);

    // application programming interface
    // localStorage -> interface -> programming

    // add to localStorage
    // localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));
    // key  -> data
    updateLocalStorage();
};

const deleteCard = (event) => {
    // id
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagname;
    // search
    // remove the object
    globalStore = globalStore.filter((cardObject) => cardObject.id != targetID);
    // loop ober the new globalStore, and inject updated cards to DOM
    // this is not working we have to remove the element from the DOM
    // newUpdatedArray.map((cardObject) => {
    //     const createNewCard = newcard(cardObject);
    //     taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    // })
    // globalStore = newUpdatedArray;

    // localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }))
    updateLocalStorage();

    // we have to remove the element from the DOM
    // access the DOM
    if (tagname === "BUTTON") {
        // task__container
        return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode // col-lg-4
        );
    }

    // task__container
    return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode // col-lg-4
    );
};
// The modal was not closing upon adding new card
// the cards were deleted afetr refresh -> localstorage 5mb

// Features
// Delete modal fearture
// opren task
// edit task