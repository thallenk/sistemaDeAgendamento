import User from '../models/User'
import * as Yup from 'yup'


class UserController{
    async store(req,res){

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            //a senha tem no minimo 6 carcteres
            password: Yup.string().required().min(6),

        })
        
        if( !(await schema.isValid(req.body))){
            return res.status(401).json({
                message:'Falha na validação'})
        }

        //o find one retorna uma promise, logo ele precisa ser retornar só quando acabar a promise, por isso usamos o await e uma função assincrona.
        const userExists = await User.findOne({
            //tratando o email pois ele deve ser unico
            where: {email: req.body.email}})
            if(userExists){
                return res.status(400).json({error:'Usuário já cadastrado'})
            }
        //Alerando o argumento user para exatamente o dados queremos retornar melhor a segurança do cliente porque antes ele retornava a senha do usuário e  agora só retorna os argumentos abaixo
        const {id, name, email, provider} = await User.create(req.body)
        return res.json({
            id,
            name,
            email,
            provider
        })
    }

    async update(req,res){
        //Utlizando o yup para validar dados 
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when(
                //se oldPassword for informado, ele faz com que o campo seja obrigatório
                'oldPassword', (oldPassword, field) => oldPassword ? field.required() : field
            ),
            //confirmando a nova senha
            confirmPassWord: Yup.string().when( 'password', (password, field) => password ? field.required().oneOf([Yup.ref('password')]) : field )

        })
        //Valida TODOS os dados do schema
        if( !(await schema.isValid(req.body))){
            return res.status(401).json({
                message:'Falha na validação'})
        }


        const {email, oldPassword} = req.body;

        const user = await User.findByPk(req.userId)

        if(email && email != user.email){
            const userExists = await User.findOne({
                //tratando o email pois ele deve ser unico
                where: {email}})
                if(userExists){
                    return res.status(400).json({error:'Usuário já cadastrado'})
                }
        }


        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({message: 'Senha não confere'})
        }

        const {id, name, provider} = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            provider
        })
    }
}
export default new UserController();