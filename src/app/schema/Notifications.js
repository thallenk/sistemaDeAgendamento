import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user: {
        type: Number,
        required: true
    },
    read: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    // campo de data de criação e atualização do usuario (createdat, updatedat)
    timestamps: true
})

export default mongoose.model('notifications', NotificationSchema)