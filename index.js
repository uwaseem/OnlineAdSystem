import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

import userInfo from './mockDB/users.json'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let server = app.listen(3000, () => {
  console.log('Listening on port %s...', server.address().port);
})

app.get('/', (req, res) => {
  res.status(200).json({
    message:'This online ad system is fine and dandy'
  })
})

app.get('/users', (req, res) => {
  const users = Object.keys(userInfo)
  console.log(users)

  res.status(200).send(users)
})

app.get('/userInfo/:user', (req, res) => {
  console.log('calling here', req.params.user)
  const user = req.params.user

  res.status(200).json({
    user,
    userInfo: userInfo[user] || 'can\'t find user in DB'
  })
})