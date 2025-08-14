import App from '../../../app.js'

// interface GetLocationResponse {
//     location: {
//         city: string
//         country: string
//     }
// }

const locationResolver = (app: App) => {
    const grpcClient = app.grpcClient

    const resolve = async (id: string) => {
        try {
            const { location } = await grpcClient.invoke('getLocation', {
                id,
            })

            return location
        } catch (err) {
            /**
             * Note: an error will be streamed to centralized logs storage
             */
            //app.log.error(err)
            console.error(err)
        }
    }

    return { resolve }
}

export default locationResolver
