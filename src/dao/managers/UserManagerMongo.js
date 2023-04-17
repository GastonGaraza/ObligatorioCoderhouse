// Maneja todo lo relacionado a los usuarios en el sistema con persistencia en Mongo DB

const {user} = require("../models/user.model");

class UserManagerMongo {
	
	// Constructor de userManager
	constructor() {
	}

	// Devuelve todos los usuarios ingresados en la base mongo
	getUsers = async limit => {
		let allUsers = user.find();
		if (limit > 0){
			return allUsers.slice(0, limit);
		}else{
			return allUsers;
		}
    }
 
	// Agrega un usuario en la base mongo
	addUser = async userToAdd => {
		try {
			if (userToAdd.name != "" && userToAdd.last_name != "" && userToAdd.email != ""){
				await user.create(userToAdd);
				return userToAdd;
			}else{
				console.error("All the fields are mandatory (name, last name, email)");
			}
		} catch (error) {
			console.error("Can't save the user: " + userToAdd.email + " : " + error);	
		}
	}

	// Devuleve el producto con id igual a productId
	getUserById = async userId => {
		try {
			const userFinded = await user.findById(userId);
			return userFinded;
		} catch (error) {
			console.error("Can't get the product: " + userId + " : " + error);	
		}

	}

	// Checkea si existe el usuario con codigo igual a code para no ingresarlo nuevamente
	checkUser = async email => {
		user.findOne({ email: email })
			.then(user => {
				if (user) {
					return user;
				} else {
			  		console.log('User not found');
				}
		  	})
		  	.catch(error => {
				console.error('Error finding user:', error);
			});
	}
	
	// Elimina un usuario cambiando su status en el archivo usuarios.json 
	deleteUser = async userId => {
		let userFinded = await this.getProductById(userId);
		if (userFinded) {
			userFinded.status = false;
			await product.findByIdAndUpdate(userId, userFinded);
			return true;
		}else{
			console.error("Can't delete the user: " + userId);	
        	return false;
		}
	}

	// Actualiza un producto en el archivo usuarios.json
	updateUser = async (userId, userNewValues) => {
		let userFinded = this.getUserById(userId);
		if (userNewValues.name != undefined && userNewValues.title != ""){userFinded.name = productNewValues.title;}else{console.log("User name cant be empty")};
		if (userNewValues.last_name != undefined && userNewValues.description!= "") {userFinded.last_name = productNewValues.description;}else{console.log("User last name cant be empty")};
		if (userNewValues.email != undefined && userNewValues.price != "") {userFinded.price = productNewValues.email;}else{console.log("User email cant be empty")};
		user.updateOne({_id: userId}, userFinded);
		let allUsers = await this.getUsers();
		return allUsers;
	}
}

module.exports = UserManagerMongo;