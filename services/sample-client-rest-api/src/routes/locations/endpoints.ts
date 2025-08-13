import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import * as schemas from './schemas.js'
import { GrpcProvider } from 'grpc-provider'

import Err, { ERRORS } from '../../utils/err.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Define locationsRoutes
 * @param fast Fastify instance
 * @returns void
 */
const locationsRoutes = async (fast: FastifyInstance) => {
    const connection = {
        address: fast.config.envs.SERVICE_ADDRESS,
    }

    const protoDef = {
        path: __dirname + '/../../../../protos/locations.proto',
        package: `locations`,
        service: `Locations`,
    }

    /**
     * Connect to the service once
     */
    const grpcClient = new GrpcProvider(connection, protoDef)
    grpcClient.connect()

    /**
     * Sample GET method
     * GET: /:id
     */
    fast.route({
        method: ['GET'],
        url: '/:id',
        schema: schemas.getLocationSchema,
        handler: async (req: GetLocationRequest, reply: FastifyReply) => {
            const { id } = req.params

            try {
                const { location } = (await grpcClient.invoke('getLocation', {
                    id,
                })) as unknown as GetLocationResponse

                /**
                 * Note: if result is empty after provided params, reply with 404 (NOT FOUND) error
                 */
                if (!location) {
                    reply.code(404).send({})
                    return
                }

                reply.send(location)
            } catch (err) {
                /**
                 * Note: an error will be streamed to centralized logs storage
                 */
                fast.log.error(err)

                /**
                 * Note: Do not expose real app error message to the user.
                 * Just add error code number as prefix for identify purposes
                 */
                reply
                    .code(500)
                    .send(`[${(err as Err).code}] ${ERRORS.APPLICATION_ERROR}`)
            }
        },
    })

    /**
     * Sample POST method
     * POST: /
     */
    fast.route({
        method: ['POST', 'OPTIONS'],
        url: '/',
        schema: schemas.findLocationsSchema,
        handler: async (req: FindLocationsRequest, reply: FastifyReply) => {
            const requestData = req.body

            try {
                const { locations } = (await grpcClient.invoke(
                    'findLocations',
                    requestData
                )) as unknown as FindLocationsResponse

                if (!locations.length) {
                    reply.code(404).send([])
                    return
                }

                reply.send(locations)
            } catch (err) {
                fast.log.error(err)

                reply
                    .code(500)
                    .send(
                        `[${(err as Err).code}] Requesting a locations caused an error.`
                    )
            }
        },
    })
}

export default locationsRoutes

/**
 * Provide generic and provisional only Types for requests and responses (event these will come externally)
 */
export type GetLocationRequest = FastifyRequest<{
    Params: {
        id: string
    }
}>

export interface GetLocationResponse {
    _id: string
    location: Location
}

export type FindLocationsRequest = FastifyRequest<{
    Body: {
        location: {
            country: string
            city: string
        }
    }
}>

export interface FindLocationsResponse {
    locations: Location[]
}

export type Location = {
    location: {
        country: string
        region: string
        postcode: string
        address_1: string
        address_2: string
        city: string
        geolocation: {
            latitude: number
            longitude: number
        }
    }
}
