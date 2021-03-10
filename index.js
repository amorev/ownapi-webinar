const fs = require('fs')
let books = [];
let cities = [];
let users = [];

let handleUsers = (err, data) => {
  users = JSON.parse(data)
  fs.readFile('./cities.json', 'utf8', handleCitites)
}

fs.readFile('./books.json', 'utf8', (err, data) => {
  books = JSON.parse(data)
  fs.readFile('./users.json', 'utf8', handleUsers)
})

let handleCitites = (err, data) => {
  cities = JSON.parse(data)
  const mappedBooks = books.map(book => {
    let author = users.find(user => user.id === book.authorId)
    return {
      book: book,
      author: author,
      city: cities.find(city => city.id === author.city)
    }
  })
  console.log(mappedBooks)
}
