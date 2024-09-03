import express from 'express';
import { uploadImage, downloadImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.get('/hello', (req, res)=>{

    const messageString = {
        message: 'This is a test message'
    }

    res.json(messageString);

})

router.post('/upload', upload.single('file'), uploadImage)

router.get('/file/:fileId', downloadImage);

export default router;