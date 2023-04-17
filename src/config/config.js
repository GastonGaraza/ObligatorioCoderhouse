const { connect } = require("mongoose")

let url = `mongodb://127.0.0.1:27017/ecommerce`

const objConfig = {
    connectDB: async () =>{
        try {
            await connect(url)
            console.log('Base de datos conectada')
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = {
    objConfig
}
