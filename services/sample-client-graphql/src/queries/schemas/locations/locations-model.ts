// as locations.proto
const LocationstypeDefs = `#graphql
    type Geolocation {
        latitude: Float
        longitude: Float
    }
    type Location {
        id: String
        address_1: String
        address_2: String
        city: String
        postcode: String
        country: String
        region: String
        geolocation: Geolocation
    }
    type Query {
        locations: [Location]
    }
`

export default LocationstypeDefs
