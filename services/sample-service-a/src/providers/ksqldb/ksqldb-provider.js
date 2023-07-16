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
var _KsqlDBClient_address, _KsqlDBClient_client;
import http2 from 'http2';
export default class KsqlDBClient {
    constructor(ksqlDBBaseUrl) {
        _KsqlDBClient_address.set(this, void 0);
        _KsqlDBClient_client.set(this, void 0);
        __classPrivateFieldSet(this, _KsqlDBClient_address, ksqlDBBaseUrl, "f");
    }
    connect() {
        return new Promise((res, rej) => {
            __classPrivateFieldSet(this, _KsqlDBClient_client, http2.connect(__classPrivateFieldGet(this, _KsqlDBClient_address, "f")), "f");
            __classPrivateFieldGet(this, _KsqlDBClient_client, "f").on('error', (error) => rej(error));
            __classPrivateFieldGet(this, _KsqlDBClient_client, "f").on('connect', res);
        });
    }
    request(query, cb = console.log) {
        return new Promise((res, rej) => {
            try {
                const session = __classPrivateFieldGet(this, _KsqlDBClient_client, "f").request({
                    [http2.constants.HTTP2_HEADER_PATH]: '/query-stream',
                    [http2.constants.HTTP2_HEADER_METHOD]: 'POST',
                    [http2.constants.HTTP2_HEADER_CONTENT_TYPE]: 'application/vnd.ksql.v1+json',
                });
                session.setEncoding('utf8');
                session.on('data', (queryResult) => {
                    if (typeof cb === 'function') {
                        cb(queryResult);
                    }
                });
                const payload = Buffer.from(JSON.stringify(query));
                session.end(payload);
                session.on('close', (data) => {
                    console.log('DATA', data);
                    const response = data.toString();
                    res(response);
                });
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async request2(query) {
        const response = await fetch(__classPrivateFieldGet(this, _KsqlDBClient_address, "f"), {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.ksql.v1+json',
            },
            body: JSON.stringify(query),
        });
        return await response.json();
    }
}
_KsqlDBClient_address = new WeakMap(), _KsqlDBClient_client = new WeakMap();
