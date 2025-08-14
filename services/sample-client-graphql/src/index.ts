import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'
import App from './app.js'
import Config from './plugins/config/config.js'
import Schemas from './queries/schemas/index.js'
import { locationResolver } from './queries/resolvers/index.js'

const config = new Config()
const app = new App(config)

app.init()

const plugins = []

if (config.envs.NODE_ENV === 'production') {
    plugins.push(ApolloServerPluginLandingPageDisabled())
}

const resolvers = {
    Query: {
        async location(parent: any, args: any) {
            void parent
            return await locationResolver(app).resolve(args.id)
        },
        //locations: locationsResolver,
    },
}

const server = new ApolloServer({
    typeDefs: Schemas,
    resolvers,
    plugins,
})

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(config.envs.APP_PORT) },
})

console.log(`🚀  Server ready at: ${url}`)
