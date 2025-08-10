import Kafka from "../../providers/kafka/kafka-provider.js";

interface KafkaStreamLoggerOptions {
  client: {
    id: string;
    brokers: string;
  };
  topic: string;
}

export default function KafkaStreamLogger(opts: KafkaStreamLoggerOptions) {
  const producerStream = Kafka.Producer.createWriteStream(
    {
      "client.id": opts.client.id,
      "metadata.broker.list": opts.client.brokers,
      "compression.codec": "gzip",
    },
    {},
    {
      topic: opts.topic,
    },
  );

  producerStream.on("error", (err) => {
    // Here's where we'll know if something went wrong sending to Kafka
    console.error(err);
  });

  return producerStream;
}
