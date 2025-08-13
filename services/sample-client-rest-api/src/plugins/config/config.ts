import { createRequire } from 'module'
const requireJson = createRequire(import.meta.url)
const packageJson = requireJson('../../../package.json')

export default class Config {
    envs: Envs = {
        VERSION: packageJson.version.split('.')[0],
        APP_HOST: process.env.SCRA_APP_HOST ?? `localhost`,
        APP_PORT: process.env.SCRA_APP_PORT ?? `3000`,
        API_PREFIX:
            process.env.SCRA_APP_PREFIX ??
            `/v${packageJson.version.split('.')[0]}`,
        DOCS_ENDPOINT: process.env.SCRA_DOCS_ENDPOINT ?? `/documentation`,
        BROKER_CLIENT_ID: process.env.EVB_BROKER_CLIENT_ID ?? ``,
        BROKER_URL: process.env.EVB_BROKER_URL ?? ``,
        TOPICS_REQUESTS: process.env.AO_TOPICS_REQUESTS ?? `requests`,
        TOPICS_LOGS: process.env.AO_TOPICS_LOGS ?? `logs`,
        SERVICE_ADDRESS: process.env.SSA_ADDRESS ?? ``,
    }
}

export interface ConfigTypes {
    envs: Envs
}

export interface Envs {
    VERSION: string
    APP_HOST: string
    APP_PORT: string
    API_PREFIX: string
    DOCS_ENDPOINT: string
    BROKER_CLIENT_ID: string
    BROKER_URL: string
    TOPICS_REQUESTS: string
    TOPICS_LOGS: string
    SERVICE_ADDRESS: string
}
