import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import fetch from 'isomorphic-fetch';
import routes from './src/routes';
import configureStore from './src/store/configureStore';

const app = express();
let port = 3000;

app.get('/api/*', (req, res) => {
  res.send({ title: 'Hello World!' });
});

if (process.env.NODE_ENV === 'production') {
  let index = fs.readFileSync(path.join(__dirname, 'build/index.html')).toString();

  app.use(express.static(path.join(__dirname, 'build'), { index: false }));

  app.get('*', (req, res) => {
    const url = `http://${req.headers.host}/api${req.url}`;

    match({ routes, location: req.url }, (err, redirect, props) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }

      if (!props) {
        res.status(404).send('Not Found');
        return;
      }

      fetch(url)
        .then(response => response.json())
        .then(json => {
          const store = configureStore(json);
          const root = renderToString(
            <Provider store={ store }>
              <RouterContext { ...props } />
            </Provider>
          );

          index = index.replace('<div id="root"></div>', `<div id="root">${root}</div>`);

          res.send(index);
        });
    });
  });
} else {
  const config = require('./package.json');
  port = config.proxy.match(/localhost:(.+)/)[1];
}

app.listen(port, () => {
  console.log('Server listening on port', port);
});
