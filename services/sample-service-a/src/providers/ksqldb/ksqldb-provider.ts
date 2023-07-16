import http2 from 'http2'

export default class KsqlDBClient {
    #address
    #client

    constructor(ksqlDBBaseUrl: string) {
        this.#address = ksqlDBBaseUrl
    }

    connect() {
        return new Promise((res, rej) => {
            this.#client = http2.connect(this.#address)
            this.#client.on('error', (error) => rej(error))
            this.#client.on('connect', res)
        })
    }

    request(query: any, cb = console.log) {
        return new Promise((res, rej) => {
            try {
                const session = this.#client.request({
                    [http2.constants.HTTP2_HEADER_PATH]: '/query-stream',
                    [http2.constants.HTTP2_HEADER_METHOD]: 'POST',
                    [http2.constants.HTTP2_HEADER_CONTENT_TYPE]:
                        'application/vnd.ksql.v1+json',
                })

                session.setEncoding('utf8')
                session.on('data', (queryResult) => {
                    if (typeof cb === 'function') {
                        cb(queryResult)
                    }
                })

                const payload = Buffer.from(JSON.stringify(query))
                session.end(payload)
                session.on('close', (data) => {
                    console.log('DATA', data)
                    const response = data.toString()
                    res(response)
                })
            } catch (err) {
                rej(err)
            }
        })
    }

    async request2(query) {
        const response = await fetch(this.#address, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.ksql.v1+json',
            },
            body: JSON.stringify(query),
        })

        return await response.json()
    }
}
