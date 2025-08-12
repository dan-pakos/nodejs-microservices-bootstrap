import { Db } from 'mongodb'
import { ConfigType } from './plugins/config/config-plugin.js'
import mongoPlugin from './plugins/mongodb/mongodb-plugin.js'
import kafkaPlugin from './plugins/kafka/kafka-plugin.js'

export interface AppType {
    config: ConfigType
    mongo: Db
    kafka: any // TODO
}

export const App = async (config: ConfigType): Promise<AppType> => {
    /**
     * Init connection to mongoDB
     */
    const initMongo = async (): Promise<Db> => {
        return await mongoPlugin({
            connectionUrl: config.envs.MONGO_DB_CONNECTION_URL,
            dbName: config.envs.MONGO_DATABASE,
        }).connect()
    }

    const mongo = await initMongo()

    return {
        config,
        mongo,
        kafka: kafkaPlugin,
    }
}
