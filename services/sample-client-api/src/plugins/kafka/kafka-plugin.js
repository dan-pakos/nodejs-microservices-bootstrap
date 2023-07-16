import fp from 'fastify-plugin'
import Kafka from '../../providers/kafka/kafka-provider.js'
const kafkaPlugin = (fast, options, done) => {
    void options
    /**
     * decorate fast with extended kafka module
     */
    fast.decorate('Kafka', Kafka)
    done()
}
export default fp(kafkaPlugin, {
    fastify: '4.x',
    name: 'kafkaPlugin',
})
