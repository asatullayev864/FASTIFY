import { BaseController } from "./base.controller.js";

class StudentController extends BaseController {
    constructor() {
        super("students");
    }
}

export default new StudentController();