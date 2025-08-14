import { createRequire } from 'module'
import pino from 'pino'
import { ProducerStream } from 'node-rdkafka'
import kafkaStreamLogger from './kafka-stream-logger.js'
import { Config } from '../../plugins/config/config-plugin.js'

const requireJson = createRequire(import.meta.url)
const pretty = requireJson('pino-pretty')
const packageJson = requireJson('../../../package.json')

export interface ProducerOptions {
    client: {
        id: string
        brokers: string
    }
    topic: string
    messageKey: string
}

interface LogingStream {
    level?: 'error' | 'warn' | 'info' | 'debug'
    stream: ProducerStream
}

const config = new Config()

const producerOptions: ProducerOptions = {
    client: {
        id: config.envs.BROKER_CLIENT_ID,
        brokers: config.envs.BROKER_URL,
    },
    topic: config.envs.TOPICS_LOGS,
    messageKey: packageJson.name,
}

const loggingStreams: LogingStream[] = [
    { level: 'error', stream: kafkaStreamLogger(producerOptions) },
]

if (process.env.NODE_ENV === 'development') {
    loggingStreams.push({
        stream: pretty({
            colorize: true,
            levelFirst: true,
            ignore: 'time,pid,hostname',
        }),
    })
}

const options = {
    level: config.envs.LOG_LEVEL,
    formatters: {
        level: (level: string) => ({ level }),
    },
    timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
}

const Logger = pino(options, pino.multistream(loggingStreams))

export default Logger
