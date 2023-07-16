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
var _Err__code
export default class Err extends Error {
    get code() {
        return __classPrivateFieldGet(this, _Err__code, 'f')
    }
    set code(codeNo) {
        __classPrivateFieldSet(this, _Err__code, codeNo, 'f')
    }
    constructor(error, code) {
        super(error)
        _Err__code.set(this, 1001)
        __classPrivateFieldSet(this, _Err__code, code, 'f')
    }
}
_Err__code = new WeakMap()
