import { createRequire } from 'module'
const requireJson = createRequire(import.meta.url)
const packageJson = requireJson('../../../package.json')

export default class Config {
    envs: Envs = {
        VERSION: packageJson.version.split('.')[0],
        APP_HOST: process.env.SCA_APP_HOST ?? `localhost`,
        APP_PORT: process.env.SCA_APP_PORT ?? `3000`,
        API_PREFIX:
            process.env.SCA_APP_PREFIX ??
            `/v${packageJson.version.split('.')[0]}`,
        DOCS_ENDPOINT: process.env.SCA_DOCS_ENDPOINT ?? `/documentation`,
        BROKER_CLIENT_ID: process.env.EVB_BROKER_CLIENT_ID ?? ``,
        BROKER_URL: process.env.EVB_BROKER_URL ?? ``,
        TOPIC_REQUESTS: process.env.AO_TOPICS_REQUESTS ?? `requests`,
        TOPIC_LOGS: process.env.AO_TOPICS_LOGS ?? `logs`,
        SERVICE_ADDRESS: process.env.SSA_ADDRESS ?? ``,
    }

}

export interface ConfigTypes {
    envs: Envs
}

export interface Envs {
    [id: string]: string
    VERSION: string
    APP_HOST: string
    APP_PORT: string
    API_PREFIX: string
    DOCS_ENDPOINT: string
    BROKER_CLIENT_ID: string
    BROKER_URL: string
    TOPIC_REQUESTS: string
}
