const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const statusMessage = require('functions/statusMessage')

app.use(morgan('dev')); //middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/json

const members = [
  {
    id: 1,
    name: 'Benjamin'
  },
  {
    id: 2,
    name: 'Johnny'
  },
  {
    id: 3,
    name: 'Doe'
  },
]

app.get('/api/members/:id', (req, res) => {
  res.json(members[(req.params.id)])
})

app.get('/api/members', (req, res) => {
  if(req.query.max != undefined && req.query.max > 0) {
    res.json(members.slice(0, req.query.max))
  } else {
    res.json(members)
  }
})

app.post('/api/members', (req, res) => {

  if(req.body.name) {

    let sameName = false;
    for(let i = 0; i < members.length; i++) {

      if(members[i].name == req.body.name) {

        res.json(statusMessage.error('Name already taken'))
        
        sameName = true;

        break;  
      }
    }

    if (sameName) {

      res.json(statusMessage.error('No name value'))

    } else {

      let member = 
      {
        id: members.length + 1,
        name: req.body.name
      } 
  
      members.push(member)
  
      res.json(statusMessage.success(member))

    }
  } 
})


app.listen(8080, () => {
  console.log('started on port 8080')
})