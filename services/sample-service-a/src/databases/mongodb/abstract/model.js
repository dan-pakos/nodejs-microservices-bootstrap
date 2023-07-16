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
var _Model__db, _Model__collection
export default class Model {
    get db() {
        return __classPrivateFieldGet(this, _Model__db, 'f')
    }
    get collection() {
        return __classPrivateFieldGet(this, _Model__collection, 'f')
    }
    constructor(db, collectionName) {
        _Model__db.set(this, void 0)
        _Model__collection.set(this, void 0)
        __classPrivateFieldSet(this, _Model__db, db, 'f')
        __classPrivateFieldSet(
            this,
            _Model__collection,
            this.db.collection(collectionName),
            'f'
        )
    }
}
;(_Model__db = new WeakMap()), (_Model__collection = new WeakMap())
