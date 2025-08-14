export interface ConfigType {
    envs: Envs
}

export interface Envs {
    LOG_LEVEL: string
    APP_HOST: string
    APP_PORT: string
    MONGO_DB_CONNECTION_URL: string
    MONGO_DATABASE: string
    BROKER_CLIENT_ID: string
    BROKER_URL: string
    TOPICS_LOGS: string
}

export class Config {
    #_envs: Envs = {
        LOG_LEVEL: process.env.LOG_LEVEL ?? `error`,
        APP_HOST: process.env.SSA_APP_HOST ?? `localhost`,
        APP_PORT: process.env.SSA_APP_PORT ?? `8000`,
        MONGO_DB_CONNECTION_URL: process.env.SDB_CONNECTION_URL ?? ``,
        MONGO_DATABASE: process.env.SDB_MONGO_DATABASE ?? ``,
        BROKER_CLIENT_ID: process.env.BROKER_CLIENT_ID ?? ``,
        BROKER_URL: process.env.EVB_BROKER_URL ?? ``,
        TOPICS_LOGS: process.env.AO_TOPICS_LOGS ?? ``,
    }

    get envs() {
        return this.#_envs
    }
}

const configPlugin = (): ConfigType => {
    return new Config()
}

export default configPlugin
