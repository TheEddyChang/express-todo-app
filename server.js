var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var hbs = require('hbs');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

//configuring for bodyparser
app.use(bodyParser.urlencoded({
	extended: true
}));




//seed data for Todo
var toDoList = [{
	_id: 1,
	task: "laundry",
	description: "1:30 pm"
}, {
	_id: 2,
	task: "grocieries",
	description: "6:00 pm"
}, {
	_id: 3,
	task: "make dinner",
	description: "7:00 pm"
}];



app.get('/', function(req,res){
	res.render('index');
});




//setting up route


app.get('/api', function(req, res) {
	res.json({
		test: "Doh!"
	});
});

//get all Todo list
app.get('/api/todo', function(req, res) {
	res.json(toDoList);
});

//get a single todo
app.get('/api/todo/:id', function(req, res) {
	//get todo id from URL params
	var todoID = parseInt(req.params.id);
	//find todo by ID
	var findToDo = toDoList.filter(function(todo) {
		return todo._id == todoID;
	});
	res.json(findToDo);
});


//setting POST route to post a new todo
app.post('/api/todo', function(req, res) {

	//creating new todo with form data
	var newToDo = req.body;
	//setting sequential id
	if (toDoList.length > 0) {
		newToDo._id = toDoList[toDoList.length - 1]._id + 1;
	} else {
		newToDo._id = 1;
	}
	//add new todo to 'toDoList' array
	toDoList.push(newToDo);
	//send newToDo as JSON
	res.json(newToDo);

});

//setting up PUT route to update
app.put('/api/todo/:id', function(req, res) {
	//get todo id from URL params
	var toDoID = parseInt(req.params.id);

	var toDoUpdate = toDoList.filter(function(todo) {
		return todo._id == toDoID;
	})[0];

	toDoUpdate.task = req.body.task;
	toDoUpdate.description = req.body.description;

	res.json(toDoUpdate);

});


//setting up Delete route to update
app.delete('/api/todo/:id', function(req, res) {
	//get todo id from URL params
	var toDoID = parseInt(req.params.id);
	var toDoDelete = toDoList.filter(function(todo) {
		return todo._id == toDoID;
	})[0];

	toDoList.splice(toDoList.indexOf(toDoDelete), 1);
	res.json(toDoDelete);
});



var server = app.listen(process.env.PORT || 3000, function() {
	console.log("WASABIIIIIIIII");
});



























