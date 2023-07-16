import MongoDbProvider from '../../providers/mongodb/mongodb-provider.js';
const mongoPlugin = async (options) => {
    const { connectionUrl, dbName } = options;
    // init client connect
    const Mongo = new MongoDbProvider(connectionUrl);
    const mongodb = await Mongo.connect(dbName);
    return mongodb;
};
export default mongoPlugin;
