import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('plataformaTutoriales', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql'
  });

  export default sequelize;