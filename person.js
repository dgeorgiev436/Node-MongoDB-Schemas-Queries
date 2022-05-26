const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
	console.log("Connection achieved");
}).catch((err) => {
	console.log("ERRROR: " + err);
})

const personSchema = new mongoose.Schema({
	first: String,
	last: String
})

personSchema.virtual("fullName").get(function() {
	return `${this.first} ${this.last}` 
})

personSchema.pre("save", async function(){
	this.first = "Yo";
	this.last = "Mama"
	console.log("About to save");
})

personSchema.post("save", async function(){
	console.log("JUST SAVED");
})

const Person = mongoose.model("Person", personSchema);
