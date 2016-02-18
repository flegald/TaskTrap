

$(function(){

	$('#bossPage').hide();
	$('#taskList').hide();
	$('#printHead').hide();
	$('#a-1_taskPage').hide();
	$('#a-2_taskPage').hide();
	$('#b-1_taskPage').hide();
	$('#b-2_taskPage').hide();
	$('#manEmpPage').hide();
	$('#manDutiesContainer').hide();
	$('#backLogPage').hide();
	$('#todoPage').hide();
	$('#completePage').hide();
	$('#reviewPage').hide();


});


// SIGN IN FUNCTIONALITY*******************

	$('#signInButton').click(function(){
			var formLook = $('#empForm').val();
			var check = 0;
			localStorage.clear();

		if(formLook === ""){
			$('#signInAlert').show();
		}

		for (i = 0; i < employeeData.length; i ++) {
			if (formLook == employeeData[i].employeeNumber) {

				if (employeeData[i].managerAccess === "yes") {
					localStorage.setItem("login", employeeData[i].employeeName);
					localStorage.setItem('number', employeeData[i].employeeNumber);
					$('#signIn').toggle();
					$('#bossPage').toggle();
					$('#signInAlert').hide();

				} else {
					localStorage.setItem("login", employeeData[i].employeeName);
					localStorage.setItem('number', employeeData[i].employeeNumber);
					$('#signIn').toggle();
					$('#taskList').toggle();
					$('#signInAlert').hide();

				}
				check += 1;
			} else if ( i + 1 === employeeData.length && check == 0) {
				$('#signInAlert').show();
			} else {
				console.log('no');
			}
			$('.loggedIn').text(localStorage.getItem('login'));
		}
	});

	$('#byPassButton').on('click', function() {
			$('#signIn').toggle();
			$('#taskList').toggle();
	});
	$('#byPassManagerButton').on('click', function() {
		$('#signIn').toggle();
		$('#bossPage').toggle();
	});


// TASK CHOICE PAGE*****************************

	$('#taskChoiceButton').click(function(e){
		e.preventDefault();

		for (i = 0; i < allTaskArray.length; i ++){

			console.log(checkId());
			if (document.getElementById(checkId())){
				if (document.getElementById(checkId()).checked) {
					console.log('something is checked');
					getList().forEach(function(item){
						$('.dutyList').append("<div class='dutyItem'><p>" + item + '</p></div>');
					});
				} else {
					console.log('nothing is checked');
				}
			} else {
			console.log('nothing');
		}
	$('#taskList').hide();
	$('#todoPage').show();
	}
});

function checkId() {
	return allTaskArray[i].group;
}
function getList(){
	return allTaskArray[i].groupArray;
}

