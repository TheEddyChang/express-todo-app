var express = require('express');
var bodyParser = require('body-parser');


var app = express();


//configuring for bodyparser
app.use(bodyParser.urlencoded({ extended: true }));



//seed data for Todo
var toDoList = [
{   _id: 1,
	task: "laundry",
    time: "5:00 pm"
},
{   _id: 2,
    task : "grocieries",
    time : "6:00 pm"
},
{   _id: 3,
    task : "make dinner",
    time : "7:00 pm"
}];



//setting up route
app.get('/api', function(req, res) {
	res.json({ test : "Doh!"});
});

//get all Todo list
app.get('/api/todo', function(req, res) {
	res.json(toDoList);
});

//get a single todo
app.get('/api/todo/:id', function(req, res){
	//get todo id from URL params
	var todoID = parseInt (req.params._id);
	//find todo by ID
    var findToDo = toDoList.filter(function(todo){
    	return todo._id == todoID;
        });
        res.json(findToDo);
    });


//setting POST route to post a new todo
app.post('/api/todo', function(req, res){
	
    //creating new todo with form data
	var newToDo = req.body;
	//setting sequential id
	if(toDoList.length > 0) {
		newToDo._id = toDoList[toDoList.length - 1]._id + 1;
	} else {
		newToDo._id = 1;
	}
	//add new todo to 'toDoList' array
	toDoList.push(newToDo);
	//send newToDo as JSON
	res.json(newToDo);

});












var server = app.listen(process.env.PORT || 4000, function() {
	console.log("WASABIIIIIIIII");
});






