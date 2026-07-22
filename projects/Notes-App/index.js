const notes = document.getElementById("notes");
let data = []
let div, id = 0;
let date;

const raw = localStorage.getItem("data");
data = raw ? JSON.parse(raw) : []

document.getElementById("btn1").addEventListener("click", () => {
    inputdata();
    updateStorage();
})

notes.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
        const listDiv = e.target.closest('.note');

        const index = Number(listDiv.dataset.id);
        // const index = data.indexOf(desc);
        if (index !== -1)
            data.splice(index, 1);
        listDiv.remove();

        localStorage.setItem("data", JSON.stringify(data));
        return;
    }

    if (e.target.classList.contains('edit')) {
        const note = e.target.closest('.note');
        const editBtn = e.target;

        const desc = note.querySelector('.desc');
        const txt = note.querySelector('.txt');

        const Id = Number(note.dataset.id);
        const isEditing = !txt.classList.contains('hidden'); // textarea visible => editing mode

        if (!isEditing) {
            // switch Edit -> Save (enable textarea)
            resetAllNotesUI(Id);
            txt.value = desc.innerHTML;
            desc.classList.add("hidden");
            txt.classList.remove("hidden");
            editBtn.innerText = "Save";
        }
        else {

            const original = desc.innerHTML; 
            const newText = txt.value;

            if (newText.trim() === "" || newText === original) {
                // no real change -> just revert UI without updating time/data
                display();
                return;
            }
            // real change -> update time + storage
            date = new Date().toLocaleString();
            data[Id] = ({ val: marked.parse(newText), time: date });
            localStorage.setItem("data", JSON.stringify(data));
            display();
            return;
        }
    }
});

function inputdata() {
    date = new Date().toLocaleString();
    div = document.createElement("div");
    div.classList.add("note");
    div.dataset.id = id++;
    div.innerHTML = `
              <div class="top">
                    <button class="btn edit">Edit</button>
                    <button class="btn remove">Remove</button>
                </div>
                <div class="bottom">
                    <div class="desc"></div>
                    <textarea class="txt hidden"></textarea>
                </div>
                <span class="now">${date}</span>`
    notes.appendChild(div);
}

function display() {
    updateStorage()
    notes.innerHTML = "";
    id = 0;
    data.forEach((item) => {
        div = document.createElement("div");
        div.classList.add("note");
        div.dataset.id = id++;
        div.innerHTML = `
              <div class="top">
                    <button class="btn edit">Edit</button>
                    <button class="btn remove"> Remove</button >
                </div >
            <div class="bottom">
                <div class="desc">${item.val}</div>
                <textarea class="txt hidden"></textarea>
            </div>
            <span class="now">${item.time}</span>`
        notes.appendChild(div);
    })
}

function resetAllNotesUI(currentId) {
    document.querySelectorAll(".note").forEach((note) => {
        const isCurrent = Number(note.dataset.id) === currentId;

        const desc = note.querySelector(".desc");
        const txt = note.querySelector(".txt");
        const editBtn = note.querySelector(".edit");

        if (!isCurrent) {
            // normal state
            desc.classList.remove("hidden");
            txt.classList.add("hidden");
            editBtn.innerText = "Edit";
        }
    });
}

function updateStorage() {
    data = data.filter(item => item);
    localStorage.setItem("data", JSON.stringify(data));
}
display();