const ACCESS_TOKEN = "rb5Wcel1i9ev7KQpqFucLTec1_wNTdWbeBOx0GeGgkc";
let val = "";
let page = 1;

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const search = document.getElementById("search");
const card = document.getElementById("card");

btn2.style.display = "none";
btn3.style.display = "none";

btn1.addEventListener("click", () => {
    console.log(search.value);
    val = search.value;
    if (val === "") {
        card.innerHTML = `
    <div class="placeholder">
    <h2>Nothing found, try again 🔄️...</h2>
    </div>`
    } else {
        search.value = "";
        card.querySelector('.placeholder')?.remove();
        api(val);
        btn2.style.display = "block";
        btn3.style.display = "block";
    }
})

search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btn1.click();
    }
});

async function api(val) {
    let response = await fetch(`https://api.unsplash.com/search/photos?query=${val}&client_id=${ACCESS_TOKEN}&page=${page}`)
    let result = await response.json();
    console.log(result);
    displayData(result)
}

function displayData(res) {
    res.results.map((data) => {
        let div = document.createElement("div")
        div.setAttribute("class", "card");
        div.innerHTML =
            `<div class="upper">
                <img src=${data.user.profile_image.large}>
                <span>${data.user.name}</span>
            </div>
            <div class="middle">
                <img src=${data.urls.regular}>
                <div>
                    <span>${data.alt_description}</span>
                </div>
            </div>
            <div class="lower">
                <span>❤️${data.likes}</span>
                <a href=${data.links.html}>Source</a>
            </div>`;
        document.getElementById("card").appendChild(div);
    })
}

btn2.addEventListener("click", () => {
    page++;
    api(val);
})

btn3.addEventListener("click", () => {
    card.innerHTML = `
    <div class="placeholder">
    <h2>Search again to find Images 🔄️...</h2>
    </div>`
    btn2.style.display = "none";
    btn3.style.display = "none";
})