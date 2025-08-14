import { ConfigTypes } from './plugins/config/config.js'
import grpcClientPlugin from './plugins/grpcClient/grpc-client-plugin.js'

class App {
    config: ConfigTypes
    grpcClient: any

    constructor(config: ConfigTypes) {
        this.config = config
    }

    init() {
        this.grpcClient = grpcClientPlugin().connect({
            address: this.config.envs.SERVICE_ADDRESS,
        })
    }
}

export default App
