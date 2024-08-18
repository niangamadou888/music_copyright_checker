import express from 'express';
import { MusicController } from '../controllers/MusicController';


const router = express.Router();
const musicController = new MusicController();

router.post('/', musicController.createMusic);
router.get('/', musicController.getAllMusicesByUser);


export default router;