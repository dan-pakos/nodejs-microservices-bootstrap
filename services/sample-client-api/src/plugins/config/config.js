var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Config__envs;
import { createRequire } from 'module';
const requireJson = createRequire(import.meta.url);
const packageJson = requireJson('../../../package.json');
export default class Config {
    constructor() {
        _Config__envs.set(this, {
            VERSION: packageJson.version.split('.')[0],
            APP_HOST: process.env.SCA_APP_HOST ?? `localhost`,
            APP_PORT: process.env.SCA_APP_PORT ?? `3000`,
            API_PREFIX: process.env.SCA_APP_PREFIX ??
                `/v${packageJson.version.split('.')[0]}`,
            DOCS_ENDPOINT: process.env.SCA_DOCS_ENDPOINT ?? `/documentation`,
            BROKER_CLIENT_ID: process.env.EVB_BROKER_CLIENT_ID ?? ``,
            BROKER_URL: process.env.EVB_BROKER_URL ?? ``,
            TOPIC_REQUESTS: process.env.AO_TOPICS_REQUESTS ?? `requests`,
            TOPIC_LOGS: process.env.AO_TOPICS_LOGS ?? `logs`,
            SERVICE_ADDRESS: process.env.SSA_ADDRESS ?? ``,
        });
    }
    get envs() {
        return __classPrivateFieldGet(this, _Config__envs, "f");
    }
}
_Config__envs = new WeakMap();
