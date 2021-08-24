import * as Yup from 'yup'
import {startOfHour, parseISO, isBefore} from 'date-fns'
import Appointment from "../models/Appointment";
import User from '../models/User';
import File from '../models/File'


class AppointmentController{

    //Listando agendamento para usuario
    async index(req,res){
        const appointments = await Appointment.findAll({
            where: {
                user_id: req.userId,
                canceled_at: null
            },
            order: ['date'],
            attributes:['id', 'date'],
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

        return res.json(appointment) 
    }
}
export default new AppointmentController()