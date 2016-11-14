import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let server = app.listen(3000, function () {
  console.log('Listening on port %s...', server.address().port);
})

app.get('/', function(req, res) {
  res.status(200).json({
    message:'This online ad system is fine and dandy'
  })
})