$(document).ready(function() {
	//compile handlebars template


	var baseUrl = '/api/todos';
	var $todolist = $('#todos-template'); //name of the div outside


	var source = $('#todos-list').html(); //name of the script id
	var template = Handlebars.compile(source);


	//get all todos
	$.get(baseUrl, function(data) {
		console.log(data);
		//set allTodos to todo data from API
		allTodos = data.todos;
		//render all todos to view
		var taskHtml = template({
			todos: allTodos
		});

		$todolist.append(taskHtml);
     });
});

 //post todo

 $.post(baseUrl, function(data) {
   
 });