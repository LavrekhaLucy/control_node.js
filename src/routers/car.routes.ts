import { Router } from 'express';
import { carController } from '../controllers/car.controller';


const router = Router();


router.post('/', carController.create);
router.put('/:id',carController.update);

export default router;
