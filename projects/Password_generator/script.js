const slider = document.getElementById("slider");
const percentage = document.getElementById("percentage");
const password = document.getElementById("pswrd");
const btn = document.getElementById("btn");
const uprCase = document.getElementById("uprcase");
const lowerCase = document.getElementById("lwrcase");
const num = document.getElementById("num");
const sym = document.getElementById("sym");
const copy = document.getElementById("copy")

slider.addEventListener("input", (e) => {
  // console.log(e.target.value);
  percentage.innerHTML = `${e.target.value}`
})

btn.addEventListener("click", (e) => {
  const capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const small = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = `~!@#$%^&*()_+-={}[]:"',./<>?"`;
  let final = "";

  if (uprCase.checked) {
    final += capital;
  }
  if (lowerCase.checked) {
    final += small;
  }
  if (num.checked) {
    final += numbers;
  }
  if (sym.checked) {
    final += symbols;
  }
  if (final != "") {

    let gen = "", rand = 0;
    for (let i = 0; i < slider.value; i++) {
      rand = Math.floor(Math.random() * final.length)
      gen += final[rand];
      // console.log(password.value);
    }
    password.value=gen;
    console.log(gen);
  }
  else {
    alert("Must select one checkbox...")
  }
})

copy.addEventListener("click", () => {
  if (password.value) {

    // Copy the text inside the text field
    navigator.clipboard.writeText(password.value);
    alert("Copied the text: " + password.value);
  }
  else {
    alert("Nothing copied");
  }
});
