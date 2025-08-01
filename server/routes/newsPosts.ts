import express from 'express';
import { 
    getNewsPosts, 
    getSinglePost, 
    createPost, 
    updatePost, 
    deletePost 
} from '../controller/newspostsController';

const router = express.Router();

router.get('/', getNewsPosts);
router.post('/', createPost);
router.get('/:id', getSinglePost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
