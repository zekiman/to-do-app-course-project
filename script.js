//***** COURSE 196 - 200 | EXERCISE - TO DO PROJECT (course project)
//* https://www.udemy.com/course/komple-web-developer-kursu/learn/lecture/17801970#overview

//* after the lecture, i will make my own to do project by myself

form = document.querySelector('form');
input = document.querySelector('#txtTaskName');
btnDeleteAll = document.querySelector('#btnDeleteAll');
taskList = document.querySelector('#task-list')
let items;



//* Load items
loadItems();

//* Call EventListeners
eventListeners();

function eventListeners() {

    //* SUBMIT EVENT (ADDING TASK)
    form.addEventListener('submit', addNewItem)

    //* DELETING EVENT
    taskList.addEventListener('click', deleteItem)

    //* DELETING ALL ITEMS
    btnDeleteAll.addEventListener('click', deleteAllItems)

}


//* ADDING NEW ITEM
function addNewItem(e) {
    e.preventDefault();
    console.log(input.value)
    if (input.value == '') {
        alert('Please type a task firstly.')
    } else {

        //* create item
        createItem(input.value)

        //* save to LS
        setItemToLS(input.value)

        //* clear input after adding
        input.value = ''
        console.log(li)
    }
}


//* LOADING ITEM

function loadItems(){
    items = getItemsFromLS();

    items.forEach(function(item){
        createItem(item)
    })
}


//* GET ITEMS FROM LOCAL STORAGE
function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items = [];
    }else {
        items = JSON.parse(localStorage.getItem('items'))
    }
    return items;
}


//* SET ITEM TO LOCAK STORAGE
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items))
}



function createItem(text){
     //* creating li
     li = document.createElement('li');
     li.className = 'list-group-item list-group-item-secondary'

     //* first way to adding text content to li
     // li.textContent = input.value

     //* second way to adding text to li
     li.appendChild(document.createTextNode(text))

     //* creating a
     a = document.createElement('a');
     a.classList = 'delete-item float-right';
     a.setAttribute('href', '#');

     //* first way to adding the i element to a element
     // i = document.createElement('i');
     // i.classList='fas fa-times';
     // a.appendChild(i)

     //* second way to adding the i element to a element
     a.innerHTML = '<i class="fas fa-times"></i>'

     //* appending
     li.appendChild(a)
     taskList.appendChild(li)
}


//* DELETING ITEM

function deleteItem(e) {
    if (e.target.className == "fas fa-times") {
        if (confirm('Are you sure?')) {
            console.log('delete button is clicked');
            if (e.target.parentElement.parentElement.className = 'list-group-item') {
                e.target.parentElement.parentElement.remove()

                //* delete also from LS
                deleteItemFromLS(e.target.parentElement.parentElement.textContent)
            }
        }
        e.preventDefault();
    };
}


//* DELETING ALL ITEMS
function deleteAllItems(e) {

    if (confirm('Are you sure?')) {

        // //* First way to deleting all items
        // taskList.innerHTML = '';

        // //* second way
        // taskList.childNodes.forEach(function(item){

        //     if(item.nodeType===1){
        //         console.log(item);
        //         item.remove();

        //     }
        // })

        //* third way
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        }

        //* Delete all also from LS
        localStorage.clear();

    }
    e.preventDefault();
}


//* DELETING ALSO FROM LS

function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1)
        }
    })
    localStorage.setItem('items',JSON.stringify(items))
}
