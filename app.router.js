const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/api', (req, res) => {
  res.send('Root API')
})

app.get('/api/books/:id', (req, res) => {
  res.send(req.params)
})

app.listen(8080, () => {
  console.log('started on port 8080')
})