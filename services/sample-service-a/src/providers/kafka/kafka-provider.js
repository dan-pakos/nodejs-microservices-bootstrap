import Kafka from 'node-rdkafka';
Kafka.Producer.prototype.connectAsync = async function (metadataOptions) {
    return new Promise((resolve, reject) => {
        this.connect(metadataOptions);
        this.on('ready', () => {
            resolve(this);
        }).on('event.error', (err) => {
            reject(err);
        });
    });
};
Kafka.KafkaConsumer.prototype.connectAsync = async function (metadataOptions) {
    return new Promise((resolve, reject) => {
        this.connect(metadataOptions);
        this.on('ready', () => {
            resolve(this);
        }).on('event.error', (err) => {
            reject(err);
        });
    });
};
Kafka.KafkaConsumer.prototype.eachMessage = function () {
    return new Promise((resolve, reject) => {
        this.on('data', (data) => {
            resolve(data);
        });
        this.on('event.error', (err) => {
            reject(err);
        });
    });
};
export default Kafka;
