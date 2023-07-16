import Kafka from 'node-rdkafka'

declare module 'node-rdkafka' {
    interface KafkaConsumer {
        connectAsync(metadataOptions?: Kafka.MetadataOptions): Promise<any>
        eachMessage(cb: any): void
    }
    interface Producer {
        connectAsync(metadataOptions?: Kafka.MetadataOptions): Promise<any>
    }
}

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

Kafka.KafkaConsumer.prototype.eachMessage = function () {
    return new Promise((resolve, reject) => {
        this.on('data', (data) => {
            resolve(data)
        })

        this.on('event.error', (err) => {
            reject(err)
        })
    })
}

export default Kafka
