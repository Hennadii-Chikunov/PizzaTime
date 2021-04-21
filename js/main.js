/* libs */
;(function () {
	// данный скрипт выполняет задачу lazy load BG изображения в формате webP
	// такой функции нет в библиотеке, поэтому был написан этот скрипт
	var canUseWebP = function () {
		var elem = document.createElement('canvas');

		if (!!(elem.getContext && elem.getContext('2d'))) {
			// was able or not to get WebP representation
			return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
		}
		// very old browser like IE 8, canvas not supported
		return false;
	};
	var isWebpSupported = canUseWebP();
	// если браузер не поддерживает webp 
	if (isWebpSupported === false) {
		// здесь у нас такая проверка, что...
		// если браузер не поддерживает webp 
		// тогда мы находим все элементы с атрибутом data-src-replace-webp
		var lazyItems = document.querySelectorAll('[data-src-replace-webp]');
		// запускаем цикл
		for (var i = 0; i < lazyitems.length; i += 1) {
			// и для каждого элемента проверяем,если у него есть
			var item = lazyItems[i];
		}// этот data-bg-replace-webp атрибут
		var dataSrcReplaceWebp = item.getAttribute('data-bg-replace-webp');
		// и он не равен null 
		if (dataSrcReplaceWebp !== null) {
			// тогда мы вставляем data-src новое значение
			item.setAttribute('data-src', dataSrcReplaceWebp);
		}
	}
	var lazyLoadInstance = new LazyLoad({
		elements_selector: ".lazy"	
});
})();
/* libs finish*/

/* myLib start */
// пишем самовызывающую функцию 
;(function () {
	window.myLib = {};

	window.myLib.body = document.querySelector('body');
// функция проверки отрабатывания по клику именно на кнопку бургера, а не по спану или другому элементу
	                             // элемент текущий item и атрибут attr
	window.myLib.closestAttr = function (item, attr) {
		var node = item;
       // если есть html элемент текущий, идет запуск цикла
		while (node) {
			// забираем атрибут
			// у элемента берется атрибут 
			var attrValue = node.getAttribute(attr);
		  // и теперь, если у нас есть атрибут, то мы просто его возвращаем
			if (attrValue) {
				return attrValue;
			}
			// если нету, то у нас нода превращается в элемент родителя
			node = node.parentElement;
		}
		// и если атрибута нету, то возвращаем null
		return null;
	};

	 // функция проверки закрытия по клику
   window.myLib.closestItemByClass = function (item, className) {
		var node = item;
       // если есть html элемент текущий, идет запуск цикла
		while (node) {
			
			if (node.classList.contains(className)) {
				return node;
			}
			// если нету, то у нас нода превращается в элемент родителя
			node = node.parentElement;
		}
		// и если атрибута нету, то возвращаем null
		return null;
	};

	// функция отмены скролла при активном попАПЕ
	window.myLib.toggleScroll = function () {
		myLib.body.classList.toggle('no-scroll');
	};
})();

/* myLib finish */

/* header start */
  /* HEADER JS */
;(function () {
	
	if (window.matchMedia('(max-width: 992px)').matches) {
		return;
	}

	var headerPage = document.querySelector('.header-page');

	window.addEventListener('scroll', function () {
		if (window.pageYOffset > 0) {
			headerPage.classList.add('is-active');
		} else {
			headerPage.classList.remove('is-active');
		}
	});
})();
/* header finish*/
/* popup start */
   // логика работы с popup
