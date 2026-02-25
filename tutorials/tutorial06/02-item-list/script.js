const array = ["apple", "orange", "banana", "kelly", "strawberry", "pear", "guava"]
const itemList = document.querySelector("#itemList")

function displayItems() {
    itemList.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        itemList.insertAdjacentHTML("beforeend", `
             <li> ${array[i]} </li>
        `)
    }
}

displayItems();