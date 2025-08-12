import MongoDbProvider from '../../providers/mongodb/mongodb-provider.js'
const mongoPlugin = (options) => {
    const connect = async () => {
        const { connectionUrl, dbName } = options
        // init client connect
        const Mongo = new MongoDbProvider(connectionUrl)

        return await Mongo.connect(dbName)
    }
    return {
        connect,
    }
}
export default mongoPlugin
