export default class Err extends Error {
    #_code: number | null = null

    get code() {
        return this.#_code
    }

    set code(codeNo) {
        this.#_code = codeNo
    }

    constructor(error: any) {
        super(error)
    }
}

export const ERRORS = {
    APPLICATION_ERROR: `Requesting a locations caused an error.`,
}
