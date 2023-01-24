const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCart = document.getElementById('template-cart').content
const fragment = document.createDocumentFragment()
let cart = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
        showCart()
    }
})

cards.addEventListener('click', (e) => {
    addProduct(e)
})

const fetchData = async () =>{
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        printCards(data)
    } catch (error) {
        console.log(error)
    }
}

items.addEventListener('click', (e) => {
    const product = cart[e.target.dataset.id]
    if (e.target.classList.contains('btn-info')) {
        product.quantity++
        showCart()
    } else if (e.target.classList.contains('btn-danger')) {
        product.quantity--
        if (product.quantity === 0) {
            delete cart[e.target.dataset.id]
        }
        showCart()
    }
    e.stopPropagation()
})

const printCards = (data) => {

    data.forEach(element => {
        templateCard.querySelector('h5').textContent = element.title
        templateCard.querySelector('p').textContent = element.precio
        templateCard.querySelector('img').setAttribute('src', element.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = element.id
        const stack = templateCard.cloneNode(true)
        
        fragment.appendChild(stack)
    });
    cards.appendChild(fragment) 
}

const addProduct = (e) => {
    if (e.target.classList.contains('btn-dark')) {
        setCart(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCart = (element) => {
    const product = {
        id: element.querySelector('.btn-dark').dataset.id,
        title: element.querySelector('h5').textContent,
        price: element.querySelector('p').textContent,
        quantity: 1
    }
    if (cart.hasOwnProperty(product.id)) {
        product.quantity = cart[product.id].quantity + 1
    }
    cart[product.id] = {...product}
    showCart()
}

const showCart = () => {
    items.innerHTML = ''
    Object.values(cart).forEach(product => {
        templateCart.querySelector('th').textContent = product.id
        templateCart.querySelectorAll('td')[0].textContent = product.title
        templateCart.querySelectorAll('td')[1].textContent = product.quantity
        templateCart.querySelector('.btn-info').dataset.id = product.id
        templateCart.querySelector('.btn-danger').dataset.id = product.id
        templateCart.querySelector('span').textContent = product.price * product.quantity

        const stack = templateCart.cloneNode(true)
        fragment.appendChild(stack)
    })
        items.appendChild(fragment)
        showFooter()

        localStorage.setItem('cart', JSON.stringify(cart))
}

const showFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(cart).length === 0) {
        footer.innerHTML = `
            <th scope='row' colspan='5'>Empty car - start buying!!</th>
        `
        return
    }
    const nQuantity = Object.values(cart).reduce((counter, {quantity}) => counter + quantity, 0)
    const nPrice = Object.values(cart).reduce((counter, {quantity, price}) => counter + quantity * price, 0 )
    
    templateFooter.querySelectorAll('td')[0].textContent = nQuantity
    templateFooter.querySelector('span').textContent = nPrice

    const stack = templateFooter.cloneNode(true)
    footer.appendChild(stack)

    const btnEmptyAll = document.getElementById('empty-cart')
    btnEmptyAll.addEventListener('click', () => {
        cart = {}
        showCart()
    })
}
