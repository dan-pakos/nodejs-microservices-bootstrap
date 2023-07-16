var __classPrivateFieldGet =
    (this && this.__classPrivateFieldGet) ||
    function (receiver, state, kind, f) {
        if (kind === 'a' && !f)
            throw new TypeError('Private accessor was defined without a getter')
        if (
            typeof state === 'function'
                ? receiver !== state || !f
                : !state.has(receiver)
        )
            throw new TypeError(
                'Cannot read private member from an object whose class did not declare it'
            )
        return kind === 'm'
            ? f
            : kind === 'a'
            ? f.call(receiver)
            : f
            ? f.value
            : state.get(receiver)
    }
var _Config__envs
export default class Config {
    constructor() {
        _Config__envs.set(this, {
            APP_HOST: process.env.SSA_APP_HOST ?? `localhost`,
            APP_PORT: process.env.SSA_APP_PORT ?? `8000`,
            MONGO_DB_CONNECTION_URL: process.env.SDB_CONNECTION_URL ?? ``,
            MONGO_DATABASE: process.env.SDB_MONGO_DATABASE ?? ``,
        })
    }
    get envs() {
        return __classPrivateFieldGet(this, _Config__envs, 'f')
    }
}
_Config__envs = new WeakMap()
