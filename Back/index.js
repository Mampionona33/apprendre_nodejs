const http = require('http');
const server = http.createServer();
const PORT = 8000;
server.listen(PORT, 'localhost');
server.on('listening', () => {
  console.log('server start on port : %s', PORT);
});
server.on('request', (request, response) => {
  const { method, url } = request;
  console.log('url demandée :%s %s', method, url);
  if (request.url === '/main.css') {
    response.setHeader('Content-Type', 'text/css');
    response.write('body{font-size:18px; color: red;}');
    response.end();
  } else {
    const content_type = 'text/html; charset=utf-8';
    response.setHeader('Content-Type', content_type);
    response.write('<link rel="stylesheet" href="/main.css"');
    response.end('<><h1>Salut à toi</h1></>');
  }
});
