var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var hbs = require('hbs');
var mongoose = require('mongoose');
//connect to mongodb
mongoose.connect('mongodb://localhost/expresstodo'); //connection string


//require Todo model
var Todo = require('./models/todo');






// app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));
app.set('view engine', 'hbs');

//configuring for bodyparser
app.use(bodyParser.urlencoded({
	extended: true
}));


//STATIC ROUTE
app.get('/', function(req, res) {
	res.render('index');
});

//GET ALL TODOS
  app.get('/api/todos', function (req, res) {

    // find all todos in db
    Todo.find(function (err, allTodos) {
      res.json({ todos: allTodos });
    });
  });



// get one todo
  app.get('/api/todos/:id', function (req, res) {
    // get todo id from url params (`req.params`)
    var todoId = req.params.id;

    // find todo in db by id
    Todo.findOne({ _id: todoId }, function (err, foundTodo) {
      res.json(foundTodo);
    });
  });

    // create new todo
  app.post('/api/todos', function (req, res) {
    // create new todo with form data (`req.body`)
    var newTodo = new Todo(req.body);

    // save new todo in db
    newTodo.save(function (err, savedTodo) {
      res.json(savedTodo);
    });
  });
	

//update todo
  app.put('/api/todos/:id', function (req, res) {
    // get todo id from url params (`req.params`)
    var todoId = req.params.id;

    // find todo in db by id
    Todo.findOne({ _id: todoId }, function (err, foundTodo) {
      // update the todos's attributes
      foundTodo.task = req.body.task;
      foundTodo.description = req.body.description;

      // save updated todo in db
      foundTodo.save(function (err, savedTodo) {
        res.json(savedTodo);
      });
    });
  });

  //delete todo
    // delete todo
  app.delete('/api/todos/:id', function (req, res) {
    // get todo id from url params (`req.params`)
    var todoId = req.params.id;

    // find todo in db by id and remove
    Todo.findOneAndRemove({ _id: todoId }, function (err, deletedTodo) {
      res.json(deletedTodo);
    });
  });



var server = app.listen(process.env.PORT || 3000, function() {
	console.log("WASABIIIIIIIII");
});