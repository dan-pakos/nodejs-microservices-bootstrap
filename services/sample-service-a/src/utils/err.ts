export default class Err extends Error {
    #_code: number = 1001

    get code() {
        return this.#_code
    }

    set code(codeNo) {
        this.#_code = codeNo
    }
    constructor(error: any, code: number) {
        super(error)
        this.#_code = code
    }
}
