import jwt from 'jsonwebtoken'
//como o jwt trabalha como uma promise e estamos fazendo tudo de forma assíncrona iremos importar o primisify.
import { promisify } from 'util'
import authConfig from '../../config/auth'


//metodo assincríno sempre tem q ter o async e await
export default async (req,res,next) => {
    const authHeaders = req.headers.authorization
    //console.log(authHeaders)
    if(!authHeaders){
        return res.status(401).json({
            message: 'Para acessar este serviço é necessário estar logado'
        })
    }
    //o split separa a string em um determinado caracter que nesse caso é o espaço além de transformar o resultado em array.
    const [, token ] = authHeaders.split(' ')
    
    // n precisamos do bearer console.log('Bearer', bearer)
    console.log('Token', token)

    //Agora vamos decodificar esse token para pegarmos o id do usuário

    try{
        //tratando o promisify e verificando se o token corresponde ao token gerado no authConfig
        const decoded = await promisify(jwt.verify)(token, authConfig.secret)
        console.log(decoded)
        req.userId = decoded.id;
        //chama o proximo parametro da rota que contém a mensagem de true
        next();

    }catch(error){
        return res.status(401).json({message: 'Token Invalido'})

    }


}