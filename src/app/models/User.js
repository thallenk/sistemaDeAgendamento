import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs'




class User extends Model{
    //buscando a base mãe com o super e replicando os atributos. Modo estático pois o usuário não muda.
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        },
        {
            sequelize,
            tableName: 'users'
        })
        this.addHook('beforeSave', async user =>{
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 10)
            }
        })
        return this;
    }
    // relacionando a photo ao usuario pelo id 
    static associate(models){
        this.belongsTo( models.File, { foreignKey: 'photo_id', as: 'photo'})
      }

    checkPassword(password){
        return bcrypt.compare(password, this.password_hash)
    }
}

export default User;