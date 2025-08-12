import { Server } from '@grpc/grpc-js'
import LocationsService from './locations/locations-service.js'
import { AppType } from '../app.js'

export const defineServices = (server: Server, app: AppType) => {
    const locationService = new LocationsService(app.mongo)

    /**
     * Service: Locations
     */
    server.addService(locationService.proto.locations.Locations.service, {
        getLocation: locationService.getLocation,
        findLocations: locationService.findLocations,
    })

    /**
     * Service: {another}
     */
    // server.addService(
    //     locationService.proto.locations.Locations.service,
    //     locationService.service
    // )
}
