const terminate = (server, options = { coredump: false, timeout: 500 }) => {
    const exit = () => {
        options.coredump ? process.abort() : process.exit(0);
    };
    return () => async (err) => {
        if (err) {
            console.log(err.message, err.stack);
        }
        server.close(exit);
        setTimeout(exit, options.timeout);
    };
};
export default terminate;
