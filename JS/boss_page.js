$(function(){

	$('#showManageEmployees').on('click', function(){
		$('#manEmpPage').show();
		$('#manDutiesContainer').hide();
		$('#backLogPage').hide();
	});

	$('#showManageTasks').on('click', function(){
		$('#manDutiesContainer').show();
		$('#hiddenGroup').hide();
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