import { Db } from 'mongodb'
import Model from '../../abstract/model.js'

export default class LocationsModel extends Model {
    static get collectionName() {
        return 'locations' // defined static collection name
    }

    /**
     * Construct model with DB client
     * @param db - mongoDB client
     */
    constructor(db: Db) {
        super(db, LocationsModel.collectionName)
    }

    async init() {
        //TODO: move to deployment as one time on setup
        await this.#createIndexes()
    }

    /**
     * Create intexes on the runtime
     * XXX:TODO: move to deployment script
     * @returns
     */
    async #createIndexes() {
        // TODO: db specific
        return await this.collection.createIndex({ _id: 1 }, { name: '__id' })
    }
}
