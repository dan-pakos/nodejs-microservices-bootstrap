export const findLocationsSchema = {
    body: {
        type: 'object',
        required: ['location'],
        properties: {
            location: {
                type: 'object',
                required: ['country', 'city'],
                properties: {
                    country: { type: 'string' },
                    city: { type: 'string' },
                },
            },
        },
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'array',
        },
        404: {
            description: 'Locations not found',
            type: 'array',
        },
    },
    tags: ['locations'], // used by openAPI spec
}

export const getLocationSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' },
        },
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                location: {
                    type: 'object',
                    properties: {
                        address_1: { type: 'string' },
                        address_2: { type: 'string' },
                        city: { type: 'string' },
                        postcode: { type: 'string' },
                        region: { type: 'string' },
                        country: { type: 'string' },
                        geolocation: {
                            type: 'object',
                            properties: {
                                latitude: { type: 'number' },
                                longitude: { type: 'number' },
                            },
                        },
                    },
                },
            },
        },
        404: {
            description: 'Location not found',
            type: 'object',
        },
    },
    tags: ['locations'],
}
