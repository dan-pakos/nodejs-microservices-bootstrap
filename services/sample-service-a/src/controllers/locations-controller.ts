import LocationsModel from '../databases/mongodb/collections/locations/locations-model.js'

/**
 * Class representing Locations (as an example)
 */
class LocationsController {
    model: LocationsModel | any = null

    /**
     * Initiate controller with db client is needed
     * @param client - db client
     * @returns self
     */
    async withModel(client) {
        const model = new LocationsModel(client)
        this.model = await model.init()

        return this
    }

    /**
     * Async method for returning location by an id
     * @param requestData [Object] - data defined in the provider
     * @returns [Promise] - resolved location or reject witn an error
     */
    async getLocation(requestData) {
        const { id } = requestData
        try {
            return await this.model.findOne({ _id: id })
        } catch (err) {
            throw err
        }
    }

    /**
     * Async method for returning locations by speficied params
     * @param requestData  [Object] - data defined in the provider
     * @returns  [Promise] - resolved location or reject witn an error
     */
    async findLocations(requestData) {
        const limit = 100 // TODO - add pagination
        const skip = 0

        const { country, city } = requestData.location

        const query = {
            'location.country': country,
            'location.city': city,
        }

        try {
            return await this.model.findMany(query, limit, skip)
        } catch (err) {
            throw err
        }
    }
}

/**
 * Create controller with db client or without
 * @param dbclient - db client
 * @returns instance of LocationsController class
 */
const locationsController = async (dbclient = null) => {
    const locationsCtrl = new LocationsController()

    return dbclient ? await locationsCtrl.withModel(dbclient) : locationsCtrl
}

export { locationsController }
