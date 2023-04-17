// Controlador para manejar las rutas correspondientes al objeto producto

const UserManager = require('../dao/managers/UserManagerMongo');
const userManager = new UserManager();
const {user}  = require('../dao/models/user.model');

// Devuelve todos los usuarios que estan en el sistema
exports.getUsers = async  (req, res) => { 
    try {
        let allUsers = [];
        if (req.query.limit) {
            const limit = parseInt(req.query.limit);
            allUsers = await userManager.getUsers(limit);
        }else{
            allUsers = await userManager.getUsers(0);
        }
        res.send(allUsers);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    };
}

// Devuelve un usuario con id igual a uid si este se encuentra en el sistema
exports.getUser = async (req, res) => {  
    try {
        const uid = req.params.uid;
        const findedUser = await userManager.getUserById(uid);
        res.send(findedUser);
      } catch (error) {
        console.error(error);
        res.sendStatus(500);
      };
}

// Agrega un usuario al sistema
exports.addUser = async (req, res) => {
    try {
        const {name, last_name, email} = req.body;
        if (name && last_name && email){
            const sameUser = await userManager.checkUser(email);
            if (!sameUser){
                const userToAdd = new user(req.body)
                const userAdded = await userManager.addUser(userToAdd);
                res.send(userAdded);
            }else{
                console.error("User already exists with email: " + email);
                res.sendStatus(500);            }
        }else{
            console.error("All the fields are mandatory (name, last name, email)");
            res.sendStatus(500);
        }       
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

// Actualiza el usuario con email igual a uid en el sistema
exports.updateUser = async (req, res) => {
    console.log(req.body);
    try {
        const uid = req.params.uid;
        const modifiedUser = await userManager.updateUser(uid, req.body)
        res.send(modifiedUser);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

// Elimina el usuario con id igual a uid del sistema
exports.deleteUser = async (req, res) => {
    try {
        const uid = req.params.uid;
        const userToDelete = await userManager.deleteUser(uid);
        res.send(userToDelete);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}