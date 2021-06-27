// getElementsByClassName -  this will return the solution in array format
// const taskContainer = document.getElementsByClassName("task_container")

// parent element store cards
const taskContainer = document.querySelector(".task__container");
// global store
const globalStore = [];

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
                <button type="button" class="btn btn-outline-danger">
                    <i class="fas fa-trash-alt"></i>
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
    localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));
    // key  -> data
};

// The modal was not closing upon adding new card
// the cards were deleted afetr refresh -> localstorage 5mb

// Features
// Delete modal fearture
// opren task
// edit task