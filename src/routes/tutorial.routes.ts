import { Router} from 'express';
import {  getTutorial, getTutorials } from '../controllers/tutorial.controller';
import { deleteComment, postComment, updateComment } from '../controllers/comment.controller';


const router = Router();

router.get('/', getTutorials);
router.get('/:id', getTutorial);
router.delete('/:tutorialId/:commentId', deleteComment);
router.post('/:tutorialId', postComment);
router.put('/:tutorialId/:commentId', updateComment);



export default router;
