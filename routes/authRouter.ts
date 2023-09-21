import { Router } from 'express';
import { signinverify, isAdmin } from '../middleware/authmiddleware';
import { registerController, loginController, forgotpassword, confirmPhonenumber } from '../controller/authController';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);

router.post("/confirm",confirmPhonenumber)

router.put('/updatepassword', forgotpassword);

router.get('/verify', signinverify, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
