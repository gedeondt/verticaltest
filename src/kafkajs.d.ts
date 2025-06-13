declare module 'kafkajs' {
  export class Kafka {
    constructor(config: { clientId: string; brokers: string[] });
    producer(): Producer;
  }

  export interface Producer {
    connect(): Promise<void>;
    send(payload: { topic: string; messages: { value: string }[] }): Promise<void>;
  }
}
