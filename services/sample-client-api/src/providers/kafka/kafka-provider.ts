import Kafka from 'node-rdkafka'

/**
 * This utility extends callback style node-rdkafka with asynchronous methods
 */

/**
 * Extend node-rdkafka types for TypeScript
 */
declare module 'node-rdkafka' {
    interface KafkaConsumer {
        connectAsync(metadataOptions?: Kafka.MetadataOptions): Promise<any>
        eachMessage(cb: any): void
    }
    interface Producer {
        connectAsync(metadataOptions?: Kafka.MetadataOptions): Promise<any>
    }
}

/**
 * Create connection asynchronously for the Producer
 */
Kafka.Producer.prototype.connectAsync = async function (
    metadataOptions?: Kafka.MetadataOptions | undefined
) {
    return new Promise((resolve, reject) => {
        this.connect(metadataOptions)

        this.on('ready', () => {
            resolve(this)
        }).on('event.error', (err: Kafka.LibrdKafkaError) => {
            reject(err)
        })
    })
}

/**
 * Create connection asynchronously for the Consumer
 */
Kafka.KafkaConsumer.prototype.connectAsync = async function (
    metadataOptions?: Kafka.MetadataOptions | undefined
) {
    return new Promise((resolve, reject) => {
        this.connect(metadataOptions)

        this.on('ready', () => {
            resolve(this)
        }).on('event.error', (err: Kafka.LibrdKafkaError) => {
            reject(err)
        })
    })
}

/**
 * Create connection asynchronously for the Consumer
 */
Kafka.KafkaConsumer.prototype.eachMessage = function (cb) {
    return new Promise((resolve, reject) => {
        this.on('data', (data) => {
            if (typeof cb === 'function') {
                cb(data)
            }
            resolve(data)
        })

        this.on('event.error', (err) => {
            reject(err)
        })
    })
}

export default Kafka
