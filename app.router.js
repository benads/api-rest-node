const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('./config')
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

/**
 * Show all the members
 */

app.get(config.rootAPI + 'members', (req, res) => {
  if(req.query.max != undefined && req.query.max > 0) {

    res.json(members.slice(0, req.query.max))

  } else {

    res.json(success(members))

  }
})


/**
 * Show the member with id of the params
 */

app.get(config.rootAPI + 'members/:id', (req, res) => {

  let index = getIndex(req.params.id);

  if(typeof(index) == 'string') {

    res.json(error(index))

  } else {

    res.json(success(members[(index)]))

  }
})


/**
 * Edit/Update the member with id of the params
 */

app.put(config.rootAPI + 'members/:id', (req, res) => {

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

/**
 * Create a new member
 */

app.post(config.rootAPI + 'members', (req, res) => {

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
        id: createId(),
        name: req.body.name
      } 
  
      members.push(member)
  
      res.json(success(member))

    }
  } 
})

/***
 * Delete the member with id of the params
 */

 app.delete(config.rootApi + 'members/:id', (req, res) => {
  let index = getIndex(req.params.id);

  if(typeof(index) == 'string') {

    res.json(error(index))

  } else {

    members.splice(index, 1)

    res.json(success(members))

  }
})

/**
 * Config port listening 
 */

app.listen(config.port, () => {
  console.log('started on port ' + config.port)
})


function getIndex(id) {
  for(let i = 0; i < members.length; i++) {
    if(members[i].id == id) {
      return i;
    }
  }
  return 'Wrong ID';
}

function createId() {
  return members[members.length-1].id + 1;
}