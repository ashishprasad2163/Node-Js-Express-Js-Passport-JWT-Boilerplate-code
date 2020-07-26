import express, { response } from 'express';
import { Trader } from '../models';
import { signToken, userAuth, serializeUser } from '../functions/auth';
const router = express.Router();

//register trader
router.post('/register', async (req, res) => {
  try {
    const newUser = await Trader.create({ ...req.body });
    const payload = {
      username: newUser.username,
      name: newUser.name,
      id: newUser.id,
    };
    let token = await signToken(payload);
    return res.status(201).json({ token, payload, success: true });
  } catch (err) {
    return res.status(403).json({ message: err.message, success: false });
  }
});
export default router;
