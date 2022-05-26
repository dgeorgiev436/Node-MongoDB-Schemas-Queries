const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/moviesApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
	console.log("Connection achieved");
}).catch((err) => {
	console.log("ERRROR: " + err);
})
// DEFINING A SCHEMA
const movieSchema = new mongoose.Schema({
	title: String,
	year: Number,
	score: Number,
	rating: String
})
// DEFINING A MODEL
const Movie = mongoose.model("Movie", movieSchema)


Movie.insertMany([
	{title: "300", year: 2014, score: 9.1, rating: "R"},
	{title: "Troy", year: 2002, score: 8.4, rating: "T"},
	{title: "American Pie", year: 2018, score: 6.4 , rating: "C"},
	{title: "The mask", year: 1997, score: 7.3, rating: "B"},
	{title: "Meet John", year: 2015, score: 6.6, rating: "R"},
]).then((res) => {
	console.log("SUCCESS!!!!!")
	console.log(res)
}).catch((err) => {
	console.log("OH NO!!! ERROR: " + err)
})

