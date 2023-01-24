let myLeads = []
const alertEl = document.querySelector("#alert-el")
const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#input-btn")
const tabBtn = document.querySelector("#tab-btn")
const deleteBtn = document.querySelector("#delete-btn")
const ulEl = document.querySelector("#ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function findDuplicate(url, myLeads){
    if(myLeads.length === 0 ){
        return true
    } else {
        for (element of myLeads) {
            if (element === url) {
                return false
            }
        }
    }
    return true
}

tabBtn.addEventListener("click", function(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        inputEl.value = tabs[0].url
        if (findDuplicate(tabs[0].url, myLeads)){
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        } else {
            alertEl.innerHTML = "<h2>The URL already exists</h2>"
        }        
    });

})

function render(leads) {
    let listItems = ""
    
    leads.forEach(element => {
        //listItems += "<li><a href=" + element + " target='_blank'>" + element + "</a></li>"
        listItems +=
        `
        <li>
            <a id='a-element' href='${element}' target='_blank'>${element}</a><button id='deleteLead-btn'>x</button>
        </li>
        `
    });
    ulEl.innerHTML = listItems
}

ulEl.addEventListener('click', (e) =>{
    console.log(e.target.textContent)
})

inputBtn.addEventListener("click", function(){

    if(inputEl.value) {
        if (findDuplicate(inputEl.value, myLeads)) {
            myLeads.push(inputEl.value)
            
            localStorage.setItem('myLeads', JSON.stringify(myLeads))
            render(myLeads)
        } else {
            alertEl.innerHTML = "<h2>The URL already exists</h2>"
            inputEl.value = ""            
        }
    }   
})

deleteBtn.addEventListener("click", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})