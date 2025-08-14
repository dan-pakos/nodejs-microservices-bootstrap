import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { GrpcProvider } from 'grpc-provider'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface Connection {
    address: string
}

const grpcClientPlugin = () => {
    const protoDef = {
        path: __dirname + '/../../../../protos/locations.proto',
        package: `locations`,
        service: `Locations`,
    }

    function connect(connection: Connection) {
        /**
         * Connect to the service once
         */
        const grpcClient = new GrpcProvider(connection, protoDef)
        return grpcClient.connect()
    }

    return { connect }
}

export default grpcClientPlugin
