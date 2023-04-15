import MongoDbProvider from '../../providers/mongodb/mongodb-provider.js'

const mongoPlugin = async (options: Options) => {
    const { connectionUrl, dbName } = options

    // init client connect
    const Mongo = new MongoDbProvider(connectionUrl)

    const mongodb = await Mongo.connect(dbName)

    return mongodb
}

export default mongoPlugin

export type Options = {
    connectionUrl: string
    dbName: string
}
