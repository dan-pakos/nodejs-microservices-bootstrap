import {
    FastifyInstance,
    FastifyPluginOptions,
    DoneFuncWithErrOrRes,
} from 'fastify'

export default class RequestsLogger {
    #producer!: any
    #acumulator: any[]
    #topic: string = `requests`
    #mode: string
    #key: string
    #queueSize: number

    constructor(opts: FastifyPluginOptions) {
        this.#acumulator = []
        this.#topic = opts.topic
        this.#key = opts.key
        this.#mode = opts?.mode ?? `every`
        this.#queueSize = opts?.queueSize ?? 100
    }

    listen(
        fast: FastifyInstance,
        options: FastifyPluginOptions,
        done: DoneFuncWithErrOrRes
    ) {
        this.#producer = new fast.Kafka.Producer({
            'client.id': fast.config.envs.BROKER_CLIENT_ID,
            'metadata.broker.list': fast.config.envs.BROKER_URL,
            dr_cb: false, // Specifies that we want a delivery-report event to be generated
        })

        /**
         * onSend - make sure is passed validation and parsing, push request when sending
         */
        fast.addHook('onSend', (request, reply, payload, done) => {
            const { body, query, params } = request

            const reqData = { key: this.#key, body, query, params }

            this.#acumulator.push(reqData)

            if (this.#mode === `every`) {
                this.#sendMessage(reqData)
            } else {
                this.#reconcilePropagate(this.#queueSize)
            }

            done()
        })

        done()
    }

    #reconcilePropagate(queueSize: number) {
        if (this.#acumulator.length % queueSize === 0) {
            this.#sendMessage(this.#acumulator)
        } else {
            this.#scheduleSend()
        }
    }

    // setTimeout
    #scheduleSend() {}

    async #sendMessage(msg: any) {
        const message = typeof msg === 'string' ? msg : JSON.stringify(msg)

        if (!this.#producer.isConnected()) {
            this.#producer = await this.#producer.connectAsync()
        }

        this.#producer.produce(
            // Topic to send the message to
            this.#topic,
            // optionally we can manually specify a partition for the message
            // this defaults to -1 - which will use librdkafka's default partitioner (consistent random for keyed messages, random for unkeyed messages)
            null,
            // Message to send. Must be a buffer
            Buffer.from(message),
            // for keyed messages, we also specify the key - note that this field is optional
            this.#key,
            // you can send a timestamp here. If your broker version supports it,
            // it will get added. Otherwise, we default to 0
            Date.now()
            // you can send an opaque token here, which gets passed along
            // to your delivery reports
        )
    }
}

export interface RequestsListenerTypes {
    (name: string): string
}
