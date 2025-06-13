export interface CreateClientCommand {
  name: string;
  email: string;
}

export interface ClientCreatedEvent {
  type: 'ClientCreated';
  payload: {
    id: string;
    name: string;
    email: string;
  };
}

export function createClient(command: CreateClientCommand): ClientCreatedEvent {
  const id = generateId();
  return {
    type: 'ClientCreated',
    payload: {
      id,
      name: command.name,
      email: command.email,
    },
  };
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
