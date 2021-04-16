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