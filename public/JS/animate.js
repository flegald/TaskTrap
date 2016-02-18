$(function() {


  function init() {

    setTimeout(function(){
      $('img.animate').animate({
        'top':'200px'
      }, {
        duration: 400,
        complete: function() {
          $('h1.animate').animate({
            'top': '-500px'
          }, 1100);
          $('img.animate').animate({
            'top':'570px',
            'left':'55%'
          }, {
            duration: 900,
            complete: function() {
              moveUptoTitle();
            }
          });
        }
      });
    }, 400);

  }

  function moveUptoTitle() {
    $('img.animate').animate({
      'top' : '200px',
      'left' : '53%'
    }, {
      duration: 1000,
      complete: function() {
        titleAnimate();
      }
    });
  }

  function titleAnimate() {
    $('img.animate').animate({
      'width':'70px'
    }, 200);
    $('.animate-thisOne').addClass('selectAnimate').animate({
      'width':'140%',
      'left':'-20%'
    }, 500);
    $('h1.animate').animate({
      'font-size': '2em',
      // 'left':'220px',
      'top':'-=10px'
    }, {
      duration: 200,
      complete: wait_Swipe()
    });
  }

  function wait_Swipe() {

    setTimeout(function() {
      $('img.animate').animate({
        'left': '-=70px'
      }, {
        duration: 700,
        complete: function(){
          $('img.animate').animate({
            'left': '+=120px',
          }, {
            duration: 250
          });
          $('.animate-thisOne').animate({
            'left':'+=1300px'
          }, 500);
          $('h1.animate').animate({
            'left':'+=1000px'
          });
          fadeOut();
        }
      });
    }, 900);
  }

  function fadeOut() {
    $('#animationPage').animate({
      'opacity':'0'
    }, {
      duration: 1000,
      complete: function() {
        $('#animationPage').hide();
      }
    });
  }

  init();


});
