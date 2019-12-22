const express = require('express');
const app = express();
const morgan = require('morgan');

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
  res.send(members[(req.params.id)])
})

app.get('/api/members', (req, res) => {
  if(req.query.max != undefined && req.query.max > 0) {
    res.send(members.slice(0, req.query.max))
  } else {
    res.send(members)
  }
})

app.listen(8080, () => {
  console.log('started on port 8080')
})