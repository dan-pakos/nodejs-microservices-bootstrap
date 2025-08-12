import { fileURLToPath } from 'url'
import { dirname } from 'path'
import * as protoLoader from '@grpc/proto-loader'
import * as grpc from '@grpc/grpc-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default class Service {
    getPackageDefinition(protoPath: string): any {
        try {
            const PROTO_PATH = __dirname + protoPath
            const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true,
            })

            const proto = grpc.loadPackageDefinition(
                packageDefinition
            ) as unknown as any

            return proto
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}
