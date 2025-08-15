import controller from '../controllers/univercity.controller.js';

export class UniversityRouter {
    static router(fastify, _options) {
        fastify.post('/', controller.create)
            .get('/', controller.findAll)
            .get('/:id', controller.findById)
            .patch('/:id', controller.update)
            .delete('/:id', controller.remove);
    }
}