import User from '../models/User'

class UserController{
    async store(req,res){
        //o find one retorna uma promise, logo ele precisa ser retornar só quando acabar a promise, por isso usamos o await e uma função assincrona.
        const userExists = await User.findOne({
            //tratando o email pois ele deve ser unico
            where: {email: req.body.email}})
            if(userExists){
                return res.status(400).json({error:'Usuário já cadastrado'})
            }
        const user = await User.create(req.body)
        return res.json(user)
    }
}
export default new UserController();