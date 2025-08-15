import controller from '../controllers/student.controller.js';

export class StudentRouter {
    static router(fastify, _options) {
        fastify.post('/', controller.create)
            .get('/', controller.findAll)
            .get('/:id', controller.findById)
            .patch('/:id', controller.update)
            .delete('/:id', controller.remove);
    }
}