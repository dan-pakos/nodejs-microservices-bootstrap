import { Db } from 'mongodb'
import LocationsModel from '../databases/mongodb/collections/locations/locations-model.js'

interface LocationRequestData {
    id: number
}

interface LocationsRequestData {
    location: {
        country: string;
        city: string;
    }
}

/**
 * Class representing Locations (as an example)
 */
export class LocationsController {
    model: LocationsModel | any = null

    /**
     * Initiate controller with db client is needed
     * @param client - db client
     * @returns self
     */
    async withModel(dbClient: Db) {
        const model = new LocationsModel(dbClient)
        this.model = await model.init()

        return this
    }



    /**
     * Async method for returning location by an id
     * @param requestData [Object] - data defined in the provider
     * @returns [Promise] - resolved location or reject witn an error
     */
    async getLocation(requestData: LocationRequestData) {
        const { id } = requestData
        return await this.model.findOne({ _id: id })
    }

    /**
     * Async method for returning locations by speficied params
     * @param requestData  [Object] - data defined in the provider
     * @returns  [Promise] - resolved location or reject witn an error
     */
    async findLocations(requestData: LocationsRequestData) {
        const limit = 100 // TODO - add pagination
        const skip = 0

        const { country, city } = requestData.location

        const query = {
            'location.country': country,
            'location.city': city,
        }

        return await this.model.findMany(query, limit, skip)
    }
}

/**
 * Create controller with db client or without
 * @param dbclient - db client
 * @returns instance of LocationsController class
 */
const locationsController = async (dbclient: Db | null = null) => {
    const locationsCtrl = new LocationsController()

    return dbclient ? await locationsCtrl.withModel(dbclient) : locationsCtrl
}

export { locationsController, LocationRequestData, LocationsRequestData }
