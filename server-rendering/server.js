import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'

import App from './app'

let server = express()

server.use(express.static('dist'))

const Html = (props) => {
  return (
    <html>
      <head>
        <title>App</title>
        <link rel="stylesheet" type="text/css" href="/index.css" />
      </head>
      <body>
        <div id="root">{props.children}</div>
        <script src="/app.js"></script>
      </body>
    </html>
  );
};

server.get('/', (req, res) => {
  ReactDOMServer.renderToNodeStream(<Html><App/></Html>).pipe(res)
})

server.listen(3000, () => console.log('Listening on 3000'))

