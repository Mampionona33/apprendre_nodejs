'use strict';
const { createServer } = require('http');
const server = createServer().listen(4000);
const { parse } = require('url');
const { format } = require('date-fns');

server.on('listening', () => {
  console.log('server start');
});

server.on('request', (req, res) => {
  const { query } = parse(req.url, true);
  const text = format(new Date(), 'YYYY-MM-DD');
  if (query === 'svg') {
    res.setHeader('Content-Type', 'text/html');
    res.end(`<svg viewBox="0 0 200 100" >
      <text x="0" y="50">${text}</text>
    </svg>`);
  } else {
    res.end(text);
  }
});
