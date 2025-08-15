import Fastify from 'fastify';

const fastify = Fastify({
    logger: true
});

export class Application {
    static async start() {
        try {
            fastify.listen({ port: 3000 });
            console.log(`Server running on port:`, 3000);
        } catch (error) {
            fastify.log.error(error);
            process.exit(1);
        }
    }
}