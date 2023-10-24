import { Request, Response} from 'express';
import Comment from '../models/comment.model';
import Tutorial from '../models/tutorial.model';


export const getComments = async (req: Request, res: Response) => {
    const { id } = req.params;
    const listComments =  await Comment.findAll();
    res.json(listComments);
}

export const deleteComment = async (req: Request, res: Response) => {
    const { tutorialId, commentId } = req.params;

    try {
        const tutorial = await Tutorial.findByPk(tutorialId);
        if (!tutorial) {
            return res.status(404).json({
                msg: `No existe un tutorial con el ID ${tutorialId}`,
            });
        }

        const comment = await Comment.findOne({
            where: {
                id: commentId,
                tutorialid: tutorialId,
            },
        });

        if (!comment) {
            return res.status(404).json({
                msg: `No existe un comentario con el ID ${commentId} relacionado al tutorial con el ID ${tutorialId}`,
            });
        }else{

            await Comment.destroy({
                where: {
                    id: commentId,
                },
            });
    
            res.json({
                msg: `El comentario con el ID ${commentId} fue eliminado exitosamente.`,
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el comentario.',
        });
    }

}

export const postComment = async (req: Request, res: Response) => {
    const { tutorialId } = req.params;
    const { content } = req.body;

    try {
        // Verifica si el tutorial existe.
        const tutorial = await Tutorial.findByPk(tutorialId);

        if (!tutorial) {
            return res.status(404).json({
                msg: `No existe un tutorial con el ID ${tutorialId}`,
            });
        }else{
            // Crea un nuevo comentario relacionado al tutorial.
            const newComment = await Comment.create({
                tutorialid: tutorialId,
                content,
            });

            res.status(201).json({
                msg: 'Comentario creado exitosamente',
                newComment,
            });
        }

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al crear el comentario.',
        });
    }
}

export const updateComment = async (req: Request, res: Response) => {
    const { tutorialId, commentId } = req.params;
    const { content } = req.body;
    
    try {
        //Verifica si el tutorial existe.
        const tutorial = await Tutorial.findByPk(tutorialId);

        if (!tutorial) {
            return res.status(404).json({
                msg: `No existe un tutorial con el ID ${tutorialId}`,
            });
        }

        //Verifica si el comentario existe y está relacionado con el tutorial.
        const comment = await Comment.findOne({
            where: {
                id: commentId,
                tutorialid: tutorialId,
            },
        });

        if (!comment) {
            return res.status(404).json({
                msg: `No existe un comentario con el ID ${commentId} relacionado al tutorial con el ID ${tutorialId}`,
            });
        }else{
            //Actualiza 
            await Comment.update({ content }, {
                where: {
                    id: commentId,
                },
            });

            //Muestra el contenido actualizado.
            const updatedComment = await Comment.findByPk(commentId);

            res.json({
                msg: `El comentario con el ID ${commentId} fue actualizado exitosamente.`,
                updatedComment,
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar el comentario.',
        });
    }

}