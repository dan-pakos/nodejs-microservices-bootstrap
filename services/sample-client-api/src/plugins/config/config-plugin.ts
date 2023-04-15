import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'

import Config, { ConfigTypes } from './config.js'

declare module 'fastify' {
    interface FastifyInstance {
        config: ConfigTypes
    }
}

const configPlugin = (
    fast: FastifyInstance,
    options: FastifyPluginOptions,
    done: () => void
) => {
    void options

    // etc
    const config = new Config()

    fast.decorate('config', config)

    done()
}

export default fp(configPlugin, {
    fastify: '4.x',
    name: 'configPlugin',
})
