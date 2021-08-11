import User from '../models/User'
import File from '../models/File'
class CollaboratorController{

    async index(req, res){

        const collaboratior = await User.findAll({
            where: {provider: true},
            //eu nao posso retornar tudo que tem no banco, ent vou retornar apenas as informações que preciso:
            attributes: ['id', 'name', 'email', 'photo_id'],
            include: [{
                model: File,
                as: 'photo',
                attributes: ['name', 'path', 'url']
            }]
        })
        return res.json(collaboratior)
    }
} 
export default new CollaboratorController()