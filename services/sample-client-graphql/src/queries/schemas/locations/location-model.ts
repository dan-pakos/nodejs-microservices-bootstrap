// as locations.proto
const LocationtypeDefs = `#graphql
    type Geolocation {
        latitude: Float
        longitude: Float
    }
    type Location {
        _id: String
        address_1: String
        address_2: String
        city: String
        postcode: String
        country: String
        region: String
        geolocation: Geolocation
    }
    type Query {
        location(id: String): Location
    }
`

export default LocationtypeDefs
