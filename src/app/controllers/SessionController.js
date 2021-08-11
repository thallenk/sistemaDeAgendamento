import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import User from "../models/User";
import authConfig from '../../config/auth';


class SessionController{
    async store(req, res){

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            //a senha tem no minimo 6 carcteres
            password: Yup.string().required(),

        })
        
        if( !(await schema.isValid(req.body))){
            return res.status(401).json({
                message:'Falha na validação'})
        }
        
        const {email, password} = req.body;

        const user = await User.findOne({where: { email }})

        if(!user){
            return res.status(401).json({
                error: 'Usuário não encontrado'})
        }

        if( !(await user.checkPassword(password))){
            return res.status(401).json({error: 'Senhha Invalida'})
        }

        const {id, name } = user;
        
        return res.json({
            user:{
                id,
                name,
                email
            },
            //cria um token com o id e o secredo!
            token: jwt.sign({ id }, authConfig.secret,{
                expiresIn: authConfig.expiresIn
            })
        })
    }
}

export default new SessionController()