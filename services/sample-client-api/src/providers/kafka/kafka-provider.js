import Kafka from 'node-rdkafka'
/**
 * Create connection asynchronously for the Producer
 */
Kafka.Producer.prototype.connectAsync = async function (metadataOptions) {
    return new Promise((resolve, reject) => {
        this.connect(metadataOptions)
        this.on('ready', () => {
            resolve(this)
        }).on('event.error', (err) => {
            reject(err)
        })
    })
}
/**
 * Create connection asynchronously for the Consumer
 */
Kafka.KafkaConsumer.prototype.connectAsync = async function (metadataOptions) {
    return new Promise((resolve, reject) => {
        this.connect(metadataOptions)
        this.on('ready', () => {
            resolve(this)
        }).on('event.error', (err) => {
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
