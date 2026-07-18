
let user = document.getElementById("search")
let btn = document.getElementById("btn1")
let userprofile = document.getElementById("userprofile")

async function api(username) {
    let response = await fetch(`https://api.github.com/users/${username}`);
    let result = await response.json();
    console.log(result);
    display(result)
}

btn.addEventListener("click", async () => {
    userprofile.innerHTML = `<span class="loader"></span>`
    let userId = user.value;
    api(userId);
})


function display({ avatar_url,
    name,
    bio,
    followers,
    following,
    public_repos,
    html_url }) { // destructure

    // let {
    // avatar_url,
    // name,
    // bio,
    // followers,
    // following,
    // public_repos,
    // html_url
    // } = result;
    // console.log(result);

    if (!avatar_url) {
        userprofile.innerHTML = `<h2>User Not Found</h2>`
        return
    }

    if (!bio) {
        bio = 'Nothing in bio...'
    }
    userprofile.innerHTML =
        `<div id="left">
            <img src=${avatar_url}>
            <h2>${name}</h2>
            <p>${bio}</p>
        </div>
        <div id="right">
            <div id="ri">
                <div class="details">
                    <span>Followers - </span>
                    <span>${followers}</span>
                </div>
                <div class="details">
                    <span>Following - </span>
                    <span>${following}</span>
                </div>
                <div class="details">
                    <span>Repos - </span>
                    <span>${public_repos}</span>
                </div> 
            </div>
            <a href=${html_url} target="_blank">
            <button id="btn2">View Profile</button>
            </a>
        </div>`
}

user.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btn.click(); // triggers your existing click handler
    }
});