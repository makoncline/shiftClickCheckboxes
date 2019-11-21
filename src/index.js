const items = makeItems(10);
const list = document.querySelector('.list');
displayItems(items, list);
let lastClickIndex = null;

function handleClick(e) {
  const index = e.target.parentElement.dataset.index;
  items[index].checked = e.target.checked;
  if (e.shiftKey) {
    if (!lastClickIndex) {
      lastClickIndex = index;
    } else {
      const low = lastClickIndex < index ? lastClickIndex : index;
      const high = lastClickIndex < index ? index : lastClickIndex;
      for (let i = low; i <= high; i++) {
        items[i].checked = e.target.checked;
      }
    }
  } else {
    //lastClickIndex = index;
  }
  lastClickIndex = index;
  displayItems(items, list);
}

function makeItems(num) {
  let items = [];
  for (let i = 0; i < num; i++) {
    const item = { checked: false, title: `This is item ${i}` };
    items.push(item);
  }
  return items;
}

function displayItems(items, list) {
  list.innerHTML = '';
  items.map((item, i) => {
    const div = document.createElement('div');
    div.classList.add('item');
    div.setAttribute('data-index', `${i}`);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.checked;
    checkbox.addEventListener('click', handleClick);

    const text = document.createElement('p');
    text.textContent = item.title;
    div.appendChild(checkbox);
    div.appendChild(text);

    list.appendChild(div);
  });
}

