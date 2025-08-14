import fastify from './app.js'

try {
    await fastify.listen({
        port: parseInt(fastify.config.envs.APP_PORT),
        host: fastify.config.envs.APP_HOST,
    })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}

// server()
//     .then(async (app) => {
//         await fastify
//             .listen({ port: <number>port, host: <string>host })

//             // .then(async () => {
//             //     await app.ready()
//             //     app.swagger()
//             // })

//             // .then(() => {
//             //   const exitHandler = (msg: string) =>  {
//             //     console.error("Error starting server 2: ", msg);

//             //     return terminate(app, {
//             //       coredump: false,
//             //       timeout: 500,
//             //     })
//             //   };

//             //   process.on("uncaughtException", exitHandler("uncaughtException"));
//             //   process.on("unhandledRejection", exitHandler("unhandledRejection"));
//             //   process.on("SIGTERM", exitHandler("SIGTERM"));
//             //   process.on("SIGINT", exitHandler("SIGINT"));
//             // })
//             .catch((err: Error) => {
//                 console.error('Error starting server: ', err)
//                 process.exit(1)
//             })
//     })
//     .catch((err) => console.error(err))
