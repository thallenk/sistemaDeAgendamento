import  {Router} from 'express';
// import User from './app/models/User'
// import Database from './database'
import UserController from './app/controllers/UserController';
import User from './app/models/User';


const routes = new Router();
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

    
export default routes;