const todo = document.getElementById("todo")
const lists = document.getElementById("lists")
const btn1 = document.getElementById("btn1")
const clearAll = document.getElementById("clearAll")
let data = []

btn1.addEventListener("click", () => {
    if (todo.value !== "") {
        data.push(todo.value)
        localStorage.setItem("data", JSON.stringify(data))
        display()
        clearAll.style.display = "block";
    }
    else {
        alert("Enter todo please")
    }
})

clearAll.addEventListener("click", () => {
    data = [];
    localStorage.setItem("data", JSON.stringify(data));
    display();
});

todo.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btn1.click();
    }
})

lists.addEventListener('click', (e) => {
    // remove
    if (e.target.classList.contains('remove')) {
        const listDiv = e.target.closest('.list');
        const span = listDiv.querySelector('span');
        let value = span.innerText;

        // remove one matching item from the array (important for duplicates)
        const index = data.indexOf(value)
        if (index !== -1) {
            data.splice(index, 1)
        }
        localStorage.setItem("data", JSON.stringify(data))
        listDiv.remove();
        clearAll.style.visibility = data.length === 0 ? "hidden" : "visible";
        return;
    }

    // strike when checkbox clicked
    if (e.target.matches('input[type="checkbox"]')) {
        const listDiv = e.target.closest('.list');
        const span = listDiv.querySelector('span');
        span.classList.toggle('line-through', e.target.checked);
    }
});

const raw = localStorage.getItem("data");
data = raw ? JSON.parse(raw) : []
clearAll.style.display = data.length === 0 ? "none" : "block";

function display() {

    if (data.length === 0) {
        lists.innerHTML = "<h2>Start Writing TODO Again ✍🏻📝...</h2>";
        clearAll.style.display = "none";
        todo.value = "";
        return;
    }

    lists.innerHTML = ""
    data.forEach((item) => {
        const div = document.createElement("div")
        div.classList.add("list")
        div.innerHTML = `
                <span>${item}</span>
                <div class="inner">
                    <input type="checkbox">
                    <button class="remove clear">Clear</button>
                </div>`

        lists.appendChild(div)
        todo.value = ""
    });
}

display()