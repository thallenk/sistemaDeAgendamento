import Sequelize, { Model } from 'sequelize';

class User extends Model{
    //buscando a base mãe com o super e replicando os atributos. Modo estático pois o usuário não muda.
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        },
        {
            sequelize,
            tableName: 'users'
        })
    }
}

export default User;