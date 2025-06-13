# Vertical Test CRM

This repository contains a minimal CRM prototype written in TypeScript. The project uses a vertical slice approach with event sourcing. The current implementation exposes a single API endpoint to create a client.

## Running

Use the TypeScript compiler to build the project:

```bash
tsc
```

Start the generated JavaScript server:

```bash
node dist/index.js
```

The server listens on `http://localhost:8080`.

## API

`POST /client/create`

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

Response body is a `ClientCreated` event containing the assigned identifier and the provided data.
