async function main() {

    let bookJSON = await fetch('http://localhost:3001/listBooks')
    let books = await bookJSON.json()
    books.forEach(viewBook)
}

function viewBook(book) {
    let root = document.querySelector('#root')

    let li = document.createElement('li')
    li.textContent = book.title

    let quantInput = document.createElement('input')
    quantInput.value = book.quantity

    let saveBtn = document.createElement('button')
    saveBtn.textContent = 'Save'

    saveBtn.addEventListener('click', () => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: quantInput.value
            })
        })
    })

    li.append(quantInput, saveBtn)

    root.append(li)
}

main();
