import { DataTypes, Model} from 'sequelize';
import db from '../db/db-config';
import Comment from './comment.model';



const Tutorial = db.define('Tutorial',{
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    published: {
        type: DataTypes.DATEONLY
    },

}, {
    createdAt: false,
    updatedAt: false,
    
});

Tutorial.hasMany(Comment, {
    foreignKey: 'tutorialid'
});
Comment.belongsTo(Tutorial, {
    foreignKey: 'tutorialid',
});


export default Tutorial;
