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
var __classPrivateFieldSet =
    (this && this.__classPrivateFieldSet) ||
    function (receiver, state, value, kind, f) {
        if (kind === 'm') throw new TypeError('Private method is not writable')
        if (kind === 'a' && !f)
            throw new TypeError('Private accessor was defined without a setter')
        if (
            typeof state === 'function'
                ? receiver !== state || !f
                : !state.has(receiver)
        )
            throw new TypeError(
                'Cannot write private member to an object whose class did not declare it'
            )
        return (
            kind === 'a'
                ? f.call(receiver, value)
                : f
                ? (f.value = value)
                : state.set(receiver, value),
            value
        )
    }
var _MongoDbProvider_defaultSettings,
    _MongoDbProvider__client,
    _MongoDbProvider__dbName,
    _MongoDbProvider__db
import { MongoClient } from 'mongodb'
class MongoDbProvider {
    get client() {
        return __classPrivateFieldGet(this, _MongoDbProvider__client, 'f')
    }
    get dbName() {
        return __classPrivateFieldGet(this, _MongoDbProvider__dbName, 'f')
    }
    set dbName(name) {
        __classPrivateFieldSet(this, _MongoDbProvider__dbName, name, 'f')
    }
    get db() {
        return __classPrivateFieldGet(this, _MongoDbProvider__db, 'f')
    }
    constructor(connectionUrl, userSettings = {}) {
        _MongoDbProvider_defaultSettings.set(this, {})
        _MongoDbProvider__client.set(this, void 0)
        _MongoDbProvider__dbName.set(this, ``)
        _MongoDbProvider__db.set(this, null)
        const settings = {
            ...__classPrivateFieldGet(
                this,
                _MongoDbProvider_defaultSettings,
                'f'
            ),
            ...userSettings,
        }
        __classPrivateFieldSet(
            this,
            _MongoDbProvider__client,
            new MongoClient(connectionUrl, settings),
            'f'
        )
    }
    async connect(dbName) {
        this.dbName = dbName
        try {
            await this.client.connect()
            await this.client.db(this.dbName).command({ ping: 1 })
            console.log(
                `Connected successfully to mongoDB ${this.dbName} server.`
            )
        } catch (error) {
            console.error(error.message)
            throw error
        } finally {
            //await this.client.close();
        }
        __classPrivateFieldSet(
            this,
            _MongoDbProvider__db,
            this.client.db(this.dbName),
            'f'
        )
        return this.db
    }
}
;(_MongoDbProvider_defaultSettings = new WeakMap()),
    (_MongoDbProvider__client = new WeakMap()),
    (_MongoDbProvider__dbName = new WeakMap()),
    (_MongoDbProvider__db = new WeakMap())
export default MongoDbProvider
