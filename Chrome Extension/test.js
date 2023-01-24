const ulEl = document.querySelector("#ul-el")


ulEl.innerHTML = `<li><a id='a-el' href='#'>Testing</a></li><button id='btn-el'>Send</button>`
const btnEl = document.querySelector("#btn-el")

btnEl.addEventListener("click", function(){
    let aEl = document.querySelector("#a-el")
    console.log(aEl.textContent)
})

