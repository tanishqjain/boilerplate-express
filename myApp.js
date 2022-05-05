var express = require('express');
const bodyParser = require('body-parser')
var app = express();

console.log('Hello World')

app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip)
  next()
})

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

let value = 'Hello json'

app.get('/json', function(req, res) {

  if (process.env.MESSAGE_STYLE === 'uppercase') {
    value = 'Hello json'.toUpperCase()
  }

  res.json({
    'message': value
  })
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.json({
    'time': req.time
  })
})

app.get('/:word/echo', (req, res) => {
  res.json({
    'echo': req.params.word
  })
})

app.get('/name', (req, res) => {
  res.json({
    'name': req.query.first+' '+req.query.last
  })  
}).post('/name',(req, res) => {
  res.json({
    'name': req.body.first +' '+ req.body.last
  }) 
})

































module.exports = app;
