import { fileURLToPath } from 'url'
import { dirname } from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

import Config from './plugins/config/config-plugin.js'

import LocationsHandler from './handlers/LocationsHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PROTO_PATH = __dirname + '/../../protos/locations.proto'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
})

const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as any

/**
 * Starts a GRPC server
 */
async function init() {
    const config = Config()
    const server = new grpc.Server()

    server.addService(proto.locations.Locations.service, {
        getLocation: LocationsHandler(config).getLocation,
        findLocations: LocationsHandler(config).findLocations,
    })

    server.bindAsync(
        `${config.envs.APP_HOST}:${config.envs.APP_PORT}`,
        grpc.ServerCredentials.createInsecure(),
        () => {
            server.start()
        }
    )
}

await init()
