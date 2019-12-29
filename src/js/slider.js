$(document).ready(function(){
	function sizeSlides(){
		$('.slide').each(function(){
			$(this).width($(window).outerWidth());
		});
	}
	function sizeSlideTrack(){
		var slideSumWidth = 0;
		$('.slide').each(function(){
			slideSumWidth = slideSumWidth + $(this).outerWidth();
		});
		$('.slide_track').width(slideSumWidth)
	}
	var slidePos;
	var currentSlide = 1;
	var totalSlides = $('.slide').not('.slide_clone').length;
	$('.slide_track').css('transform', 'translate3d(0px, 0px, 0px)' );

	$('.slide').not('.slide_clone').each(function(){
		$(this).closest('.slider').find('.slide_dots').append('<div class="dot" data-slide-tar="' + $(this).attr('data-slide') + '"></div>')
	});
	function activeDot(currentSlide){
		$('.dot').removeClass('active_dot');
		$('.dot[data-slide-tar="' + currentSlide + '"]').addClass('active_dot'); 
	}
	function warp(slidePos){
		$('.slide_track').css('transform', 'translate3d(' + slidePos + 'px, 0px, 0px)' );
	}
	function slide(slidePos){
		$('.slide_track').css('transition', 'transform 500ms cubic-bezier(1,0,0,1)');
		warp(slidePos);
		$('.slide_track').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$(this).css('transition', '');
		});
	}
	function createSlideClones(){
		var firstSlide = $('.slide').first();
		var lastSlide = $('.slide').last();
		firstSlide.parent().append(firstSlide.clone().addClass('slide_clone'));
		lastSlide.parent().prepend(lastSlide.clone().addClass('slide_clone'));
	}
	createSlideClones();
	function setSlidePos(){
		slidePos = parseInt($('.slide_track').css('transform').split(',')[4]);
		slidePos = slidePos - $(window).outerWidth();
		$('.slide_track').css('transform', 'translate3d(' + slidePos + 'px, 0px, 0px)' );
		console.log('slidePos = ' + slidePos);
		console.log('current slide = ' + currentSlide);
		activeDot(currentSlide);
	}
	setSlidePos();
	function nextSlide(){
		if(currentSlide < totalSlides){
			currentSlide ++;
			slidePos = slidePos - $(window).outerWidth();
			slide(slidePos);
		}else{//we've reached the end of the carousel
			currentSlide = 1;
			//Slide to right and then warp to left after transition ends
			slidePos = slidePos - $(window).outerWidth();
			slide(slidePos);
			//Reset SlidePos to slide 1 Position after transition Ends
			slidePos = $(window).outerWidth() * -(currentSlide);
			$('.slide_track').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('.slide_track').css('transform', 'translate3d(' + slidePos + 'px, 0px, 0px)');
			});
		}
		console.log('current slide = ' + currentSlide);

		activeDot(currentSlide);
	}
	function prevSlide(){
		if(currentSlide > 1){
			currentSlide --;
			slidePos = slidePos + $(window).outerWidth();
			slide(slidePos);
		}else{//we've reached the beginning of the carousel and need to set the the current slide to the last slide
			currentSlide = $('.slide').not('.slide_clone').length;
			//Slide to left and then warp to right after transition ends
			slidePos = slidePos + $(window).outerWidth();
			slide(slidePos);
			//Reset SlidePos to last slide's Position after transition Ends
			slidePos = $(window).outerWidth() * -(currentSlide);
			$('.slide_track').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('.slide_track').css('transform', 'translate3d(' + slidePos + 'px, 0px, 0px)');
			});
		}
		console.log('current slide = ' + currentSlide);

		activeDot(currentSlide);
	}
	function slideTo(tar){
		currentSlide = tar;
		slidePos = $(window).outerWidth() * -(currentSlide /*-1*/);
		slide(slidePos);

		console.log('current slide = ' + currentSlide);

		activeDot(currentSlide);
	}

	function warpTo(tar){
		currentSlide = tar;
		slidePos = $(window).outerWidth() * -(currentSlide /*-1*/);
		warp(slidePos);

		console.log('current slide = ' + currentSlide);

		activeDot(currentSlide);
	}

	$('.dot').on('click', function(){
		slideTo($(this).attr('data-slide-tar'));
	});

	function slideEssentials(){
		sizeSlides();
		sizeSlideTrack();
		warpTo(currentSlide);
		// slideTo(currentSlide);
	}
	slideEssentials();
	$(window).resize(function(){
		slideEssentials();
	});
	$('.slider_arrow.arrow_next').on('click', function(){
		nextSlide();
	});
	$('.slider_arrow.arrow_prev').on('click', function(){
		prevSlide();
	});
	function autoCycle(){
		setInterval(function(){
			nextSlide();
		}, 5000)
	}
	// autoCycle();
	// var startCycle = autoCycle();
	// function pauseCycle(){
	// 	clearInterval(startCycle);
	// }

	var startTimer = function(){
		console.log('start');
		begin = setInterval(nextSlide, 5000);
	}
	var stopTimer = function(){
		console.log('stop');
		window.clearInterval(begin);
	}
	var resetTimer = function(){
		console.log('reset');
		window.clearInterval(begin);
	}
	
	startTimer();
	$('.slider_arrow, .dot').on('mouseenter', function(){
		stopTimer();
	}).on('mouseleave', function(){
		startTimer();
	});



});