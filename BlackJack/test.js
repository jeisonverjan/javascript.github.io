let fruits = ['apple', 'orange', 'apple', 'apple', 'orange']
apples = ""
oranges = ""

fruits.forEach(element => {
    if (element === 'apple') {
        apples += element + ' '
    } else {
        oranges += element + ' '
    }
})

console.log(apples)
console.log(oranges)