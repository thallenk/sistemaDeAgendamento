import * as Yup from 'yup'
import {startOfHour, parseISO, isBefore, format} from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import Appointment from "../models/Appointment";
import User from '../models/User';
import File from '../models/File'
import Notifications from '../schema/Notifications';


class AppointmentController{



    //Listando agendamento para usuario
    async index(req,res){
        //Paginação de agendamentos
        const { page = 1} = req.query



        const appointments = await Appointment.findAll({
            where: {
                user_id: req.userId,
                canceled_at: null
            },
            order: ['date'],
            attributes:['id', 'date'],
            //limitando 20 registros por page
            limit: 20,
            offset: (page-1)*20,
            include: [
                {   //relacionando o user com o appointment
                    model: User,
                    as: 'collaborator',
                    //retornando id e nome do usuario para lista de agendamentos
                    attributes: ['id', 'name'],
                    include:[
                        {
                            //relacionando imagem do usuario no agendamento
                            model: File,
                            as: 'photo',
                            attributes: ['id','path', 'url']
                        }
                    ]

                }
            ]
        })
        return res.json(appointments)
    }

    async store(req,res){
        const schema = Yup.object().shape({
            collaborator_id: Yup.number().required(),
            date: Yup.date().required()
        })
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({err:'Inválido'})

        }
        const { collaborator_id,  date} = req.body;

        const isCollaborator = await User.findOne({
            where: { id: collaborator_id, provider:true}
        })
        if(!isCollaborator){
            return res.status(401).json({error: 'Colaborador não localizado'})
        }

        //Tratando a data de agendamento
        const startHour = startOfHour(parseISO(date))
        if(isBefore(startHour, new Date())){
            return res.status(400).json({
                erro: 'Horário não disponível'
            })
        }
        
        //Verificando se há uma data marcada igual a data inputada
        const checkAvaialability = await Appointment.findOne({
            where: {
                collaborator_id,
                canceled_at: null,
                date: startHour

            }
        
        })

        if(checkAvaialability){
            return res.status(400).json({
                erro: 'Horário não disponível para este colaborador'
            })
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            collaborator_id,
            date: startHour
        })


        // Criando corpo da notificação com o schema do mongodb
        // tratando nome de usuario e data
        const user = await User.findByPk(req.userId)
        const formatDate =  format(
            startHour,
            "'o dia' dd 'de' MMMM', às' H:mm'h'",
            {locale: pt}
        )  


        await Notifications.create({
            content: `Novo agendamento de ${user.name} para ${formatDate}`,
            user: collaborator_id
        })

        return res.json(appointment) 
    }
}
export default new AppointmentController()