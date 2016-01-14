Employee = function(name, employeeNumber, managerAccess){
		this.employeeName = name;
		this.employeeNumber = employeeNumber;
		this.managerAccess = managerAccess;
	};

$(function(){


	$('#newEmpButt').click(function(){
		var nameGrab = $('#newName').val().toUpperCase();
		var numGrab = $('#newEmployeeNumber').val();
		var access = $('#managerAccess').val();
		console.log(nameGrab + numGrab);
		var empNums = [];
		var empNames = [];
		employeeData.forEach(function(employee) {
			empNums.push(employee.employeeNumber);
		});
		employeeData.forEach(function(employee) {
			empNames.push(employee.employeeName);
		});
		var checkName = $.inArray(nameGrab, empNames);
		var checkNum = $.inArray(numGrab, empNums);
			if (nameGrab == ""|| numGrab == ""){
      	// alert('Please fill out all fields');
				$('#fillAllFieldsAlert').show();
		} else if (checkNum == -1 && checkName == -1) {
			console.log('added to fb');
			tempEmployee = new Employee(nameGrab, numGrab, access);
			fbData.child('Employees').push(tempEmployee);
    } else {
			console.log('not added');
			// alert("name or number already in use");
			$('#alreadyInUseAlert').show();
		}
	});

	$("input[type=text]").on('focus',function(){
		$('#alreadyInUseAlert').hide();
		$('#fillAllFieldsAlert').hide();
	});

	$("input[type=number]").on('focus',function(){
		$('#alreadyInUseAlert').hide();
		$('#fillAllFieldsAlert').hide();
	});



});
