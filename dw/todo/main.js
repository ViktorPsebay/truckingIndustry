const form = document.querySelector("form");
const input = document.querySelector("input");
const mainDiv = document.querySelector(".tasks");
const footer = document.querySelector(".footer");
const icon = document.querySelector("form").firstElementChild;

form.addEventListener("submit", addToDo);
mainDiv.addEventListener("click", checkDivButtons);
footer.addEventListener("click", checkFooterButtons);
icon.addEventListener("click", manageArrowDown);

footer.style["display"] = "none";

// Считает количество тасков
function countNoCompletedTasks() {
    const noCompletedTasks = Array.from(mainDiv.children).filter((element) => element.firstElementChild.className.includes("no_checked") === true);
    return noCompletedTasks.length;
}

// Изменяет количество выполненных тасков
function changeCountItems(count) {
    let countItems = document.querySelector(".count_items");
    if (countItems !== null) {
        countItems.textContent = count === 1 ? "1 item left" : `${count} items left`;
    }
}

// Если таск выполнен, то делает его невыполненным и наоборот
function checkStatusTask(task) {
    let span = task.firstElementChild;

    span.classList.toggle("checked");
    span.classList.toggle("no_checked");
    span.nextElementSibling.classList.toggle("strikethrough");
    span.nextElementSibling.classList.toggle("no_strikethrough");
}

// Делает все таски выполненными
function makeCheckEverything(element) {
    element.firstElementChild.classList.add("checked");
    element.firstElementChild.classList.remove("no_checked");
    element.firstElementChild.nextElementSibling.classList.add("strikethrough");
    element.firstElementChild.nextElementSibling.classList.remove("no_strikethrough");
}

// Делает все таски выполненными
function manageArrowDown(e) {
    const currentButton = footer.querySelector(".choised").className;

    e.target.classList.toggle("clicked");
    e.target.classList.toggle("no_clicked");

    // Если ни один из тасков не завершён
    if (countNoCompletedTasks() === mainDiv.childElementCount) {
        Array.from(mainDiv.children).forEach((element) => checkStatusTask(element));

        filter(currentButton);
        manageVisibilityClearCompleted();
    }
    // Если все таски завершены
    else if (countNoCompletedTasks() === 0) {
        Array.from(mainDiv.children).forEach((element) => checkStatusTask(element));

        filter(currentButton);
        manageVisibilityClearCompleted();
    }
    // Если какой-то из тасков не завершён
    else {
        Array.from(mainDiv.children).forEach((element) => makeCheckEverything(element));

        filter(currentButton);
        manageVisibilityClearCompleted();
    }

    changeCountItems(countNoCompletedTasks());
}
    
// Удаляет таск
function deleteTask(e) {
    e.parentNode.remove();

    if (mainDiv.childElementCount === 0) {
        footer.style["display"] = "none";
        icon.className = "";
    }

    changeCountItems(countNoCompletedTasks());
}

// Управляет видимостью кнопки "Clear completed"
function manageVisibilityClearCompleted() {
    const buttonClearCompleted = footer.querySelector(".clearCompleted");
    buttonClearCompleted.style["display"] = mainDiv.childElementCount - countNoCompletedTasks() !== 0 ? "block" : "none"
}

// Делает таск выполненным
function makeTaskChecked(e) {
    const currentButton = footer.querySelector(".choised").className;
    
    checkStatusTask(e.target.parentNode);

    changeCountItems(countNoCompletedTasks());

    manageVisibilityClearCompleted();

    filter(currentButton);

    if (countNoCompletedTasks() === 0) {
        icon.classList.add("clicked");
        icon.classList.remove("no_clicked");
    }
    else {
        icon.classList.add("no_clicked");
        icon.classList.remove("clicked");
    }
}

// Проверка кнопок complete и delete
function checkDivButtons(e) {
    // Если была нажата кнопка complete
    if (e.target.className.includes("span_complete"))
    {   
        makeTaskChecked(e);
    }
    // Если была нажата кнопка delete
    if (e.target.className.includes("span_delete"))
    {
        deleteTask(e.target);
    }
}

// HTML код нового таска
function templateTask(text) {
    const template = `
    <div class="new_task">
        <span class="span_complete no_checked"></span>
        <label class="label" >${text}</label>
        <span class="span_delete"></span>
    </div>`;

    return template;
}

function checkFooterButtons(e) {
    const buttonContainer = document.querySelector(".links");
    if (e.target.tagName === "A") {
        e.target.classList.add("choised");

        // В зависимости от выбранной кнопки, остальные теряют фокус
        Array.from(buttonContainer.children).forEach((link) => {
            if (!link.firstElementChild.className.includes(e.target.className)) {
                link.firstElementChild.classList.remove("choised");
            }
        })

        filter(e.target.className);
    }
}

function filter(currentButton) {
    const allTasks = Array.from(mainDiv.children);

    if (currentButton.includes("all")) {
        filterALL(allTasks);
    }
    else if (currentButton.includes("active")) {
        filterActive(allTasks);
    }
    else if (currentButton.includes("completed")) {
        filterCompleted(allTasks);
    }
    else if (currentButton.includes("clearCompleted")) {
        clearAllCompleted(allTasks);
    }
}

// Показать все
function filterALL(allTasks) {
    allTasks.forEach((element) => element.style.display = "flex");
}

// Показать активные
function filterActive(allTasks) {
    allTasks.forEach((element) => {
        element.style["display"] = element.firstElementChild.className.includes("no_checked") ? "flex" : "none";
    });
}

// Показать выполненные
function filterCompleted(allTasks) {
    allTasks.forEach((element) => {
        element.style["display"] = element.firstElementChild.className.includes("no_checked") ? "none" : "flex";
    });
}

// Удаляет все выполненные таски
function clearAllCompleted(allTasks) {
    allTasks.forEach((element) => {
        if (element.firstElementChild.className.includes("no_checked") === false) {
            deleteTask(element.firstElementChild)
        }
    })
}

// Добавляет новый таск, футер и иконку
function renderTask (template) {
    mainDiv.innerHTML += template;

    const currentButton = footer.querySelector(".choised").className;
    const allTasks = Array.from(mainDiv.children);

    if (currentButton.includes("completed")) {
        filterCompleted(allTasks);
    }

    icon.className = "icon no_clicked";
    footer.style["display"] = "block";
    changeCountItems(countNoCompletedTasks());
}

// Проверяет input на наличие текста и добавляет таск
function addToDo(e) {
    e.preventDefault();

    if (input.value !== "") {
        renderTask(templateTask(input.value));
        input.value = "";
    }
}