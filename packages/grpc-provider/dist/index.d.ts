import * as grpc from '@grpc/grpc-js'
export default class GrpcProvider {
    #private
    set service(serviceName: string)
    get service(): string
    constructor(
        connectionSettings: ConnectionSettings,
        protoSettings: ProtoSettings
    )
    connect(): void
    invoke(methodName: string, data: any): Promise<unknown>
}
interface ProtoSettings {
    path: string
    package: string
    service?: string
}
interface ConnectionSettings {
    address: string
    creds?: grpc.ChannelCredentials
}
export { GrpcProvider }
