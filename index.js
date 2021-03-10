const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const axios = require('axios')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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
  const firstEl = req.query.first || 0
  const offset = req.query.offset || 10
  const lastEl = firstEl + offset
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(resp => {
      const users = resp.data
      const filteredUsers = req.query.name ? users.filter(user => user.name === req.query.name) : users

      res.json(filteredUsers.slice(firstEl, lastEl).map(user => {
        return {
          ...user,
          name: user.name + 'asd'
        }
      }))
    })
})

app.get('/:id', (req, res) => {
  res.json(users.find(e => e.id === Number(req.params.id)))
})

app.post('/', isAdminMiddleware, (req, res) => {
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
