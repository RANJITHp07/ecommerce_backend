import { Router,RequestHandler  } from 'express';
import {
  createProduct,
  getProducts,
  getsingleProduct,
  deleteProduct,
  searchproduct,
  filterproduct,
  getProductbycategory,
  updateProduct,
} from '../controller/productController';
import { signinverify, isAdmin } from '../middleware/authmiddleware';

const router = Router();

router.get('/filter', filterproduct);
router.post('/create', signinverify, isAdmin, createProduct);
router.get('/getall', signinverify, isAdmin, getProducts);
router.get('/:param', getsingleProduct);
router.delete('/delete/:id', signinverify, isAdmin, deleteProduct);
router.get('/search/:keyword', searchproduct);
router.get('/get/:category', getProductbycategory);
router.put('/updateproduct/:id', signinverify, isAdmin, updateProduct);

export default router;
