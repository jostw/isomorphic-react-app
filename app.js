const express = require('express');

const app = express();
let port = 3000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
} else {
  const config = require('./package.json');
  port = config.proxy.match(/localhost:(.+)/)[1];
}

app.get('/api/', (req, res) => {
  res.send({ title: 'Hello World!' });
});

app.listen(port, () => {
  console.log('Server listening on port', port);
});
