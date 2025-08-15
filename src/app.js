import Fastify from 'fastify';
import { UserRouter } from './routes/users.route.js';
import { StudentRouter } from './routes/student.route.js';
import { UniversityRouter } from './routes/univercity.route.js';

const fastify = Fastify({
    logger: true
});

fastify.register(UserRouter.router, { prefix: '/users' });
fastify.register(StudentRouter.router, { prefix: '/student' });
fastify.register(UniversityRouter.router, { prefix: '/univercity' });

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