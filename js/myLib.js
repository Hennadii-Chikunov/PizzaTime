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