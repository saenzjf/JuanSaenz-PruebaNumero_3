import { Request, Response} from 'express';
import Tutorial from '../models/tutorial.model';
import Comments from '../models/comment.model';

export const getTutorials = async (req: Request, res: Response) => {
    
    const listTutorials =  await Tutorial.findAll();

    res.json(listTutorials);
    
}

export const getTutorial = async (req: Request, res: Response) => {
    const { id } = req.params;

    const tutorial = await Tutorial.findByPk(id);

    if (!tutorial) {
        return res.status(404).json({
            msg: `No existe un tutorial con el id ${id}`,
        });
    }
  
    const comments = await Comments.findAll({
        where:{
            tutorialid: id
        }
    });

    res.json({ tutorial, comments });
}