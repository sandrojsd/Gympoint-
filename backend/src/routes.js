import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import Help_orderController from './app/controllers/Help_orderController';
import AnswerController from './app/controllers/AnswerController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);
routes.get('/students/:id/help-orders', Help_orderController.index);
routes.post('/students/:id/help-orders', Help_orderController.store);

routes.use(authMiddlewares);

routes.put('/users', UserController.update);
routes.post('/users', UserController.store);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

routes.get('/help_order/answer', AnswerController.show);
routes.put('/help_order/:id/answer', AnswerController.update);

export default routes;
