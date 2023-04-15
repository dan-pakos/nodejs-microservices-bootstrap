import { MongoClient, MongoClientOptions } from 'mongodb'

class MongoDbProvider {
    #defaultSettings: MongoClientOptions = {}

    #_client: MongoClient

    get client() {
        return this.#_client
    }

    #_dbName = ``

    get dbName() {
        return this.#_dbName
    }

    set dbName(name) {
        this.#_dbName = name
    }

    #_db: any = null

    get db() {
        return this.#_db
    }

    constructor(connectionUrl: string, userSettings: MongoClientOptions = {}) {
        const settings = { ...this.#defaultSettings, ...userSettings }

        this.#_client = new MongoClient(connectionUrl, settings)
    }

    async connect(dbName: string) {
        this.dbName = dbName

        try {
            await this.client.connect()
            await this.client.db(this.dbName).command({ ping: 1 })

            console.log(
                `Connected successfully to mongoDB ${this.dbName} server.`
            )
        } catch (error: any) {
            console.error(error.message)
            throw error
        } finally {
            //await this.client.close();
        }

        this.#_db = this.client.db(this.dbName)

        return this.db
    }
}

export default MongoDbProvider
