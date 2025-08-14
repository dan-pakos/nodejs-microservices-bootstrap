import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

export default class GrpcProvider {
    #defaultConnectionSettings = {
        address: ``,
        creds: grpc.credentials.createInsecure(),
    }
    #connectionSettings: ConnectionSettings
    #proto: any
    #client: any
    #package: any
    service: string

    constructor(
        connectionSettings: ConnectionSettings,
        protoSettings: ProtoSettings
    ) {
        this.#connectionSettings = {
            ...this.#defaultConnectionSettings,
            ...connectionSettings,
        }
        this.#proto = this.#loadProto(protoSettings.path)
        this.#package = protoSettings.package
        this.service = protoSettings.service
    }

    #loadProto(path: string) {
        const packageDefinition = protoLoader.loadSync(path, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        })

        return grpc.loadPackageDefinition(packageDefinition) as unknown as any
    }

    connect(): GrpcProvider {
        if (!this.#client) {
            try {
                this.#client = new this.#proto[this.#package][this.service](
                    this.#connectionSettings.address,
                    this.#connectionSettings.creds
                )
            } catch (err) {
                // TODO use pino with kafka
                console.log(err)
            }
        }

        return this
    }

    async invoke(methodName: string, data: any) {
        return new Promise((res, rej) => {
            this.#client[methodName](data, (err: any, response: any) => {
                if (err) {
                    rej(err)
                }
                res(response)
            })
        })
    }
}

interface ProtoSettings {
    path: string
    package: string
    service: string
}

interface ConnectionSettings {
    address: string
    creds?: grpc.ChannelCredentials
}

export { GrpcProvider }
