const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const users = [
  {
    id: 1,
    name: 'anton1'
  },
  {
    id: 2,
    name: 'ivan1'
  },
  {
    id: 3,
    name: 'anton2'
  },
  {
    id: 4,
    name: 'ivan2'
  },
  {
    id: 5,
    name: 'anton3'
  },
  {
    id: 6,
    name: 'ivan3'
  }
]
app.use(bodyParser.json())
const authenticationMiddleware = (req, res, next) => {
  console.log(req.headers)
  req.userId = req.headers.authorization
  next()
}

const isAdminMiddleware = (req, res, next) => {
  if (req.userId === '123123') {
    next()
  } else {
    res.status(403)
    res.send('you are not admin')
  }
}
app.use(authenticationMiddleware)
const perPage = 2

app.get('/', (req, res) => {
  const page = req.query.page
  const firstEl = perPage * (page - 1);
  const lastEl = perPage * (page - 1) + perPage

  res.json(users.slice(firstEl, lastEl))
})

app.get('/:id', (req, res) => {
  res.json(users.find(e => e.id === Number(req.params.id)))
})

app.post('/', isAdminMiddleware,(req, res) => {
  console.log(req.userId)
  users.push(req.body)
  if (!req.body.name) {
    res.status(400)
    res.send('you didn`t send name')
    return
  }
  res.status(201)
  res.send('ok')
})

app.put('/', (req, res) => {
  const user = users.find(e => e.id === Number(req.query.id))
  user.name = req.body.name
  res.send('ok')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
