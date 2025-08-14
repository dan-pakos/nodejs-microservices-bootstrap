import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import cors from 'cors'
import http from 'http'

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        hello: () => 'world',
    },
}

const app = express()
const httpServer = http.createServer(app)

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start()

app.use(cors(), express.json(), expressMiddleware(server))

export default httpServer
