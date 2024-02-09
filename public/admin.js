async function main() {
    let books = await fetch('http://localhost:3001/listBooks')
    let booksJSON = await books.json()
    console.log(booksJSON)

    booksJSON.forEach(function(book) {
        let div = document.createElement('div')
        div.innerHTML = `
            <img src = "${book.imageURL}" width="200" />
            <h3 id="title-${book.id}">${book.title}</h3>
            <p>Year pushlished: ${book.year}</p>
            <p>Quantity: ${book.quantity}</p>
            <input id="${book.id}" type="text" />
            <input type="submit" onclick="changeTitle(${book.id})" />
        `
        document.body.append('div')
    })
}

main()

async function changeTitle(id) {
    let input = document.getElementById(id)
    let value = input.value

    let response = await fetch('http://localhost:3001/updateBook',  {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            title: value
        })
    })
    let responseJSON = await response.json()
    console.log(responseJSON)
}
