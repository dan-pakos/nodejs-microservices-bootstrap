import * as grpc from '@grpc/grpc-js'
import { defineServices } from './services/services.js'
import Config from './plugins/config/config-plugin.js'
import { App, AppType } from './app.js'

const config = Config()
const app = await App(config)

await startServer(app)

/**
 * Starts a GRPC server
 */
async function startServer(app: AppType): Promise<void> {
    const server = new grpc.Server()

    defineServices(server, app)

    server.bindAsync(
        `${app.config.envs.APP_HOST}:${app.config.envs.APP_PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (error) => {
            if (error) {
                console.error(error)
                server.forceShutdown()
            }
        }
    )
}
