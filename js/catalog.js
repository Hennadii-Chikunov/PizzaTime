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