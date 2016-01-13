
var main = {};

main.setNavListeners = function() {

  $('.navToSignIn').on('click', function() {
    $(this).parent().parent().hide();
    $('#manEmpPage').hide();
    $('#manDutiesContainer').hide();
    $('#backLogPage').hide();
    $('#signIn').toggle();
    main.signOut();

  });

  $('.navToComplete').on('click', function() {
    $(this).parent().parent().hide();
    $('#completePage').toggle();
    $('#noCompleteItemsAlert').hide();
  });

  $('#navToTodo').on('click', function() {
    $('#completePage').toggle();
    $('#todoPage').toggle();
  });

  $('.navToTaskLists').on('click', function() {
      $(this).parent().parent().hide();
      $('#manEmpPage').hide();
      $('#manDutiesPage').hide();
      $('#backLogPage').hide();
      $('#taskList').toggle();
  });

  $('#navToReview').on('click', function() {
    $('#reviewPage').toggle();
    $('#completePage').toggle();
    taskController.getIncompleteArray();
    taskController.getCompleteArray();
    taskController.reviewList_pop();
  });


};


main.savePrintListeners = function() {
  $('#printButton').on('click', function() {
    if($('.completeList').children().length > 0){
      window.print();
    } else {
      $('#noCompleteItemsAlert').show();
    }
  });

  $('#saveButton').on('click', function() {

  if($('.completeList').children().length > 0){
    fbData.child('Backlog').push(taskController.reviewPrint());
    $('#commentInput').val('');
    $('.dutyList').empty();
    $('.completeList').empty();
    taskController.completeArray = [];
    $('#reviewPage').toggle();
    $('#taskList').toggle();
  } else {
   $('#noCompleteItemsAlert').show();
 }

  });
};

main.signOut = function() {
  localStorage.clear();
  $('#empForm').val('');
  $('.dutyList').empty();
  $('.completeList').empty();
  taskController.completeArray = [];
};

//=========================================================  EXECUTIVES  ===============================================

$(function() {
  main.setNavListeners();
  taskController.setListeners();
  main.savePrintListeners();


});
