// import httpServer from './server.js'
// import Config from './plugins/config/config.js'

// const config = new Config()

// await new Promise((resolve) =>
//     httpServer.listen({ port: config.envs.APP_PORT }, () => resolve)
// )
// console.log(`🚀 Server ready at http://localhost:${config.envs.APP_PORT}`)

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'
import Config from './plugins/config/config.js'

const config = new Config()

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
]

const resolvers = {
    Query: {
        books: () => books,
    },
}

const plugins = []

if (config.envs.NODE_ENV === 'production') {
    plugins.push(ApolloServerPluginLandingPageDisabled())
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
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
