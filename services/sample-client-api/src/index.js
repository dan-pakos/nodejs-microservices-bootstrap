import server from './app.js'
// import { terminate } from "./utils/index.js";
const port = process.env['APP_PORT'] ?? 8080
const host = process.env['APP_HOST'] ?? '127.0.0.1'
server()
    .then((app) => {
        app.listen({ port: port, host: host })
            // test #4
            // .then(async () => {
            //     await app.ready()
            //     app.swagger()
            // })
            // .then(() => {
            //   const exitHandler = (msg: string) =>  {
            //     console.error("Error starting server 2: ", msg);
            //     return terminate(app, {
            //       coredump: false,
            //       timeout: 500,
            //     })
            //   };
            //   process.on("uncaughtException", exitHandler("uncaughtException"));
            //   process.on("unhandledRejection", exitHandler("unhandledRejection"));
            //   process.on("SIGTERM", exitHandler("SIGTERM"));
            //   process.on("SIGINT", exitHandler("SIGINT"));
            // })
            .catch((err) => {
                console.error('Error starting server: ', err)
                process.exit(1)
            })
    })
    .catch((err) => console.error(err))
