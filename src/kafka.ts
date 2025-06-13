import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'crm',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

export async function initKafka(): Promise<void> {
  await producer.connect();
}

export async function publishEvent(topic: string, event: unknown): Promise<void> {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(event) }],
  });
}
