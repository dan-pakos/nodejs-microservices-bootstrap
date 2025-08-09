import Kafka from '../../providers/kafka/kafka-provider.js'
import { ProducerOptions } from './logger.js'

export default function KafkaStreamLogger(opts: ProducerOptions) {
    const producerStream = Kafka.Producer.createWriteStream(
        {
            'client.id': opts.client.id,
            'metadata.broker.list': opts.client.brokers,
            'compression.codec': 'gzip',
        },
        {},
        {
            topic: opts.topic,
        }
    )

    producerStream.on('error', (err) => {
        // Here's where we'll know if something went wrong sending to Kafka
        console.error(err)
    })

    return producerStream
}
