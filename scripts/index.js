// getElementsByClassName -  this will return the solution in array format
// const taskContainer = document.getElementsByClassName("task_container")

// parent element store cards
const taskContainer = document.querySelector(".task__container");

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
};