;(function () {
    // определение функции showPopup
	// показать попап
	var showPopup = function (target) {
		target.classList.add('is-active');
	};
	// показать закрыть попАП
	var closePopup = function (target) {
		target.classList.remove('is-active');
	};

	myLib.body.addEventListener('click', function (e) {
		var target = e.target;
		var popupClass = myLib.closestAttr(target, 'data-popup');
      // если попап класс равен null то мы возвращаем и ничего не делаем
		if (popupClass === null) {
			return;
		}
      // если не равен 
		// сначала, уберем стандартное поведение элемента
		e.preventDefault();
		// здесь происходит конкатенация , соединяем класс с точкой, чтобы найти как по селектору
		var popup = document.querySelector('.' + popupClass);
      
		// и здесь так же происходит проверка , если есть
		// попап , то мы показываем окно
		if (popup) {
			// функция showPopup
			showPopup(popup);
			myLib.toggleScroll();
		}
	});

   // функция закрытия попАПА при нажатии (клике) на кнопку закрыть и на затемненную область
	myLib.body.addEventListener('click', function (e) {
		var target = e.target;

		// если таргет содержит попАП button close или класс popup__body
		if (target.classList.contains('popup-close') ||
			 target.classList.contains('popup__body')) {
			var popup = myLib.closestItemByClass(target, 'popup');
			
			 // вызываем close POPUP и передаем popup
			closePopup(popup);
			myLib.toggleScroll();
			}
	});

   // функция закрытия попАПА при кнопке ESC
	myLib.body.addEventListener('keydown', function (e) {
		// если не равняется 27 то есть клавиши ESC то мы возвращаемся и ничего не делаем
		// ВРЕМЕННО ИСПОЛЬЗУЮ УСТАРЕВШЕЕ СВОЙСТВО , обязательно разберу его и заменю на современное кросс браузерное
		if (e.keyCode !== 27) {
			return;
		}

	   // иначе находим АКТИВНЫЙ попАП 
		var popup = document.querySelector('.popup.is-active');
		// и если есть попАП , то мы делаем close popUP 
		if (popup) {
			// передаем сюда popup
			closePopup(popup);
			myLib.toggleScroll();
		}
	});
})();
/* popup finish */
/* scrollTo start */
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
/* scrollTo finish */
/* catalog  start*/
// пишем самовызывающую функцию 
; (function () {
	var catalogSection = document.querySelector('.section-catalog');
   // если равен нулю, то мы выходим и ничего не происходит
	if (catalogSection === null) {
		return;
	}
	// наша цель перед нажатием на кнопку очищать ее полностью
	// теперь если мы нажимаем на кнопку у нас удаляется первый ребенок и назначается след элементу при нажатии 
	var removeChildren = function (item) {
		// цикл продолжает свою работу 
		// пока у нас есть первый элемент у родителя
		while (item.firstChild) {
			// и первый элемент этот мы у родителя удаляем
			item.removeChild(item.firstChild);
		}
	};
	// наша цель перед нажатием на кнопку очищать ее полностью
   // и уже функция updateChildren , что у нас передается item и children, item у нас catalog 
	// 
	var updateChildren = function (item, children) {
		// мы сначала все элементы удаляем
		removeChildren(item);
		// здесь пишем цикл , чтобы добавлять эти элементы
		// затем мы запускаем цикл , он ведет поиск по детям
		for (var i = 0; i < children.length; i += 1) {
			// и каждый ребенок добавляется в item который у нас catalog
			item.appendChild(children[i]);
		}
	};

   // обьявляю переменные
	var catalog = catalogSection.querySelector('.catalog');
	var catalogNav = catalogSection.querySelector('.catalog-nav');
	// и мы здесь храним все наши элементы
	var catalogItems = catalogSection.querySelectorAll('.catalog__item');

	// дальше пишем слушатель событий для catalogNav, обработчик
	catalogNav.addEventListener('click', function (e) {
		// мы находим элемент по которому мы кликнули
		var target = e.target;
		// затем мы находим ближайщий элемент у которого класс catalog-nav__btn
		var item = myLib.closestItemByClass(target, 'catalog-nav__btn');

		// теперь нужно сделать проверку, потому что, при клике по кнопке все ок, а если по nav, браузер выдает null 
		// и если item выдает класс null или содержит класс is-active
		if (item === null || item.classList.contains('is-active')) {
			// тогда мы просто выходим и не выполняем скрипт
			return;
		}
		// отменяем стандартное поведение кнопки e.preventDefault
		e.preventDefault();
		// потому мы берем filterValue у нашего элемента
		var filterValue = item.getAttribute('data-filter');
		// дальше мы получаем кнопку, которая была активной
		var previousBtnActive = catalogNav.querySelector('.catalog-nav__btn.is-active');
		// у этой кнопки удаляем класс is-active
		previousBtnActive.classList.remove('is-active');
		// нашей текущей кнопке добавляем активный класс
		item.classList.add('is-active');
     // если filterValue = all
		if (filterValue === 'all') {
			// тогда мы делаем функцию updateChildren, куда мы передаем catalog и catalogItems
			updateChildren(catalog, catalogItems);
			return;
		}

		// и если filterValue не равняется all, то мы фильтруем items. 
		// и у нас создается пустой массив
		var filteredItems = [];
		// здесь запускается цикл по всем items которые мы нашли в самом начале страницы
		for (var i = 0; i < catalogItems.length; i += 1) {
			// уже внутри будем получать текущий элемент
			// мы берем текущий элемент
			var current = catalogItems[i];
			// теперь делаем проверку если data-category = filterValue 
			// у текущего элемента проверяем атрибут data-category и если он = filterValue
			if (current.getAttribute('data-category') === filterValue) {
				// мы добавляем текущий элемент
				// тогда мы делаем push для нашего filteredItems
				filteredItems.push(current);
			}
		}
       // и здесь вместо catalogItems мы передаем filteredItems а в catalogItems все элементы
		 // то есть получается здесь у нас добавляются отфильтрованные элементы
		updateChildren(catalog, filteredItems);
	});
})();
/* catalog  finish*/
/* product start */
;(function () {
    // здесь мы находим каталог
	var catalog = document.querySelector('.catalog');

	// если catalog = null то мы возвращаемся
	// почему пишется именно такая конструкция, а не просто дальше пишется код внутри if
	// то у нас получиться вложенная структура, а так мы избавляемся от вложенных if
	// и делаем наш код более прямолинейным
	if (catalog === null) {
		return;
	}
  
	// функция Price была разделена от productSize, чтобы логика функции price находилась вне productSize
	var updateProductPrice = function (product, price) {
		// находим по классу в html где у нас указана цена 
		var productPrice = product.querySelector('.product__price-value');
		// здесь мы находим цену и вставляем новую цену
		productPrice.textContent = price;
	};

   // теперь при нажатии на кнопку у нас подсвечивается нужная кнопка
	var changeProductSize = function (target) { 
		// здесь нам нужно найти product
		var product = myLib.closestItemByClass(target, 'product');
		// находим пред активную кнопку
		var previousBtnActive = product.querySelector('.product__size.is-active');
		// эту переменную мы передаем в функцию вторым параметром и выше сама функция
		var newPrice = target.getAttribute('data-product-size-price');

		previousBtnActive.classList.remove('is-active');
		target.classList.add('is-active');
		// по этой кнопке productSize мы меняем значение цены товара(пиццы)
		// значение которой переходит в форму при заполнении
		updateProductPrice(product, newPrice);
	};
   // данный скрипт меняет в попАП ЗНАЧЕНИЯ ==> КАРТИНКУ , размер, описание, цену 
	var changeProductOrderInfo = function (target) {
		var product = myLib.closestItemByClass(target, 'product');
		var order = document.querySelector('.popup-order');

		var productTitle = product.querySelector('.product__title').textContent;
		var productSize = product.querySelector('.product__size.is-active').textContent;
		var productPrice = product.querySelector('.product__price-value').textContent;
		var productImgSrc = product.querySelector('.product__img').getAttribute('src');
       // теперь все эти значения нам нужно переместить в ордер
		order.querySelector('.order-info-title').setAttribute('value', productTitle);
		order.querySelector('.order-info-size').setAttribute('value', productSize);
		order.querySelector('.order-info-price').setAttribute('value', productPrice);
      // видимый контент
		order.querySelector('.order-product-title').textContent = productTitle;
		order.querySelector('.order-product-price').textContent = productPrice;
		order.querySelector('.order__size').textContent = productSize;
      order.querySelector('.order__img').setAttribute('src', productImgSrc);
	};

	catalog.addEventListener('click', function(e) {
		var target = e.target;
                                                        // проверка на то что класс не должен содержать is-active
		if (target.classList.contains('product__size') && !target.classList.contains('is-active')) {
			
			e.preventDefault();
			// и вызываем функцию которую создаем выше
			changeProductSize(target);
		}

		if (target.classList.contains('product__btn')) {
			e.preventDefault();
			// и вызываем функцию которую создаем выше
			changeProductOrderInfo(target);
		}
	});
})();
/* product finish */
/* map start */
function initMap() {
	var element = document.getElementById('gmap');
	var options = {
		zoom: 6,
		center: { lat: 48.450001, lng: 34.983334 }
	};
	var myMap = new google.maps.Map(element, options);
   var icon = {
    url: '../img/common/marker.svg', // url
    scaledSize: new google.maps.Size(50, 50), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};

	var InfoWindow = new google.maps.InfoWindow({
    content: '<h3>PizzaTime OPEN 24/7</h3>'
	});
   var marker = new google.maps.Marker({
		position: new google.maps.LatLng(48.450001, 34.983334),
	map: myMap,
	icon: icon	
	});
	marker.addListener('click', function () {
		InfoWindow.open(myMap, marker);
	})
}
/* map finish */
/* form start */
;(function() {
  var forms = document.querySelectorAll('.form-send');

  if (forms.length === 0) {
    return;
  }

  var serialize = function(form) {
    var items = form.querySelectorAll('input, select, textarea');
    var str = '';
    for (var i = 0; i < items.length; i += 1) {
      var item = items[i];
      var name = item.name;
      var value = item.value;
      var separator = i === 0 ? '' : '&';

      if (value) {
        str += separator + name + '=' + value;
      }
    }
    return str;
  };

  var formSend = function(form) {
    var data = serialize(form);
    var xhr = new XMLHttpRequest();
    var url = 'php/mail.php';
    
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
      var activePopup = document.querySelector('.popup.is-active');

      if (activePopup) {
        activePopup.classList.remove('is-active');
      } else {
        myLib.toggleScroll();
      }

      if (xhr.response === 'success') {
        document.querySelector('.popup-thanks').classList.add('is-active');
      } else {
        document.querySelector('.popup-error').classList.add('is-active');
      }

      form.reset();
    };

    xhr.send(data);
  };

  for (var i = 0; i < forms.length; i += 1) {
    forms[i].addEventListener('submit', function(e) {
      e.preventDefault();
      var form = e.currentTarget;
      formSend(form);
    });
  }
})();
/* form finish */