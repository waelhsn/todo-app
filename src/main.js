const form = document.querySelector("form");
const newTodo = document.getElementById('todoList');
const selectElement = document.querySelector(".selector-section");
const deleteSelected = document.getElementById('clear-completed-div');
const allElements = document.getElementById('allElements');
const allActive = document.getElementById('changeActive');
const allCompleted = document.getElementById('completedTodos');
const selectAllElements = document.getElementById('down-arrow');

form.onsubmit = event => {
    event.preventDefault();
    const userInput = document.getElementById('inputText');
    const text = document.createTextNode(userInput.value);
    creatingTodo(text);
    seeingSelectionSection();
    renderDownArrow();
    setOpacity();
    apparentArrow();
    count += 1;
    form.reset();
}

let todoElements = [];
let count = 0;
let checkSections = "";
newTodo.remove();
selectAllElements.remove();
selectAllElements.addEventListener("click", (event) => {
    if (checkingElements() === true) {
        todoElements.forEach(a => {
            a.querySelector('input[name="checkbox-input"]')
                .checked = false;
            activityToggleStatus(a);
            filteringClone(a);
        })
        setOpacity();
    }
    else {
        todoElements.forEach(a => {
            a.querySelector('input[name="checkbox-input"]')
                .checked = true;
            activityToggleStatus(a);
            filteringClone(a);
        })
        setOpacity();
    }
    Apprentices();
    changeTodoText();
    deleteAllCompleted();
});

function creatingTodo(text) {
    let clone = newTodo.cloneNode(true);
    clone.id = clone.id + count;

    document.querySelector("#activity-section")
        .appendChild(clone);

    clone.querySelector("P")
        .appendChild(text);

        todoElements.push(clone);
    clone.querySelector("#checkbox-input")
        .addEventListener("change", (event) => {
            activityToggleStatus(clone);
            setOpacity();
            Apprentices();
            changeTodoText();
            deleteAllCompleted();
            filteringClone(clone);
        })
    clone.querySelector(".removal-sign")
        .addEventListener("click", () => {
            removeActivity(clone);
            seeingSelectionSection();
            setOpacity();
            deleteAllCompleted();
        });
    clone.querySelector(".activity-text")
        .addEventListener("dblclick", () => {
            clone.querySelector(".checkbox-area")
                .classList.toggle("checkbox-area-edit");
                apparentTextAndInput(clone);
        });
    clone.querySelector(".editText")
        .addEventListener("keydown", () => {
            editTodoText(clone);
        });
    Apprentices();
    deletingSvg(clone);
    filteringClone(clone);
}

function filteringClone(clone) {
    if (checkSections === "") {
        clone.style.display = "grid";
    }
    else if (checkSections === "completedTodos") {
        if (clone.querySelector('input[name="checkbox-input"]').checked === true) {
            clone.style.display = "grid";
        }
        else {
            clone.style.display = "none";
        }
    }
    else if (checkSections === "changeActive") {
        if (clone.querySelector
            ('input[name="checkbox-input"]')
        .checked === false) 
        {
            clone.style.display = "grid";
        }
        else {
            clone.style.display = "none";
        }
    }
    else
     {
        clone.style.display = "grid";
    }
}

function seeingSelectionSection() {
    if (todoElements.length > 0)
     {
        selectElement
            .className = "selectorSeenig";
    }
    else {
        selectElement
            .className = "selector-section";
    }
}

function renderDownArrow() {
    if (document.getElementById("down-arrow") === null) {
        document.querySelector("#remarkAll")
            .appendChild(selectAllElements);
    }
    else {
        return;
    }
}

function deleteAllCompleted()
 {
    if (todoElements.some(a => a.querySelector('input[name="checkbox-input"]')
    .checked === true)) {
        deleteSelected.style.display = "inline";
    }
    else {
        //alert('You have ' + 'nothing to do.')
    }

}

function apparentArrow() {
    if (todoElements.length >= 1) {
        selectAllElements.style.visibility = "visible";
    }
    else {
        selectAllElements.style.visibility = "hidden";
    }
}

function checkingElements() {
    let counter = 0;

    todoElements.forEach(a => {
        if (a.querySelector('input[name="checkbox-input"]')
            .checked === true) {
            counter++;
        }
    })

    if (counter === todoElements.length) {
        return true;
    } else {
        return false;
    }
}

