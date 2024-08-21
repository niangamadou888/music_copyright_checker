import express from 'express';
import { MusicController } from '../controllers/MusicController';


const router = express.Router();
const musicController = new MusicController();

router.post('/', musicController.createMusic);
router.get('/', musicController.getAllMusicesByUser);
router.post('/create-bulk', musicController.createBulkMusic);
router.get('/all', musicController.getAllMusics);
// router.delete('/delete-all', musicController.deleteMusics);


export default router;