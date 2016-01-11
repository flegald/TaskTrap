var fbData = new Firebase('https://crackling-inferno-7438.firebaseio.com/');

var employeeData = [];
$(function(){

function applyTemplate(){
	$.get('Templates/editEmployeeTemplate.html', function(data){

		$('.addEmployeeAnchor').empty();
		for (i = 0; i < employeeData.length; i ++){
	 	   var compTemp = Handlebars.compile(data);
       var handPush = compTemp(employeeData[i]);
       $('.addEmployeeAnchor').append(handPush);
    }

		$('.finishEdit').on('click', function(){
			var newName = $(this).siblings('.editName').val();
			var newNum = $(this).siblings('.newEmployeeNumber').val();
      employeeData.forEach(function(employee){
      	if (employee.employeeName == newName){
      		employee.employeeNumber = newNum;
      		employee.employeeName = newName;
      		console.log(employee);
      	} else if (employee.employeeNumber == newNum){
      		employee.employeeNumber = newNum;
      		employee.employeeName = newName;
      		console.log(employee);
      	}
      });
        fbData.child('Employees').set(employeeData);
	   });

     $('.finishDelete').on('click', function(e) {
        e.preventDefault();
        var editName = $(this).siblings('.editName').val();
        employeeData.forEach(function(employee){
          if (employee.employeeName == editName){
            var searchTerm = editName;
            var index = -1;
            for(i = 0; i < employeeData.length; i ++){
              if (employeeData[i].employeeName == searchTerm){
                index = i;
                break;
              }
            }
            console.log('index: ', index);
            employeeData.splice(index, 1);
            console.log(employeeData);
            fbData.child('Employees').set(employeeData);
          }
        });
      });
  });
}


   fbData.child('Employees').on('value', function(snapshot){
   	employeeData = [];
			$.each(snapshot.val(), function(index, value){
			employeeData.push(value);
			});
			applyTemplate();

    });

	});








