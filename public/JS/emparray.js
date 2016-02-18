var fbData = new Firebase('https://crackling-inferno-7438.firebaseio.com/');

var employeeData = [];
$(function(){

function applyTemplate(){
	$.get('Templates/editEmployeeTemplate.html', function(data){

		$('.addEmployeeAnchor').empty();
    eraseSpace();
		for (i = 1; i < employeeData.length; i ++){
	 	   var compTemp = Handlebars.compile(data);
       var handPush = compTemp(employeeData[i]);
       $('.addEmployeeAnchor').append(handPush);
    }

		$('.finishEdit').on('click', function(){
			var newName = $(this).parent().siblings('.editName').val();
			var newNum = $(this).parent().siblings('.newEmployeeNumber').val();
      var newAccess = $(this).parent().siblings('.newManagerAccess').val();
      employeeData.forEach(function(employee){
      	if (employee.employeeName == newName){
      		employee.employeeNumber = newNum;
      		employee.employeeName = newName;
          employee.managerAccess = newAccess;
      		console.log(employee);
      	} else if (employee.employeeNumber == newNum){
      		employee.employeeNumber = newNum;
      		employee.employeeName = newName;
          employee.managerAccess = newAccess;
      		console.log(employee);
      	}
      });
        fbData.child('Employees').set(employeeData);
	   });

     $('.finishDelete').on('click', function(e) {
        e.preventDefault();
        var editNum = $(this).parent().siblings('.newEmployeeNumber').val();
        for (i = 0; i < employeeData.length; i ++){
            if (employeeData[i].employeeNumber == editNum){
            var searchTerm = editNum;
            var index = -1;
            for(a = 0; a < employeeData.length; a ++){
              if (employeeData[a].employeeNumber == searchTerm){
                index = i;
                employeeData.splice(index, 1);
                break;
              }
            }
            console.log('index: ', index);
            console.log(employeeData);
            fbData.child('Employees').set(employeeData);
          }
        }
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

   function eraseSpace() {
    employeeData.forEach(function(employee){
     var tempName = employee.employeeName;
     var newStr = tempName.replace(/\s+/g, '_');
     employee.employeeName = newStr;
    });
   }

});



