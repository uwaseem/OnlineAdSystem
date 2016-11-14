import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json({limit: '500mb'}))
app.use(bodyParser.urlencoded({limit: '500mb'}))

app.get('/', function(req, res) {
  res.status(200).json({
    message:'This online ad system is fine and dandy'
  });
});
app.listen(process.env.PORT || 3000);
