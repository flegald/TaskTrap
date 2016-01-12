$(function(){

	$('#showManageEmployees').on('click', function(){
		$('#manEmpPage').show();
		$('#manDutiesContainer').hide();
		$('#backLogPage').hide();
	});

	$('#showManageTasks').on('click', function(){
		// console.log('task click');
		// console.log(allTaskArray);
		// console.log($('#manDutiesPage').text())
		$('#manDutiesPage').show();
		$('#manDutiesContainer').show();
		$('#manEmpPage').hide();
		$('#backLogPage').hide();
	});

	$('#showBacklog').on('click', function(){
		$('#manDutiesContainer').hide();
		$('#manEmpPage').hide();
		$('#backLogPage').show();
	})

	$('#exitManager').on('click', function(){
		$('#manEmpPage').hide();
		$('#manDutiesContainer').hide();
		$('#backLogPage').hide();
	})
});