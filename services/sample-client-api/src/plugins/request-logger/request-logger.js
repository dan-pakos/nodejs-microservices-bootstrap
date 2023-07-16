var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RequestsLogger_instances, _RequestsLogger_producer, _RequestsLogger_acumulator, _RequestsLogger_topic, _RequestsLogger_mode, _RequestsLogger_key, _RequestsLogger_queueSize, _RequestsLogger_reconcilePropagate, _RequestsLogger_scheduleSend, _RequestsLogger_sendMessage;
export default class RequestsLogger {
    constructor(opts) {
        _RequestsLogger_instances.add(this);
        _RequestsLogger_producer.set(this, void 0);
        _RequestsLogger_acumulator.set(this, void 0);
        _RequestsLogger_topic.set(this, `requests`);
        _RequestsLogger_mode.set(this, void 0);
        _RequestsLogger_key.set(this, void 0);
        _RequestsLogger_queueSize.set(this, void 0);
        __classPrivateFieldSet(this, _RequestsLogger_acumulator, [], "f");
        __classPrivateFieldSet(this, _RequestsLogger_topic, opts.topic, "f");
        __classPrivateFieldSet(this, _RequestsLogger_key, opts.key, "f");
        __classPrivateFieldSet(this, _RequestsLogger_mode, opts?.mode ?? `every`, "f");
        __classPrivateFieldSet(this, _RequestsLogger_queueSize, opts?.queueSize ?? 100, "f");
    }
    async listen(fast, options, done) {
        __classPrivateFieldSet(this, _RequestsLogger_producer, new fast.Kafka.Producer({
            'client.id': fast.config.envs.MAIN_BROKER_CLIENT_ID,
            'metadata.broker.list': fast.config.envs.MAIN_BROKER_URL,
            dr_cb: false, // Specifies that we want a delivery-report event to be generated
        }), "f");
        /**
         * onSend - make sure is passed validation and parsing, push request when sending
         */
        fast.addHook('onSend', (request, reply, payload, done) => {
            const { body, query, params, rawHeaders } = request;
            const reqData = { key: __classPrivateFieldGet(this, _RequestsLogger_key, "f"), body, query, params, rawHeaders };
            __classPrivateFieldGet(this, _RequestsLogger_acumulator, "f").push(reqData);
            if (__classPrivateFieldGet(this, _RequestsLogger_mode, "f") === `every`) {
                __classPrivateFieldGet(this, _RequestsLogger_instances, "m", _RequestsLogger_sendMessage).call(this, reqData);
            }
            else {
                __classPrivateFieldGet(this, _RequestsLogger_instances, "m", _RequestsLogger_reconcilePropagate).call(this, __classPrivateFieldGet(this, _RequestsLogger_queueSize, "f"));
            }
            done();
        });
        done();
    }
}
_RequestsLogger_producer = new WeakMap(), _RequestsLogger_acumulator = new WeakMap(), _RequestsLogger_topic = new WeakMap(), _RequestsLogger_mode = new WeakMap(), _RequestsLogger_key = new WeakMap(), _RequestsLogger_queueSize = new WeakMap(), _RequestsLogger_instances = new WeakSet(), _RequestsLogger_reconcilePropagate = function _RequestsLogger_reconcilePropagate(queueSize) {
    if (__classPrivateFieldGet(this, _RequestsLogger_acumulator, "f").length % queueSize === 0) {
        __classPrivateFieldGet(this, _RequestsLogger_instances, "m", _RequestsLogger_sendMessage).call(this, __classPrivateFieldGet(this, _RequestsLogger_acumulator, "f"));
    }
    else {
        __classPrivateFieldGet(this, _RequestsLogger_instances, "m", _RequestsLogger_scheduleSend).call(this);
    }
}, _RequestsLogger_scheduleSend = function _RequestsLogger_scheduleSend() { }, _RequestsLogger_sendMessage = async function _RequestsLogger_sendMessage(msg) {
    const message = typeof msg === 'string' ? msg : JSON.stringify(msg);
    if (!__classPrivateFieldGet(this, _RequestsLogger_producer, "f").isConnected()) {
        __classPrivateFieldSet(this, _RequestsLogger_producer, await __classPrivateFieldGet(this, _RequestsLogger_producer, "f").connectAsync(), "f");
    }
    __classPrivateFieldGet(this, _RequestsLogger_producer, "f").produce(
    // Topic to send the message to
    __classPrivateFieldGet(this, _RequestsLogger_topic, "f"), 
    // optionally we can manually specify a partition for the message
    // this defaults to -1 - which will use librdkafka's default partitioner (consistent random for keyed messages, random for unkeyed messages)
    null, 
    // Message to send. Must be a buffer
    Buffer.from(message), 
    // for keyed messages, we also specify the key - note that this field is optional
    __classPrivateFieldGet(this, _RequestsLogger_key, "f"), 
    // you can send a timestamp here. If your broker version supports it,
    // it will get added. Otherwise, we default to 0
    Date.now()
    // you can send an opaque token here, which gets passed along
    // to your delivery reports
    );
};
