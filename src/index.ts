import http from 'http';
import { createClient, CreateClientCommand } from './client/create';
import { initKafka, publishEvent } from './kafka';

const PORT = 8080;

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/client/create') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const command: CreateClientCommand = JSON.parse(body);
        const event = createClient(command);
        try {
          await publishEvent('client-events', event);
        } catch (err) {
          console.error('Failed to publish event', err);
        }
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

initKafka()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to initialize Kafka', err);
  });
