let defaultLists = [
  { date: "2025-07-11", vegetables: ["Огурец", "Broccoli", "Spinach", "Tomato", "Cucumber", "Pepper", "Onion", "Garlic", "Potato", "Lettuce"] },
  { date: "2025-07-11", vegetables: ["Carrot", "Broccoli", "Spinach", "Tomato", "Cucumber", "Pepper", "Onion", "Garlic", "Potato", "Lettuce"] },
  { date: "2025-07-11", vegetables: ["Carrot", "Broccoli", "Spinach", "Tomato", "Cucumber", "Pepper", "Onion", "Garlic", "Potato", "Lettuce"] },
  { date: "2025-07-11", vegetables: ["Carrot", "Broccoli", "Spinach", "Tomato", "Cucumber", "Pepper", "Onion", "Garlic", "Potato", "Lettuce"] },
  { date: "2025-07-11", vegetables: ["Carrot", "Broccoli", "Spinach", "Tomato", "Cucumber", "Pepper", "Onion", "Garlic", "Potato", "Lettuce"] },
  { date: "2025-07-11", vegetables: ["Carrot", "Broccoli", "Spinach", "Tomato", "Cucumber", "Pepper", "Onion", "Garlic", "Potato", "Lettuce"] },
  { date: "2025-07-11", vegetables: ["Carrot", "Broccoli", "Spinach", "Tomato", "Cucumber", "Pepper", "Onion", "Garlic", "Potato", "Lettuce"] },
  { date: "2025-07-11", vegetables: ["Carrot", "Broccoli", "Spinach", "Tomato", "Cucumber", "Pepper", "Onion", "Garlic", "Potato", "Lettuce"] },
  { date: "2025-07-11", vegetables: ["Carrot", "Broccoli", "Spinach", "Tomato", "Cucumber", "Pepper", "Onion", "Garlic", "Potato", "Lettuce"] },
  { date: "2025-07-10", vegetables: ["Apple", "Banana", "Orange", "Grape", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Cherry", "Pineapple"] },
];

let lists = JSON.parse(localStorage.getItem('vegetableLists')) || defaultLists;

function renderLists() {
  const gridContainer = document.querySelector('.grid-container');
  gridContainer.innerHTML = '';
  lists.forEach((list, listIndex) => {
    const listDiv = document.createElement('div');
    listDiv.className = 'list';
    listDiv.innerHTML = `<h2>${list.date}</h2><ul class="vegetables-list"></ul>`;
    const ul = listDiv.querySelector('.vegetables-list');
    list.vegetables.forEach((veg, itemIndex) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.className = 'vegetable-name';
      span.textContent = veg;
      span.dataset.list = listIndex;
      span.dataset.item = itemIndex;
      span.addEventListener('click', makeEditable);
      li.appendChild(span);
      ul.appendChild(li);
    });
    gridContainer.appendChild(listDiv);
  });
}

function makeEditable(event) {
  const span = event.target;
  const listIndex = span.dataset.list;
  const itemIndex = span.dataset.item;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = span.textContent;
  input.dataset.list = listIndex;
  input.dataset.item = itemIndex;
  span.replaceWith(input);
  input.focus();
  input.addEventListener('blur', () => saveEdit(input));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      saveEdit(input);
    }
  });
}

function saveEdit(input) {
  const listIndex = parseInt(input.dataset.list);
  const itemIndex = parseInt(input.dataset.item);
  const newValue = input.value;
  lists[listIndex].vegetables[itemIndex] = newValue;
  localStorage.setItem('vegetableLists', JSON.stringify(lists));
  const span = document.createElement('span');
  span.className = 'vegetable-name';
  span.textContent = newValue;
  span.dataset.list = listIndex;
  span.dataset.item = itemIndex;
  span.addEventListener('click', makeEditable);
  input.replaceWith(span);
}

renderLists();

// ... (существующий код)

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.log('Service Worker registration failed:', error);
    });
}
