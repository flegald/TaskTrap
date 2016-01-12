var allTaskArray = [];

var TaskObject = function(location, task){
	this.group = location;
	this.groupArray = [task];
	};




fbData.child('Task').on('value', function(snapshot){
	allTaskArray = [];
	console.log('snapshot', snapshot.val());

	$.each(snapshot.val(), function(index, value){
			allTaskArray.push(value);
	});

	applyTaskTemplate();
	applyCheckboxTemplate();
});


	function applyTaskTemplate(){
		$.get('Templates/editTaskTemplate.html', function(data){
			$('.editTaskAnchor').empty();
			for (i = 0; i < allTaskArray.length; i ++){
		 	   var compTemp = Handlebars.compile(data);
	       var handPush = compTemp(allTaskArray[i]);
	       $('.editTaskAnchor').append(handPush);
	    }
		});
	}

	function applyCheckboxTemplate(){
		$.get('Templates/checkBoxTemplate.html', function(data){
			$('.taskChoice').empty();

			allTaskArray.forEach(function(task) {
				var compTemp = Handlebars.compile(data);
				var handPush = compTemp(task);
				$('.taskChoice').append(handPush);
			});
		});
	}

	$("#taskItem").keyup(function(event){
    if(event.keyCode == 13){
        $("#addNewTask").click();
    }
	});

	
	

	$('#addNewTask').on('click', function(){
		var newGroup = $('#location').val();
		var newTask = $('#taskItem').val();
		var counter = 0;
		$('#taskItem').val('');
		for (i = 0; i < allTaskArray.length + 1; i ++){
			counter += 1;
			console.log(counter);
			if (counter === allTaskArray.length + 1){
				var tempTask = new TaskObject(newGroup, newTask);
				fbData.child("Task").push(tempTask);
				console.log('not found');
				return;
			} else if (newGroup == allTaskArray[i].group) {
					allTaskArray[i].groupArray.push(newTask);
					fbData.child("Task").set(allTaskArray);
					console.log('found');
					return;
			}
		}

	});

	$('.editTaskAnchor').on('click', '.deleteThisTaskButton', function() {
		var thisGroup = $(this).parent().parent().siblings('h2').text();
		var thisLi = $(this).parent().text();

		allTaskArray.forEach(function(task) {
			if (task.group == thisGroup) {
				var index = -1;
				console.log('task.groupArray: ', task.groupArray);
				for (i = 0; i < task.groupArray.length; i++) {
						console.log('task.groupArray[i]:', task.groupArray[i]);
						console.log('thisLi: ' , thisLi);
					if (task.groupArray[i] == thisLi) {
						index = i;
						task.groupArray.splice(index, 1);
						break;
					}
				}
				console.log('index', index);
				// allTaskArray.splice(index, 1);
				fbData.child('Task').set(allTaskArray);
			}
		});

	});
