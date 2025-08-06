import { Router } from 'express';
import { roleController } from '../controllers/role.controller';

const router = Router();

// GET /roles — всі ролі
router.get('/', roleController.getAllRoles);

// GET /roles/:id — роль за id
router.get('/:id', roleController.getRoleById);

// POST /roles — створити нову роль
router.post('/', roleController.createRole);

// PUT /roles/:id — оновити роль
router.put('/:id', roleController.updateRole);

// DELETE /roles/:id — видалити роль
router.delete('/:id', roleController.deleteRole);

// GET /roles/name/:name — знайти роль за назвою (ENUM)
// router.get('/name/:name', roleController.getRoleByName);

export default router;