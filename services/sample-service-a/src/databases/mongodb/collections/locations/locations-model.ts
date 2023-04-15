import { ObjectId } from 'mongodb'
import Model from '../../abstract/model.js'
import { Logger } from '../../../../utils/index.js'

export default class LocationsModel extends Model {
    static get collectionName() {
        return 'locations' // defined static collection name
    }

    /**
     * Construct model with DB client
     * @param db - mongoDB client
     */
    constructor(db) {
        super(db, LocationsModel.collectionName)
    }

    async init() {
        // 1. Create indexes
        await this.#createIndexes()

        // 2. XXX:TODO: service specific

        return this
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

    /**
     * Find single document in the collection by provided filter
     * @param filter [Object] - defined keys => values
     * @returns [Promise] resolved query or reject with an error
     */
    async findOne(filter) {
        /**
         * Use ObjectId object if _id is specified
         */
        if (filter?._id) {
            try {
                filter._id = new ObjectId(filter._id)
            } catch (err) {
                Logger.error(err)
                return null
            }
        }

        return await this.collection.findOne(filter)
    }

    /**
     * Find all documents in the collection by provided filter, limit and skip results for paggination
     * @param filter [Object] - defined keys => values
     * @param limit [number=0] - limit result entities
     * @param skip [number=0] - skil result entities
     * @returns [array] - array of found documents or an emapy array
     */
    async findMany(filter, limit = 0, skip = 0) {
        const cursor = await this.collection
            .find(filter)
            .limit(limit)
            .skip(skip)

        return (await cursor.count()) ? cursor.toArray() : []
    }

    /**
     * Find all documents in the collection, limit and skip results for paggination
     * @param limit [number=0] - limit result entities
     * @param skip [number=0] - skil result entities
     * @returns [array] - array of found documents or an emapy array
     */
    async findAll(limit = 0, skip = 0) {
        const cursor = await this.collection.find().limit(limit).skip(skip)

        return (await cursor.count()) ? cursor.toArray() : []
    }
}
