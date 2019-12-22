const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const {success, error} = require('functions/statusMessage')

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
  let index = getIndex(req.params.id);

  if(typeof(index) == 'string') {

    res.json(error(index))

  } else {

    res.json(members[(index)])

  }
})

app.get('/api/members', (req, res) => {
  if(req.query.max != undefined && req.query.max > 0) {

    res.json(members.slice(0, req.query.max))

  } else {

    res.json(members)

  }
})

app.put('/api/members/:id', (req, res) => {
  let index = getIndex(req.params.id);

  if(typeof(index) == 'string') {

    res.json(error(index))

  } else {

    let same = false;

    for(let i = 0; i < members.length; i++) {

      if(req.body.name == members[i].name && req.params.id != members[i].id) {

        same = true;

        break;

      }
    }

    if(same) {

      res.json(error('Same name'))

    } else {

      members[index].name = req.body.name;
      
      res.json(success(true))

    }
    

  }
})

app.post('/api/members', (req, res) => {

  if(req.body.name) {

    let sameName = false;

    for(let i = 0; i < members.length; i++) {

      if(members[i].name == req.body.name) {

        res.json(error('Name already taken'))
        
        sameName = true;

        break;  
      }
    }

    if (sameName) {

      res.json(error('No name value'))

    } else {

      let member = 
      {
        id: members.length + 1,
        name: req.body.name
      } 
  
      members.push(member)
  
      res.json(success(member))

    }
  } 
})


app.listen(8080, () => {
  console.log('started on port 8080')
})

function getIndex(id) {
  for(let i = 0; i < members.length; i++) {
    if(members[i].id == id) {
      return i;
    }
  }
  return 'Wrong ID';
}