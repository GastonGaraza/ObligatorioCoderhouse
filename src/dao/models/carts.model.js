const { Schema , model } = require('mongoose');

const collection = 'carts';

const cartSchema = new Schema({
	products: [{
		type: Schema.Types.ObjectId,
		ref: 'product'
	  }]
});

const cart = model(collection , cartSchema)

module.exports = {
    cart
}