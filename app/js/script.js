// $('a.photoarchive').click(function() {
// 	alert('Кнопка Фотоархив2018 - работает!');
// });
// $('a.pre-order').click(function() {
// 	alert('Кнопка Предзаказ билетов - работает!');
// });

$(function() {
  if (location.hash == '#gallery')
    $(".overlay, .gallery").fadeIn();


$.ajax({
    url: '/LoaderSlider.php',
    type: 'POST',
    data: 'path='+2018,
    success: function(responce){
      $(".images").remove();
      $(".gall").append(responce);
      $('.images li').eq(0).addClass('active');
	  $('.images li').eq(1).addClass('next');
    }
});

	$("[data-openscheme]").click(function(e) {
	  e.preventDefault();
		$(".overlay, .shema").fadeIn();
	});
	$("[data-openphoto]").click(function(e) {
    e.preventDefault();
		$(".overlay, .gallery").fadeIn();
	});
	$('[data-buytickets]').click(function(e) {
	  e.preventDefault();
	  closemodal();
	  Modal.open('tickets');
	})
	$('.close, .big-close').click(closemodal);

	$(window).keyup(function(ev) {
    if (ev.originalEvent.code == 'Escape')
    {
      closemodal();
      Modal.closeAll();
    }
	})

	$('.arrow-right').click(function(){
		var x = $('.next').index();
		if (x==-1){
			return false;
		}
		var ns = parseInt($('.next img').css('height'));
		var gw = parseInt($('.gall').css('width'));
		if (ns<200){
			ns = 100
		}
		if (ns>200){
			ns = 0
		}
		if (gw < 400){
			ns = 0
		}

		$('.next').animate({
			'margin-left':'210px',
			'margin-top': ns,
			'opacity': '1'
		}, 200);
		$('.next img').animate({
			'width':'400px'
		}, 200);
		$('.active').animate({
			'margin-left':'-45px',
			'margin-top': '100px',
			'opacity': '0.3'
		}, 200);
		$('.active img').animate({
			'width':'240px'
		}, 200);

		//console.log(x);
		$('.prev').removeClass('prev');
		$('.active').addClass('prev');
		$('.active').removeClass('active');
		$('.next').addClass('active');
		$('.next').removeClass('next');
		$('.images li').eq(x+1).addClass('next');
	});

	$('.arrow-left').click(function(){
		var x = $('.prev').index();
		if (x==-1){
			return false;
		}
		if (x==0){
			$('.prev').animate({
				'margin-left':'210px',
				'margin-top': '0',
				'opacity': '1'
			}, 200);
			$('.prev img').animate({
				'width':'400px'
			}, 200);
			$('.active').animate({
				'margin-left':'625px',
				'margin-top': '100px',
				'opacity': '0.3'
			}, 200);
			$('.active img').animate({
				'width':'240px'
			}, 200);
			$('.next').removeClass('next');
			$('.active').addClass('next');
			$('.active').removeClass('active');
			$('.prev').addClass('active');
			$('.prev').removeClass('prev');
			return false;
		}
		$('.prev').animate({
			'margin-left':'210px',
			'margin-top': '0',
			'opacity': '1'
		}, 200);
		$('.prev img').animate({
			'width':'400px'
		}, 200);
		$('.active').animate({
			'margin-left':'625px',
			'margin-top': '100px',
			'opacity': '0.3'
		}, 200);
		$('.active img').animate({
			'width':'240px'
		}, 200);

		$('.next').removeClass('next');
		$('.active').addClass('next');
		$('.active').removeClass('active');
		$('.prev').addClass('active');
		$('.prev').removeClass('prev');
		$('.images li').eq(x-1).addClass('prev');
	});

  $('.first a').click(function(){
		var xx = $(this).text();
		console.log(xx);
    $.ajax({
      url: '/LoaderSlider.php',
      type: 'POST',
      data: 'path='+xx,
      success: function(responce){
        $(".images").remove();
        $(".gall").append(responce);
        $('.images li').eq(0).addClass('active');
        $('.images li').eq(1).addClass('next');
        }
    });
    $('.acttt').removeClass('acttt');
    $(this).addClass('acttt');
  });




  Modal.init('tickets', '.ticketmodal');

  $('#tickets').on('click', 'td, td a', function() {
    $(window).scrollTop(0);
  });

  //Почему-то клик с первой таблицы не всплывает, поэтому вот так. Но всё равно после кнопки «Назад» не работает
  var ticketInt = setInterval(function() {
    if ($('#tickets table').length)
    {
      clearInterval(ticketInt);
      $('#tickets td a').click(function() { $(window).scrollTop(0) })
    }
  }, 250);
});

$(window).scroll(function(){
	var delay = 10;
	var st = $(window).scrollTop();
	$('.v-1').animate({
		'margin-top': -$(window).scrollTop()/2
	}, delay);
	$('.v-2').animate({
		'margin-top': -$(window).scrollTop()/3
	}, delay);
	$('.v-3').animate({
		'margin-top': -$(window).scrollTop()/4
	}, delay);
});

function closemodal() {
  $('.overlay, .form').fadeOut();
}

var Modal = {
  objects: {},
  closeButtonClass: '.close_button',
  overlayClass: '.modal_overlay',

  //Имя модалки и класс объекта, который нужно будет показывать
  init: function(name, classname) {
    var modal = this,
        object = $(classname);
    if (this.objects[name] == undefined)
    {
      this.objects[name] = object;
      $(this.closeButtonClass, object).click(function() { modal.close(name) });
    }
  },

  //Открытие окошка с небольшим костылём по созданию оверлея
  open: function(name) {
    var modal = this,
        overlay = $('<div class="' + this.overlayClass.replace(/^\./, '') + '"></div>').hide();
    $('body').append(overlay);
    overlay.add(this.objects[name]).fadeIn();
    overlay.click(function() { modal.closeAll() });

    //Это нужно, потому что у нас position: absolute
    $(window).scrollTop(0);
  },

  //Скрытие конкретного окошка и оверлея
  close: function(name) {
    var modal = this,
        overlay = $(this.overlayClass);
    this.objects[name].add(overlay).fadeOut(400, function() { overlay.remove() });
  },

  //Скрытие всех окошек и оверлея
  closeAll: function() {
    for (var object in this.objects)
      this.close(object);
  }
}


// Send form
function call() {
	var msg   = $('#form_submit').serialize();
	$.ajax({
		type: 'POST',
		url: '/ajax.php',
		data: msg,
		success: function(data) {
			if(data == 'email_sended') {
				$('#modal_form_one').css('display','none');
				$('.box_thx').css('display','block');
				$('body').click(function(){
					$('.box_thx').remove();
				});
			} else {
				alert('Произошла ошибка отправки формы');
			}
		},
		error:  function(xhr, str){
			console.log('Возникла ошибка: ' + xhr.responseCode);
		}
	});
}
