// Maneja todo lo relacionado a los mensajes en el sistema con persistencia en Mongo DB

const {message} = require("../models/message.model");

class MessageManagerMongo {
	
	// Constructor de userManager
	constructor() {
	}

	// Devuelve todos los mensajes ingresados en la base mongo
	getMessages = async limit => {
		let allMessages = message.find();
		if (limit > 0){
			return allMessages.slice(0, limit);
		}else{
			return allMessages;
		}
    }
 
	// Agrega un mensaje en la base mongo
	addMessage = async messageToAdd => {
		try {
			if (messageToAdd.email != "" && messageToAdd.message != ""){
				await message.create(messageToAdd);
				return messageToAdd;
			}else{
				console.error("All the fields are mandatory (email, message)");
			}
		} catch (error) {
			console.error("Can't save the message from user: " + messageToAdd.email + " : " + error);	
		}
	}
}

module.exports = MessageManagerMongo;