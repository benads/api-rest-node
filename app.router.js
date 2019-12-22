const express = require('express');
const app = express();
const morgan = require('morgan');
const statusMessage = require('functions/statusMessage');

app.use(morgan('dev')); //middleware

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
  res.json(statusMessage.success(members[(req.params.id)]))
})

app.get('/api/members', (req, res) => {
  console.log(req.query.max);
  if(req.query.max != undefined && req.query.max > 0) {
    res.json(statusMessage.success(members.slice(0, req.query.max)))
  } else if(req.query.max != undefined) {
    res.json(statusMessage.error('Wrong value'))
  } else {
    res.json(statusMessage.success(members))
  }
})

app.listen(8080, () => {
  console.log('started on port 8080')
})