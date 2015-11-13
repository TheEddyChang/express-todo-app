$(document).ready(function() {
	//compile handlebars template


	var baseUrl = '/api/todos';
	var $todolist = $('#todos-template'); //name of the div outside


	var source = $('#todos-list').html(); //name of the script id
	var template = Handlebars.compile(source);
  

  // helper function to render all books to view
  // note: we empty and re-render the collection each time our book data changes
  



	//get all todos
	$.get(baseUrl, function(data) {
		console.log(data);
		//set allTodos to todo data from API
		allTodos = data.todos;
		//render all todos to view
		var taskHtml = template({
			todos: allTodos//matches variable on line 17
		});

		$todolist.append(taskHtml);//matches var on 6//task html matches line 19
     });




$('.todo-form').on('submit', function(event){
	event.preventDefault();
	//serialize form data
	var newTodo = $(this).serialize();
	//POST request to create new book
	$.post(baseUrl, newTodo, function(data){
		console.log(data);
        allTodos.push(data);
    });
        $todosList.append(template({
        	todos: allTodos}));

    });

});
        

   

    
       




  		

















