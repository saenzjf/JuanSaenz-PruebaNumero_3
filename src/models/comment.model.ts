import { DataTypes, Model} from 'sequelize';
import db from '../db/db-config';
import Tutorial from './tutorial.model';


const Comment = db.define('Comment',{
    content: {
        type: DataTypes.TEXT
    },
    tutorialid: {
        type: DataTypes.NUMBER
    }
    
}, {
    createdAt: false,
    updatedAt: false,
    
});


export default Comment;
