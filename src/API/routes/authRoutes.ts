import { Router } from 'express';
import { AuthControllers } from '../controllers/authControllers';

const authRouter = Router();

authRouter.post('/Login', AuthControllers.login);
authRouter.post('/Signup', AuthControllers.signup);
authRouter.post('/Password-Recovery', AuthControllers.passwordRecovery);
authRouter.post('/Change-Password', AuthControllers.changePassword);
authRouter.post('/Confirm-Email', AuthControllers.confirmEmail);

export { authRouter };
