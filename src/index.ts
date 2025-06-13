import http from 'http';
import { createClient, CreateClientCommand } from './client/create';

const PORT = 8080;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/client/create') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const command: CreateClientCommand = JSON.parse(body);
        const event = createClient(command);
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(event));
      } catch (err) {
        res.writeHead(400);
        res.end('Invalid JSON');
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
