import { MongoClient, MongoClientOptions, Db } from 'mongodb'

class MongoDbProvider {
    #defaultSettings: MongoClientOptions = {}

    #client: MongoClient
    #db: Db;
    #dbName = ``

    get client() {
        return this.#client
    }

    get dbName() {
        return this.#dbName
    }

    set dbName(name) {
        this.#dbName = name
    }

    get db() {
        return this.#db
    }

    constructor(connectionUrl: string, userSettings: MongoClientOptions = {}) {
        const settings = { ...this.#defaultSettings, ...userSettings }

        this.#client = new MongoClient(connectionUrl, settings)
        this.#db = this.client.db()
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
        }

        this.#db = this.client.db(this.dbName)

        return this.#db
    }
}

export default MongoDbProvider
