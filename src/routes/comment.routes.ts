import { Router} from 'express';
import { getComments } from '../controllers/comment.controller';

const routerComments = Router();

routerComments.get('/:id', getComments);

export default routerComments;
