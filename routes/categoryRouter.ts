import { Router,RequestHandler  } from 'express';
import {
  categoryEntry,
  updateCategory,
  getallCategory,
  getsingleCategory,
  deleteCategory,
  getsubcategory,
} from '../controller/categoryController';
import { signinverify, isAdmin } from '../middleware/authmiddleware';

const router = Router();

router.post('/', signinverify, isAdmin, categoryEntry);
router.put('/update/:id', signinverify, isAdmin, updateCategory);
router.get('/getall', getallCategory);
router.get('/:slug', getsingleCategory);
router.delete('/delete/:id', signinverify, isAdmin, deleteCategory);
router.get('/main/:maincategory', getsubcategory);

export default router;
