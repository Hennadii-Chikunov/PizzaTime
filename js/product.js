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
   // теперь при нажатии на кнопку у нас подсвечивается нужная кнопка
	var changeProductSize = function (target) { 
		// здесь нам нужно найти product
		var product = myLib.closestItemByClass(target, 'product');
		// находим пред активную кнопку
		var previousBtnActive = product.querySelector('.product__size.is-active');

		previousBtnActive.classList.remove('is-active');
		target.classList.add('is-active');
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