import  {Router} from 'express';
import multer from 'multer'

import multerConfig from './config/multer'
// import User from './app/models/User'
// import Database from './database'
import UserController from './app/controllers/UserController';
import User from './app/models/User';
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import CollaboratorController from './app/controllers/CollaboratorController';
import authMiddleware from './app/midllewares/auth'

const routes = new Router();
const upload = multer(multerConfig)
//apenas teste da aula 25:
// routes.get('/', async(req,res)=>{
//     const user = await User.create({
//         name:'thállen',
//         email:'thallen_k@hotmail.com',
//         password_hash: '1234567'
//     })
//     return res.json(user)
// })
    routes.post('/users', UserController.store)
    routes.post('/sessions', SessionController.store)


    //rotas autenticadas
    routes.use(authMiddleware)
    //atualizar dados com metodo put
    routes.put('/users',authMiddleware, UserController.update)

    // lista todos os colaboradores
    routes.get('/collaborator', CollaboratorController.index)

    //upload de arquivos
    routes.post('/files', upload.single('file'), FileController.store)
    
export default routes;