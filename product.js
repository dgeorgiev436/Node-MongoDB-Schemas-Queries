const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
	console.log("Connection achieved");
}).catch((err) => {
	console.log("ERRROR: " + err);
})


const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxLength: 15
	},
	price: {
		type: Number,
		required: true,
		min: [0, "HEY, WE DONT JUST GIFT ITEMS HERE, AIGHT?"]
	},
	onSale: {
		type: Boolean,
		default: false
	},
	categories: {
		type: [String],
		default: ["Cycling"]
	},
	qty: {
		online: {
			type: Number,
			min: 0,
		},
		inStore: {
			type: Number,
			min: 0
		}
	},
	size: {
		type: String,
		enum: ["S", "M", "L"]
	}
})

// INSTANCE METHODS
productSchema.methods.greet = function(){
	console.log("HELLO, HOW ARE U FROM " + this.name)
}
productSchema.methods.toggleOnSale = function() {
	this.onSale = !this.onSale;
	console.log(`On sale status of ${this.name} changed to ${this.onSale}`);
	return this.save();
}

productSchema.methods.addCategory = function(category){
	this.categories.push(category);
	console.log(`${category} added to the list`)
	return this.save();
}
// STATIC METHODS
productSchema.statics.fireSale = function(){
	return this.updateMany({}, {onSale: true, price: 0})
}

productSchema.statics.findByPrice = async(price) =>{
	await Product.find({price: price}).then((data) => {
		console.log(data);
	})
}


const Product = mongoose.model("Product", productSchema);

// Product.fireSale().then((data) => {
// 	console.log(data);
// }).catch((err) => {
// 	console.log(err)
// })

Product.findByPrice(0);

const findProduct = async() => {
	const foundProduct = await Product.findOne({name: "Bike seat"});
	await foundProduct.toggleOnSale();
	await foundProduct.addCategory("Racing")
	console.log(foundProduct)
}

// findProduct();


// const bike = new Product({
// 	name: "Breaks",
// 	price: 45,
// 	categories: ["cycling", "Safety", "Comfort"],
// 	qty: {
// 		online: 2500,
// 		inStore: 100
// 	},
// 	size: "S"
// })

// bike.save().then((data) => {
// 	console.log("SUCCESS!!")
// 	console.log(data)
// }).catch((err) =>{
// 	console.log("ERRROR!!!!")
// 	console.log(err)
// })


// Product.findOneAndUpdate({name: "Bike brakes"}, {price: 11.99}, {new: true, runValidators: true}).then((data) => {
// 	console.log("IT WORKED!!!!");
// 	console.log(data);
// }).catch((err) => {
// 	console.log("ERRRORRR!!!!!");
// 	console.log(err);
// })