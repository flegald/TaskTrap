backlogArray = [];




function applyBacklogTemplate(){

	$.get('Templates/backlogtemplate.html', function(data){
		$('.backlogAnchor').empty();
		for (i = 0; i < backlogArray.length; i ++){
	 		var compTemp = Handlebars.compile(data);
      var handPush = compTemp(backlogArray[i]);
      $('.backlogAnchor').prepend(handPush);
    }
    $('.backlogTemplate').find('p').hide();
    fbData.child('Backlog').set(backlogArray);
   });
}

fbData.child('Backlog').on('value', function(snapshot){
	backlogArray = [];
	$.each(snapshot.val(), function(index, value){
		backlogArray.push(value);
	});
	applyBacklogTemplate();

});

$('.backlogAnchor').on('click', '.backlogTemplate', function() {
  $(this).find('p').slideToggle();
});
