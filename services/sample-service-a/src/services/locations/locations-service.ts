import Service from '../abstract/service.js'
import { Db, ObjectId } from 'mongodb'
import { LocationsController } from './locations-controller.js'

interface getLocationReq {
    request: {
        id: ObjectId
    }
}

interface findLocationsReq {
    request: {
        location: {
            city?: string
            country?: string
        }
    }
}

let ctrl: LocationsController | null = null

export default class LocationsService extends Service {
    readonly protoPath: string = '/../../../../protos/locations.proto'
    proto: any
    db: Db

    constructor(db: Db) {
        super()
        this.proto = this.getPackageDefinition(this.protoPath)
        this.db = db
        ctrl = new LocationsController(this.db)
    }

    async getLocation(call: getLocationReq, callback: any) {
        if (!ctrl) {
            ctrl = new LocationsController(this.db)
        }

        const location = await ctrl.getLocationReq(call.request)

        return callback(null, { location })
    }

    async findLocations(call: findLocationsReq, callback: any) {
        if (!ctrl) {
            ctrl = new LocationsController(this.db)
        }
        const locations = await ctrl.findLocationsReq(call.request)

        return callback(null, { locations })
    }
}
