import { createRequire } from 'module';
import { pino } from 'pino';
import kafkaStreamLogger from './kafka-stream-logger.js';
const requireJson = createRequire(import.meta.url);
const pretty = requireJson('pino-pretty');
const packageJson = requireJson('../../../package.json');
const producerOptions = {
    client: {
        id: process.env.EVB_BROKER_CLIENT_ID,
        brokers: process.env.EVB_BROKER_URL,
    },
    topic: process.env['AO_TOPICS_LOGS'],
    messageKey: packageJson.name,
};
const loggingStreams = [
    { level: 'error', stream: kafkaStreamLogger(producerOptions) },
];
if (process.env.NODE_ENV === 'development') {
    loggingStreams.push({
        stream: pretty({
            colorize: true,
            levelFirst: true,
            ignore: 'time,pid,hostname',
        }),
    });
}
const options = {
    level: process.env['LOG_LEVEL'],
    formatters: {
        level: (level) => ({ level }),
    },
    timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
};
const Logger = pino(options, pino.multistream(loggingStreams));
export default Logger;
