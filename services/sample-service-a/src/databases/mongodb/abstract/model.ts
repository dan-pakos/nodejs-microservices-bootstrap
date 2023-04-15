export default class Model {
    #_db: any

    get db() {
        return this.#_db
    }

    #_collection: any

    get collection() {
        return this.#_collection
    }

    constructor(db: any, collectionName: string) {
        this.#_db = db
        this.#_collection = this.db.collection(collectionName)
    }
}
