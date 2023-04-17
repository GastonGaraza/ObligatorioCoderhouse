// Controlador para manejar las rutas correspondientes al objeto producto

const MessageManager = require('../dao/managers/MessageManagerMongo');
const messageManager = new MessageManager();
const {message}  = require('../dao/models/message.model');

// Devuelve todos los mensajes que estan en el sistema
exports.getMessages = async  (req, res) => { 
    try {
        let allMessages = [];
        if (req.query.limit) {
            const limit = parseInt(req.query.limit);
            allMessages = await messageManager.getMessages(limit);
        }else{
            allMessages = await messageManager.getMessages(0);
        }
        res.send(allMessages);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    };
}

// Agrega un mensaje al sistema
exports.addMessage = async (req, res) => {
    try {
        const {email, message} = req.body;
        if (email && message){
            const messageToAdd = new message(req.body)
            const messageAdded = await messageManager.addMessage(messageToAdd);
            res.send(messageAdded);    
        }else{
            console.error("All the fields are mandatory (email, message)");
            res.sendStatus(500);
        }       
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}