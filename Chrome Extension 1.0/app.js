const formEl = document.getElementById('form-el')
const leadsList = document.getElementById('leads-list')
const leadsTemplate = document.getElementById('leads-template').content
const fragment = document.createDocumentFragment()
const leadInput = document.getElementById('lead-input')
let leads = {}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('leads')) {
        leads = JSON.parse(localStorage.getItem('leads'))
    }
    showLeads()
})

formEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-lead-input')) {
        setLead(e)
        formEl.reset()
    }
    e.stopPropagation()
})

const setLead = (e) => {
    const leadInput = document.getElementById('lead-input').value
    if (leadInput.trim() === ''){
        return
    }
    const lead = {
        id: Date.now(),
        url: leadInput,
        edit: false,
        upload: false    
    }
    leads[lead.id] = lead
    
    showLeads()
}

const showLeads = () => {
    localStorage.setItem('leads', JSON.stringify(leads))

    leadsList.innerHTML = ''
    Object.values(leads).forEach((lead) => {
        const templateClone = leadsTemplate.cloneNode(true)

        templateClone.querySelector('input').value = lead.url
        templateClone.querySelector('input').setAttribute('name', lead.id)

        if (lead.edit) {
            templateClone.querySelectorAll('.fa-solid')[0].classList.replace('fa-pen', 'fa-cloud-arrow-up')
            templateClone.querySelector('input').disabled = false 
            templateClone.querySelector('input').setAttribute('autofocus', 'autofocus')           
        }
        
        templateClone.querySelector('input').setAttribute('name', lead.id)
        templateClone.querySelectorAll('.fa-solid')[0].dataset.id = lead.id
        templateClone.querySelectorAll('.fa-solid')[1].dataset.id = lead.id
        fragment.appendChild(templateClone)

    })
    leadsList.appendChild(fragment)
}

leadsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-minus')) {
        deleteLead(e)
    }
    if (e.target.classList.contains('fa-pen')) {
        editLead(e)
    }

    if (e.target.classList.contains('fa-cloud-arrow-up')) {
        modifyLead(e)
    }

    e.stopPropagation()
})

const deleteLead = (e) => {
    delete leads[e.target.dataset.id]
    showLeads()
}

const editLead = (e) => {
    leads[e.target.dataset.id].edit = true
    showLeads()
}

const modifyLead = (e) => {
    const inputs = document.querySelectorAll('input')
    let test = null
    inputs.forEach((ele) => {
        if (ele.name === e.target.dataset.id) {
                test = ele
        }
    })
    test.focus()
    //const updateValue = leadInput.value
    leads[e.target.dataset.id].url = test.value
    leads[e.target.dataset.id].edit = false
    showLeads()
}