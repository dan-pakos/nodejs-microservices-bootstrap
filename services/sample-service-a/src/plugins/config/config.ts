export default class Config {
    #_envs: Envs = {
        APP_HOST: process.env.SSA_APP_HOST ?? `localhost`,
        APP_PORT: process.env.SSA_APP_PORT ?? `8000`,
        MONGO_DB_CONNECTION_URL: process.env.SDB_CONNECTION_URL ?? ``,
        MONGO_DATABASE: process.env.SDB_MONGO_DATABASE ?? ``,
    }

    get envs() {
        return this.#_envs
    }
}

export interface ConfigTypes {
    (name: string): string
    envs: Envs
}

export interface Envs {
    [id: string]: string // index for an object interface
    APP_HOST: string
    APP_PORT: string
    MONGO_DB_CONNECTION_URL: string
    MONGO_DATABASE: string
}