function apparentTextAndInput(clone, event) {
    let arrayOfItems = checkStatusToText(clone);

    let todoText = arrayOfItems[0];
    let changeText = arrayOfItems[1];

    todoText.hidden = true;
    changeText.hidden = false;
    changeText.focus();
    changeText.value = todoText.textContent;
}
function editTodoText(clone) {
    let arrayOfItems = checkStatusToText(clone);

    let todoText = arrayOfItems[0];
    let changeText = arrayOfItems[1];

    if (event.keyCode === 13) {
        if (changeText.value.length > 0) {
            todoText.hidden = false;
            changeText.hidden = true;
            todoText.textContent = changeText.value;

            clone.querySelector(".checkbox-area")
                .classList.toggle("checkbox-area-edit");
        }
        else {
            removeActivity(clone);
            apparentTextAndInput();
        }
    }
}

function activityToggleStatus(clone) {
    let cb = clone.querySelector('input[name="checkbox-input"]');

    if (cb.checked === true) {
        clone.querySelector(".unchecked").style.display = "none";
        clone.querySelector(".checked").style.display = "inline";
    } else {
        clone.querySelector(".unchecked").style.display = "inline";
        clone.querySelector(".checked").style.display = "none";
    }
}

function deletingSvg(clone) {
    clone.addEventListener("mouseover", () => {
        clone.querySelector(".removal-sign")
            .style.visibility = "visible";
    });

    clone.addEventListener("mouseout", () => {
        clone.querySelector(".removal-sign")
            .style.visibility = "hidden";
    });
}

function setOpacity() {
    if (checkingElements() === true) {
        selectAllElements.closest("div").style.opacity = "1.0";
    } else {
        selectAllElements.closest("div").style.opacity = "0.2";
    }
}

function Apprentices() {
    let numberOfItems = document.querySelector("#count-number");
    let itemsText = document.querySelector("#items-left");
    let counter = 0;

    todoElements.forEach(a => {
        if (a.querySelector('input[name="checkbox-input"]')
            .checked === false) {
            counter++
        }
    })
    numberOfItems.textContent = counter;

    if (counter > 1 || counter === 0) {
        itemsText.textContent = "Total Items";
    }
    else {
        itemsText.textContent = "Total Items";
    }
}

function changeTodoText() {
    todoElements.forEach(a => {
        if (a.querySelector('input[name="checkbox-input"]')
            .checked === false) {
            a.querySelector("P").className = "activity-text";
        }
        else {
            a.querySelector("P").className = "todoTextChecked";
        }
    })
}

function removeActivity(clone) {
    clone.remove();
    todoElements = todoElements.filter(a => a.id !== clone.id);
    apparentArrow();
    deleteAllCompleted();
    Apprentices();
}

function clearCompletedActivities() {
    todoElements.forEach(a => {
        if (a.querySelector('input[name="checkbox-input"]')
            .checked === true) {
            removeActivity(a);
        }
    })
}

//تبديل القوائم
window.addEventListener("hashchange", () => {
    if (location.hash === "#active") {
        onSectionClick("changeActive");
    }
    else if (location.hash === "#completed") {
        onSectionClick("completedTodos");
    }
    else {
        onSectionClick("allElements");
    }
});

allElements.addEventListener("click", (event) => {
    location.hash = "#";
});

allActive.addEventListener("click", (event) => {
    location.hash = "#active";
})

allCompleted.addEventListener("click", (event) => {
    location.hash = "#completed";
})

deleteSelected.addEventListener("click", () => {
    clearCompletedActivities();
    apparentTextAndInput();
})

function onSectionClick(changeSections) {
    todoElements.forEach(a => {
        if (changeSections === "completedTodos") {

            if (a.querySelector('input[name="checkbox-input"]')
                .checked === true) {
                a.style.display = "grid";
            }
            else {
                a.style.display = "none";
            }
            filteringOption = changeSections;
            allElements.className = "non-selected";
            allActive.className = "non-selected";
            allCompleted.className = "selected";
        }
        else if (changeSections === "changeActive") {
            if (a.querySelector('input[name="checkbox-input"]')
                .checked === true) {

                a.style.display = "none";
            }
            else {
                a.style.display = "grid";
            }
            checkSections = changeSections
            allElements.className = "non-selected";
            allActive.className = "selected";
            allCompleted.className = "non-selected";
        }
        else {
            todoElements.forEach(a =>
                a.style.display = "grid");

             checkSections = changeSections
            allElements.className = "selected";
            allActive.className = "non-selected";
            allCompleted.className = "non-selected";
        }
    })
}

function checkStatusToText(clone) {
    let todosText; 
    changeTodoText(clone) ;{
    let todosText;
    let changeText = clone.querySelector(".editText");

    if (clone.querySelector('input[name="checkbox-input"]')
        .checked === true) {
            todosText = clone.querySelector(".todoTextChecked");
    } 
    else {
        todosText = clone.querySelector(".activity-text");
    }
    return [todosText, changeText];
    }
}