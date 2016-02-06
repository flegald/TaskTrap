

var taskController = {};



  taskController.completeArray = [];
  taskController.incompleteArray = [];
  taskController.newToDoArray = [];






taskController.setListeners = function() {

//=================TO DO LIST ITEM SEND TO COMPLETED ITEM==============


  $('.dutyList').on('click', '.dutyItem', function() {
    dutyShrink($('.selectionTodo'));
    $('.selectionTodo').addClass('dutyItem').removeClass('selectionTodo');
    $(this).addClass('selectionTodo').removeClass('dutyItem');
    dutyGrow($(this));
  });

  $('.dutyList').on('click', '.selectionTodo', function() {
    dutyShrink($(this));
    $(this).removeClass('selectionTodo').addClass('dutyItem');
  });


  $('.dutyList').on('swiperight', '.selectionTodo', function() {
    $(this).velocity({
      "left": "+=1200px",
      'height': 'toggle'
    },
      {duration: 400,
      complete: function() {
        $(this).remove();
      }
    });
    var newCompleteItem = $(this).children().text();
    console.log(newCompleteItem + ' sent to COMPLETED list');
    taskController.completeArray.push(newCompleteItem);
    $('.completeList').append("<div class='completeItem'><p>" + newCompleteItem + '</p></div>');

  });

  //==  COMPLETE ITEM BACK TO TODO  ==================

  $('.completeList').on('click', '.completeItem', function() {
    // console.log('tapped unselected');
    dutyShrink($('.selectionComplete'));
    $('.selectionComplete').addClass('completeItem').removeClass('selectionComplete');
    $(this).addClass('selectionComplete').removeClass('completeItem');
    dutyGrow($(this));
  });

  $('.completeList').on('click', '.selectionComplete', function() {
    // console.log('tapped selected');
    dutyShrink($(this));
    $(this).removeClass('selectionComplete').addClass('completeItem');
  });


  $('.completeList').on('swipeleft', '.selectionComplete', function() {

    $(this).velocity({
      "left": "-=1200px",
      'height': 'toggle'
    },
      {duration: 400,
      complete: function() {
        $(this).remove();
      }
    });

    var newToDoItem = $(this).children().text();
    console.log(newToDoItem + ' sent back to TODO list');

    taskController.newToDoArray.push(newToDoItem);

    $('.dutyList').append("<div class='dutyItem'><p>" + newToDoItem + '</p></div>');

  });

//==========================================================  FUNCTIONS  =============================

  function dutyGrow(that) {
    that.velocity({

      'left': '-10%',
      'width': '110%'
    }, 100);
  }

  function dutyShrink(that) {
    that.velocity({

      'left': '0',
      'width': '100%'
    }, 100);
  }
};

  taskController.reviewList_pop = function(){
    $('.reviewListIncomplete').find('ul').empty();
    $('.reviewListComplete').find('ul').empty();
    taskController.completeArray.forEach(function(item) {
      $('.reviewListComplete').find('ul').append('<li>' + item + '</li>');
    });
    taskController.incompleteArray.forEach(function(item) {
      $('.reviewListIncomplete').find('ul').append('<li>' + item + '</li>');
    });
  };

//===========================================  REVIEW PAGE: ON PRINT  ==================

  taskController.Backlog = function(date, time, employeeName, employeeNumber, incompleteArray, completeArray, comment){
    this.backlogDate = date;
    this.backlogTime = time;
    this.backlogName = employeeName;
    this.backlogNumber = employeeNumber;
    this.incompleteArray = incompleteArray;
    this.completeArray = completeArray;
    this.comment = comment;
  };

  taskController.reviewPrint = function(){
    var currentBacklog = new taskController.Backlog(
      getBacklogDate(),
      getBacklogTime(),
      localStorage.getItem('login'),
      localStorage.getItem('number'),
      taskController.incompleteArray,
      taskController.completeArray,
      $('#commentInput').val()
    );
    return currentBacklog;
  };

  taskController.getIncompleteArray = function(){
    taskController.incompleteArray = [];
    $('.dutyList').children().each(function() {
      taskController.incompleteArray.push($(this).text());
    });
  };

  taskController.getCompleteArray = function(){
    taskController.completeArray = [];
    $('.completeList').children().each(function() {
      taskController.completeArray.push($(this).text());
    });
  };

  function getBacklogDate(){
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth()+1;
    var year = today.getFullYear();
    return(month+'-'+day+'-'+year);

  }

  function getBacklogTime(){
    var today = new Date();
    var hour = today.getHours();
    var minutes = today.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return(hour + ':' + minutes);
  }
