import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs'




class File extends Model{
    //buscando a base mãe com o super e replicando os atributos. Modo estático pois o usuário não muda.
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            path: Sequelize.STRING,
            //gerando url da imagem para o frontend
            url: {
                type: Sequelize.VIRTUAL,
                get(){
                    return `http://localhost:3333/files/${this.path}`
                }
            }
        },
        {
            sequelize,
            //tableName: 'files'
        })
        return this

    }

}

export default File;