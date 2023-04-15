import { FastifyInstance } from 'fastify'

const terminate = (
    server: FastifyInstance,
    options = { coredump: false, timeout: 500 }
) => {
    const exit = () => {
        options.coredump ? process.abort() : process.exit(0)
    }

    return () => async (err: Error) => {
        if (err) {
            console.log(err.message, err.stack)
        }

        server.close(exit)
        setTimeout(exit, options.timeout)
    }
}

export default terminate
