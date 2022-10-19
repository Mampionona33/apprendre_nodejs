'use strict';
const router = require('find-my-way')();
const { createReadStream } = require('fs');
const { createServer } = require('http');
const { join } = require('path');

const staticFile = (req, res, params) => {
  const fileName = join(__dirname, 'files', params.file);
  createReadStream(fileName).pipe(res);
};

router.get('/files/:file', staticFile);
router.head('/files/:file', staticFile);

const server = createServer().listen(4000);
server.on('listening', () => console.log('server start'));
server.on('request', (req, res) => router.lookup(req, res));
