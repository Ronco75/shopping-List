const input = document.querySelector('#input');
const addBtn = document.querySelector('.btn-add');
const clearBtn = document.querySelector('.btn-clear');
const itemList = document.querySelector('#item-list');
const filter = document.querySelector('#filter');
const removeBtn = document.querySelector('.remove-item');
const form = document.querySelector('.item-form');

// Hide/Show UI
const checkUI = () => {
    const items = document.querySelectorAll('li');
    if(items.length === 0) {
        clearBtn.style.display = 'none';
        filter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        filter.style.display = 'block';
    }
}

// Display Item on DOMContentLoaded
const displayItems = () => {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItem(item));
    checkUI();
}
    
//Add Item on sumbit
const onSubmit = (e) => {
    e.preventDefault();
    const newItem = input.value;
    if(newItem === '') {
        alert('Please add Item');
        return;
    }

    addItem(newItem);
    addItemToStorage(newItem);
    checkUI();
    input.value = '';
}

//Add Item function (UI)
const addItem = (item) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);  
}

//Add Item to local storage
const addItemToStorage = (item) => {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//Create Button (UI)
const createButton = (classes) => {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

//Create icon (UI)
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}


const onClickItem = (e) => {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    }
}

//Remove Item function
const removeItem = (item) => {
        if(confirm('Are you sure?')) {
            //Remove Item from UI
            item.remove();
            //Remove Item from local storage
            removeItemFromStorage(item.textContent);
        }
    checkUI();
}

const removeItemFromStorage = (item) => {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

const getItemsFromStorage = () => {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }
    else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

//Clear All Items
const clearItems = () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    checkUI();
}

// Filter Items
const filterItems = (e) => {
    const items = document.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        itemName.indexOf(text) != -1 ?
         item.style.display = 'flex' :
         item.style.display = 'none';
    })
}

//Event Listeners
form.addEventListener('submit', onSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);