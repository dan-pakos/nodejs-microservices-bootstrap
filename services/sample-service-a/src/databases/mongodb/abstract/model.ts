import { Db, Collection, ObjectId } from 'mongodb'

interface FinOneFilter {
    _id: ObjectId
}

interface FinManyFilter {
    'location.country'?: string
    'location.city'?: string
    'location.postode'?: string
    'location.region'?: string
}

export default class Model {
    #db: Db

    get db() {
        return this.#db
    }

    #collection: Collection

    get collection() {
        return this.#collection
    }

    constructor(db: Db, collectionName: string) {
        this.#db = db
        this.#collection = this.#db.collection(collectionName)
    }

    /**
     * Find single document in the collection by provided filter
     * @param filter [Object] - defined keys => values
     * @returns [Promise] resolved query or reject with an error
     */
    async findOne(filter: FinOneFilter) {
        /**
         * Use ObjectId object if _id is specified
         */
        if (filter?._id) {
            try {
                filter._id = new ObjectId(filter._id)
            } catch (err) {
                console.error(err)
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
    async findMany(filter: FinManyFilter, limit: number = 0, skip: number = 0) {
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
    async findAll(limit: number = 0, skip: number = 0) {
        const cursor = await this.collection.find().limit(limit).skip(skip)

        return (await cursor.count()) ? cursor.toArray() : []
    }
}
