import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import Kafka from "../../providers/kafka/kafka-provider.js";

declare module "fastify" {
  interface FastifyInstance {
    Kafka: typeof Kafka;
  }
}

const kafkaPlugin = (
  fast: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) => {
  void options;
  /**
   * decorate fast with extended kafka module
   */
  fast.decorate("Kafka", Kafka);

  done();
};

export default fp(kafkaPlugin, {
  fastify: "4.x",
  name: "kafkaPlugin",
});
