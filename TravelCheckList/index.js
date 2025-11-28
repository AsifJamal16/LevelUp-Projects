let list = JSON.parse(localStorage.getItem("packingList")) || [];

let input = document.getElementById("itemInput");
let category = document.getElementById("categorySelect");
let addBtn = document.getElementById("addBtn");
let listBox = document.getElementById("listContainer");

addBtn.addEventListener("click", () => {
    let itemName = input.value.trim();
    let itemCategory = category.value;

    if (itemName === "") return;
    let exists = list.some(it => it.name.toLowerCase() === itemName.toLowerCase() && it.category === itemCategory);
    if (exists) {
        alert("this item is already in your packing list!");
        return;
    }
    let newItem = {
        name: itemName,
        category: itemCategory,
        packed: false
    };

    list.push(newItem);
    input.value = "";
    saveData();
    showList();
});

function togglePacked(index) {
    list[index].packed = !list[index].packed;
    saveData();
    showList();
}

function deleteItem(index) {
    list.splice(index, 1);
    saveData();
    showList();
}

function showList() {
    listBox.innerHTML = "";
    list.forEach((item, i) => {
        let div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <div>
                <input type="checkbox" ${item.packed ? "checked" : ""} onclick="togglePacked(${i})">
                <span>${item.name} (${item.category})</span>
            </div>
            <button onclick="deleteItem(${i})">delete</button>
        `;

        listBox.appendChild(div);
    });
}

function saveData() {
    localStorage.setItem("packingList", JSON.stringify(list));
}

showList();
