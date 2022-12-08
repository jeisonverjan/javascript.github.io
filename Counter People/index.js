count = 0
saveEl = document.getElementById("save-el")
countEl = document.getElementById("count-el")

function increment() {
    count +=1
    countEl.textContent = count
}

function save() {
    countDash = count + " - "
    saveEl.textContent += countDash
    countEl.textContent = 0
    count = 0
}
