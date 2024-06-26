import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { fastify as Fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyAutoLoad from '@fastify/autoload'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import configPlugin from './plugins/config/config-plugin.js'
import kafkaPlugin from './plugins/kafka/kafka-plugin.js'
import requestLoggerPlugin from './plugins/request-logger/request-logger-plugin.js'
import { Logger } from './utils/index.js'
import ERRORS from './errors/index.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const server = async () => {
    const fast = Fastify({
        logger: Logger,
    })
    /**
     * Register config Plugin. Imporant: must be first registered
     */
    await fast.register(configPlugin)
    /**
     * Register Kafka as Plugin.
     */
    await fast.register(kafkaPlugin)
    /**
     * Register RequestLogger Plugin
     */
    await fast.register(requestLoggerPlugin, {
        topic: fast.config.envs.TOPIC_REQUESTS,
        key: `sample-client-api`,
    })
    /**
     * Register swagger plugin
     */
    await fast.register(fastifySwagger, {
        mode: 'dynamic',
        swagger: {
            info: {
                title: 'sample-client-api',
                description: 'API documentation for sample-client-api',
                version: fast.config.envs.VERSION,
            },
            // TODO TEST 2.6
            // externalDocs: {
            //     url: 'https://swagger.io',
            //     description: 'Find more info here',
            // },
            host: `${
                fast.config.envs.APP_HOST === '0.0.0.0'
                    ? 'localhost'
                    : fast.config.envs.APP_HOST
            }:${fast.config.envs.APP_PORT}`,
            schemes: [
                `${process.env.NODE_ENV === 'development' ? 'http' : 'https'}`,
            ],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                {
                    name: 'locations',
                    description: `Sample endpoint documentation`,
                },
            ],
            securityDefinitions: {
                apiKey: {
                    type: 'apiKey',
                    name: 'X-api-key',
                    in: 'header',
                },
            },
        },
    })
    /**
     * Register swagger plugin
     */
    await fast.register(fastifySwaggerUi, {
        routePrefix: fast.config.envs.DOCS_ENDPOINT,
    })
    /**
     * Register cors plugin
     */
    await fast.register(fastifyCors)
    /**
     * Register API routes
     */
    await fast.register(fastifyAutoLoad, {
        dir: join(__dirname, 'routes'),
        forceESM: true,
        indexPattern: /endpoints.ts/,
        options: {
            //  prefix: fast.config("API_PREFIX"), // the URL prefix for an API
        },
    })
    fast.setNotFoundHandler((request, reply) => {
        fast.log.debug(`Route not found: ${request.method}:${request.raw.url}`)
        reply.status(404).send({
            statusCode: 404,
            error: ERRORS.NOT_FOUND.message,
            message: `Route ${request.method}:${request.raw.url} not found`,
        })
    })
    fast.setErrorHandler((err, request, reply) => {
        fast.log.debug(`Request url: ${request.raw.url}`)
        fast.log.debug(`Payload: ${request.body}`)
        fast.log.error(`Error occurred: ${err}`)
        const code = err.code ?? 500
        reply.status(code).send({
            statusCode: code,
            error: err.name ?? ERRORS.INTERNAL_SERVER_ERROR.message,
            message: err.message ?? err,
        })
    })
    return fast
}
export default server
