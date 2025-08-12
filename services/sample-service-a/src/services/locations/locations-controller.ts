import { Db, ObjectId } from 'mongodb'
import LocationsModel from '../../databases/mongodb/collections/locations/locations-model.js'

interface LocationRequestData {
    id: ObjectId
}

interface LocationsRequestData {
    location: {
        country?: string
        city?: string
    }
}

/**
 * Class representing Locations (as an example)
 */
export class LocationsController {
    model: any

    constructor(dbClient: Db) {
        this.model = new LocationsModel(dbClient)
    }

    /**
     * Async method for returning location by an id
     * @param requestData [Object] - data defined in the provider
     * @returns [Promise] - resolved location or reject witn an error
     */
    async getLocationReq(requestData: LocationRequestData) {
        const { id } = requestData
        return await this.model.findOne({ _id: id })
    }

    /**
     * Async method for returning locations by speficied params
     * @param requestData  [Object] - data defined in the provider
     * @returns  [Promise] - resolved location or reject witn an error
     */
    async findLocationsReq(requestData: LocationsRequestData) {
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
