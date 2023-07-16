import { locationsController } from '../controllers/locations-controller.js';
import mongo from '../plugins/mongodb/mongodb-plugin.js';
/**
 * Implements the LocationsHandler with GRPC methods.
 * @returns Object - closure with defined methods
 */
function LocationsHandler(config) {
    let dbClient;
    let ctrl;
    /**
     * Initialize once the database client and instantiate once the controller
     * @returns void
     */
    const init = async () => {
        if (!dbClient) {
            dbClient = await mongo({
                connectionUrl: config.envs.MONGO_DB_CONNECTION_URL,
                dbName: config.envs.MONGO_DATABASE,
            });
        }
        if (!ctrl) {
            ctrl = await locationsController(dbClient);
        }
    };
    /**
     * A method to handle getData grpc callback - find data by id
     * @param call - request data
     * @param callback - function triggered once controller resolve it's query
     * @returns fullfilled callback
     */
    const getLocation = async (call, callback) => {
        try {
            await init();
            const location = await ctrl.getLocation(call.request);
            return callback(null, { location });
        }
        catch (err) {
            return callback(err);
        }
    };
    /**
     * A method to handle findLocations grpc callback - find locations
     * @param call [Object]
     * @param call.request [Object] - request message
     * @param callback - function triggered once controller resolve it's query
     * @returns fullfilled callback
     */
    const findLocations = async (call, callback) => {
        try {
            await init();
            const locations = await ctrl.findLocations(call.request);
            return callback(null, { locations });
        }
        catch (err) {
            return callback(err);
        }
    };
    return {
        getLocation,
        findLocations,
        // etc
    };
}
export default LocationsHandler;
