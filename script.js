const defaultLists = [
  {
    date: "2025-07-11",
    main: ["Carrot", "Broccoli", "Spinach", "Tomato", "Cucumber", "Pepper", "Onion", "Garlic", "Potato", "Lettuce"],
    extra: ["Zucchini", "Eggplant", "Radish"]
  },
  {
    date: "2025-07-10",
    main: ["Apple", "Banana", "Orange", "Grape", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Cherry", "Pineapple"],
    extra: ["Mango", "Kiwi"]
  },
  {
    date: "2025-07-10",
    main: ["Apple", "Banana", "Orange", "Grape", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Cherry", "Pineapple"],
    extra: ["Mango", "Kiwi"]
  },
  {
    date: "2025-07-10",
    main: ["Apple", "Banana", "Orange", "Grape", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Cherry", "Pineapple"],
    extra: ["Mango", "Kiwi"]
  },
  {
    date: "2025-07-10",
    main: ["Apple", "Banana", "Orange", "Grape", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Cherry", "Pineapple"],
    extra: ["Mango", "Kiwi"]
  },
  {
    date: "2025-07-10",
    main: ["Apple", "Banana", "Orange", "Grape", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Cherry", "Pineapple"],
    extra: ["Mango", "Kiwi"]
  },
  {
    date: "2025-07-10",
    main: ["Apple", "Banana", "Orange", "Grape", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Cherry", "Pineapple"],
    extra: ["Mango", "Kiwi"]
  },
  {
    date: "2025-07-10",
    main: ["Apple", "Banana", "Orange", "Grape", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Cherry", "Pineapple"],
    extra: ["Mango", "Kiwi"]
  },
  {
    date: "2025-07-10",
    main: ["Apple", "Banana", "Orange", "Grape", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Cherry", "Pineapple"],
    extra: ["Mango", "Kiwi"]
  },
  {
    date: "2025-07-10",
    main: ["Apple", "Banana", "Orange", "Grape", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Cherry", "Pineapple"],
    extra: ["Mango", "Kiwi"]
  },
];

const globalVegList = [
  "Carrot", "Broccoli", "Spinach", "Tomato", "Cucumber", "Pepper", "Onion", "Garlic", "Potato", "Lettuce",
  "Zucchini", "Eggplant", "Radish", "Mango", "Kiwi", "Cauliflower", "Cabbage", "Kale", "Asparagus", "Celery"
];

let lists = JSON.parse(localStorage.getItem('vegetableLists')) || defaultLists;
let selectedMain = null;
let selectedExtra = null;
let activeListIndex = null;

function renderLists() {
  const gridContainer = document.querySelector('.grid-container');
  gridContainer.innerHTML = '';
  lists.forEach((list, listIndex) => {
    const listDiv = document.createElement('div');
    listDiv.className = 'list';
    listDiv.innerHTML = `
      <h2>${list.date}</h2>
      <h3>Main List</h3>
      <ul class="main-list"></ul>
      <h3>Extra List</h3>
      <ul class="extra-list"></ul>
      <div class="list-actions" data-list="${listIndex}">
        <select onchange="replaceVegetable(${listIndex}, this)">
          <option value="">Select a vegetable</option>
          ${globalVegList.map(veg => `<option value="${veg}">${veg}</option>`).join('')}
        </select>
        <input type="text" placeholder="Enter vegetable name" onkeydown="if(event.key === 'Enter') replaceVegetable(${listIndex}, this)">
      </div>
    `;
    const mainUl = listDiv.querySelector('.main-list');
    const extraUl = listDiv.querySelector('.extra-list');
    list.main.forEach((veg, itemIndex) => {
      const li = document.createElement('li');
      li.textContent = veg;
      li.dataset.list = listIndex;
      li.dataset.item = itemIndex;
      li.dataset.type = 'main';
      li.addEventListener('click', () => selectVegetable(li, listIndex, itemIndex, 'main'));
      mainUl.appendChild(li);
    });
    list.extra.forEach((veg, itemIndex) => {
      const li = document.createElement('li');
      li.textContent = veg;
      li.dataset.list = listIndex;
      li.dataset.item = itemIndex;
      li.dataset.type = 'extra';
      li.addEventListener('click', () => selectVegetable(li, listIndex, itemIndex, 'extra'));
      extraUl.appendChild(li);
    });
    gridContainer.appendChild(listDiv);
  });
}

function selectVegetable(li, listIndex, itemIndex, type) {
  if (activeListIndex !== null && activeListIndex !== listIndex) return; // Only allow selections within the same list
  if (type === 'main') {
    if (selectedMain) selectedMain.classList.remove('selected');
    selectedMain = { li, listIndex, itemIndex };
    li.classList.add('selected');
  } else {
    if (selectedExtra) selectedExtra.classList.remove('selected');
    selectedExtra = { li, listIndex, itemIndex };
    li.classList.add('selected');
  }
  activeListIndex = listIndex;
  if (selectedMain && selectedExtra && selectedMain.listIndex === selectedExtra.listIndex) {
    swapVegetables();
  } else {
    showActions(listIndex);
  }
}

function swapVegetables() {
  const { listIndex: mainListIndex, itemIndex: mainItemIndex } = selectedMain;
  const { listIndex: extraListIndex, itemIndex: extraItemIndex } = selectedExtra;
  const temp = lists[mainListIndex].main[mainItemIndex];
  lists[mainListIndex].main[mainItemIndex] = lists[extraListIndex].extra[extraItemIndex];
  lists[extraListIndex].extra[extraItemIndex] = temp;
  saveLists();
  resetSelection();
  renderLists();
}

function showActions(listIndex) {
  document.querySelectorAll('.list-actions').forEach(actions => actions.classList.remove('active'));
  const actions = document.querySelector(`.list-actions[data-list="${listIndex}"]`);
  actions.classList.add('active');
}

function replaceVegetable(listIndex, element) {
  const selected = selectedMain || selectedExtra;
  if (!selected) return;
  const { itemIndex, type } = selected;
  const newValue = element.value;
  if (newValue) {
    lists[listIndex][type][itemIndex] = newValue;
    saveLists();
    resetSelection();
    renderLists();
  }
}

function saveLists() {
  localStorage.setItem('vegetableLists', JSON.stringify(lists));
}

function resetSelection() {
  if (selectedMain) selectedMain.li.classList.remove('selected');
  if (selectedExtra) selectedExtra.li.classList.remove('selected');
  selectedMain = null;
  selectedExtra = null;
  activeListIndex = null;
  document.querySelectorAll('.list-actions').forEach(actions => actions.classList.remove('active'));
}

renderLists();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.log('Service Worker registration failed:', error);
    });
}
