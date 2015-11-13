var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema ({
	task: String,
	description: String
});
   //taco
var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;//taco