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
var _GrpcProvider_instances, _GrpcProvider_defaultConnectionSettings, _GrpcProvider_connectionSettings, _GrpcProvider_proto, _GrpcProvider_client, _GrpcProvider_package, _GrpcProvider__service, _GrpcProvider_loadProto;
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
export default class GrpcProvider {
    set service(serviceName) {
        __classPrivateFieldSet(this, _GrpcProvider__service, serviceName, "f");
    }
    get service() {
        return __classPrivateFieldGet(this, _GrpcProvider__service, "f");
    }
    constructor(connectionSettings, protoSettings) {
        _GrpcProvider_instances.add(this);
        _GrpcProvider_defaultConnectionSettings.set(this, {
            address: ``,
            creds: grpc.credentials.createInsecure(),
        });
        _GrpcProvider_connectionSettings.set(this, void 0);
        _GrpcProvider_proto.set(this, void 0);
        _GrpcProvider_client.set(this, void 0);
        _GrpcProvider_package.set(this, void 0);
        _GrpcProvider__service.set(this, void 0);
        __classPrivateFieldSet(this, _GrpcProvider_connectionSettings, {
            ...__classPrivateFieldGet(this, _GrpcProvider_defaultConnectionSettings, "f"),
            ...connectionSettings,
        }, "f");
        __classPrivateFieldSet(this, _GrpcProvider_proto, __classPrivateFieldGet(this, _GrpcProvider_instances, "m", _GrpcProvider_loadProto).call(this, protoSettings.path), "f");
        __classPrivateFieldSet(this, _GrpcProvider_package, protoSettings.package, "f");
        if (protoSettings.service) {
            this.service = protoSettings.service; // default service
        }
    }
    connect() {
        if (!__classPrivateFieldGet(this, _GrpcProvider_client, "f")) {
            try {
                __classPrivateFieldSet(this, _GrpcProvider_client, new (__classPrivateFieldGet(this, _GrpcProvider_proto, "f")[__classPrivateFieldGet(this, _GrpcProvider_package, "f")][this.service])(__classPrivateFieldGet(this, _GrpcProvider_connectionSettings, "f").address, __classPrivateFieldGet(this, _GrpcProvider_connectionSettings, "f").creds), "f");
            }
            catch (err) {
                // TODO use pino with kafka
                console.log(err);
            }
        }
    }
    async invoke(methodName, data) {
        return new Promise((res, rej) => {
            __classPrivateFieldGet(this, _GrpcProvider_client, "f")[methodName](data, (err, response) => {
                if (err) {
                    rej(err);
                }
                res(response);
            });
        });
    }
}
_GrpcProvider_defaultConnectionSettings = new WeakMap(), _GrpcProvider_connectionSettings = new WeakMap(), _GrpcProvider_proto = new WeakMap(), _GrpcProvider_client = new WeakMap(), _GrpcProvider_package = new WeakMap(), _GrpcProvider__service = new WeakMap(), _GrpcProvider_instances = new WeakSet(), _GrpcProvider_loadProto = function _GrpcProvider_loadProto(path) {
    const packageDefinition = protoLoader.loadSync(path, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    return grpc.loadPackageDefinition(packageDefinition);
};
export { GrpcProvider };
