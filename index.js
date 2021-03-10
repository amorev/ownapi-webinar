const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

async function filesWork() {
  fs.readFile('1', (err, file1) => {
    fs.readFile('2', (err, file2) => {
      fs.readFile('3', (err, file3) => {
        fs.readFile('4', (err, file4) => {
          fs.readFile('5', (err, file5) => {
            // Работа с файлам
          })
        })
      })
    })
  })
  const file1 = await fs.readFile('1');
  const file2 = await fs.readFile('2');
  const file3 = await fs.readFile('3');
  const file4 = await fs.readFile('4');
  const file5 = await fs.readFile('5');
}
