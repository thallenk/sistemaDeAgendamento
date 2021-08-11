import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs'




class Appointment extends Model{
    //buscando a base mãe com o super e replicando os atributos. Modo estático pois o usuário não muda.
    static init(sequelize){
        super.init({
            date: Sequelize.DATE,
            canceled_at: Sequelize.DATE,

        },
        {
            sequelize,
            //tableName: 'files'
        })
        return this

    }
    static associate(models){
        this.belongsTo( models.User, { foreignKey: 'user_id', as: 'user'})
        this.belongsTo( models.User, { foreignKey: 'collaborator_id', as: 'collaborator'})
      }

}

export default Appointment;