const input = document.querySelector('#input');
const addBtn = document.querySelector('.btn-add');
const clearBtn = document.querySelector('.btn-clear');
const itemList = document.querySelector('#item-list');
const filter = document.querySelector('.filter');
const removeBtn = document.querySelector('.remove-item');

// Hide/Show UI
const items = document.querySelectorAll('li');
if(items.length === 0) {
    clearBtn.style.display = 'none';
    filter.style.display = 'none';
} else {
    clearBtn.style.display = 'block';
    filter.style.display = 'block';
}

const onSubmit = (e) => {
    e.preventDefault();
    const newItem = input.value;
    if(newItem === '') {
        alert('Please add Item');
        return;
    }

    addItem(newItem);

    input.value = '';
}

//Add Item
const addItem = (item) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);  
}

//Create Button 
const createButton = (classes) => {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

//Create icon
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

  //Event Listeners
addBtn.addEventListener('click', onSubmit);




