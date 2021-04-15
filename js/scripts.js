// данный скрипт это надежное меню по юзабилити и удобству пользователя
$(document).ready(function () {
	$(".header-page__hamburger").click(function (event) {
		$(".header-page__hamburger, .popup").toggleClass("active");
		// Отмена скролла при включенном мобильном меню
		$("body").toggleClass("lock");
	});
});