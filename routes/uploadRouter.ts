import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());

const router: Router = express.Router();

router.use('/images', express.static(path.join(__dirname, 'public/images')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/upload/image1', upload.single('img1'), (req: Request, res: Response) => {
  try {
    res.status(200).send('Successfully Uploaded');
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post('/upload/image2', upload.single('img2'), (req: Request, res: Response) => {
  try {
    res.status(200).send('Successfully Uploaded');
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post('/upload/image3', upload.single('img3'), (req: Request, res: Response) => {
  try {
    res.status(200).send('Successfully Uploaded');
  } catch (err) {
    res.status(404).json(err);
  }
});

export default router;
