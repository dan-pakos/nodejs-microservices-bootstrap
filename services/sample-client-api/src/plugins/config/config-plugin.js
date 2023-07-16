import fp from 'fastify-plugin';
import Config from './config.js';
const configPlugin = (fast, options, done) => {
    void options;
    // etc
    const config = new Config();
    fast.decorate('config', config);
    done();
};
export default fp(configPlugin, {
    fastify: '4.x',
    name: 'configPlugin',
});
