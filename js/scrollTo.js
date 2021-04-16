;(function() {
   // функция плавного скролла на js с поддержкой IE 11
    var linear = function(t, b, c, d) {
    return c * t / d + b;
  };

  var isAnimatedScroll = false;

  var smoothScroll = function(target, duration) {
    isAnimatedScroll = true;

    var startPosition = window.pageYOffset;
    var targetPosition = startPosition + target.getBoundingClientRect().top;
    var distance = targetPosition - startPosition;
    var startTime = null;

    var animation = function(currentTime) {
      if (startTime === null) {
        startTime = currentTime;
      }

      var timeElapsed = currentTime - startTime;
      var scrollY = distance * (timeElapsed / duration) + startPosition; // linear

      window.scrollTo(0, scrollY);

      console.log('Distance: ' + distance + '. TimeElapsed: ' + timeElapsed + '. duration: ' + duration + '. StartPosition: ' + startPosition + '. ScrollY: ' + scrollY);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        isAnimatedScroll = false;
      }

    };

    requestAnimationFrame(animation);
  };


    // функция SCROLL К элементам
	var scroll = function (target) {
		var targetTop = target.getBoundingClientRect().top;
		var scrollTop = window.pageYOffset;
		var targetOffsetTop = targetTop + scrollTop;
		// переменная для более точного скролла к отмеченному элементу
		var headerOffSet = document.querySelector('.header-page').clientHeight;
		
		window.scrollTo(0, targetOffsetTop - headerOffSet + 20);
	}

	myLib.body.addEventListener('click', function (e) {
		var target = e.target;
		// создаем переменную scrollToItemClass
		var scrollToItemClass = myLib.closestAttr(target, 'data-scroll-to');
      
		if (scrollToItemClass === null) {
			return;
		}

		e.preventDefault();
		var scrollToItem = document.querySelector('.' + scrollToItemClass);

		if (scrollToItem) {
			smoothScroll(scrollToItem, 1000);
		}
	});
})();