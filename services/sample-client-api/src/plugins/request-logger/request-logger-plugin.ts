import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'

import RequestsLogger from './request-logger.js'

const requestLoggerPlugin = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: () => void
) => {
    const requestLogger = new RequestsLogger(options)

    requestLogger.listen(fastify, options, done)

    done()
}

export default fp(requestLoggerPlugin, {
    fastify: '4.x',
    name: 'requestLoggerPlugin',
})
