import Sequelize from 'sequelize'
import User from '../app/models/User'
import File from '../app/models/File'
import Appointment from '../app/models/Appointment'
//importando database
import databaseConfig from '../config/database'

const models = [User, File, Appointment];
 
class Database{
    constructor(){
        this.init();
    }
    
    init(){
        this.connection = new Sequelize(databaseConfig);
        models
        .map(model => model.init(this.connection))
        //chamando o metodo associate criando no arquivo User para fazer a interação entre as imagens e o usuário
        .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database()