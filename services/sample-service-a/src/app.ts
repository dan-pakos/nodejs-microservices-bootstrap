import mongoPlugin from './plugins/mongodb/mongodb-plugin.js'
import configPlugin from './plugins/config/config-plugin.js'
import kafkaPlugin from './plugins/kafka/kafka-plugin.js'

const app = () => {
  return {
    config: configPlugin(),
    mongo: mongoPlugin,
    kafka: kafkaPlugin,
  }
}

export default app
