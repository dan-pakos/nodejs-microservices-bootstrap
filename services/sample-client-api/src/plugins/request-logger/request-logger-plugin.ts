import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'

import RequestsLogger from './request-logger.js'

const requestLoggerPlugin = async (
    fast: FastifyInstance,
    options: FastifyPluginOptions,
    done: () => void
) => {
    void options

    const requestLogger = new RequestsLogger(options)

    await requestLogger.listen(fast, options, done)

    done()
}

export default fp(requestLoggerPlugin, {
    fastify: '4.x',
    name: 'requestLoggerPlugin',
})
