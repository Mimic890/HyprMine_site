// Функция обновления фона
function updateBackground() {
	const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
	const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	// Если высоты для прокрутки нет, устанавливаем scrollPercent в 0
	let scrollPercent = docHeight > 0 ? scrollPos / docHeight : 0;
	
	// Если прокрутка достигла конца — корректируем значение
	if (scrollPercent >= 1) scrollPercent = 0.9999;
	
	const bgImages = document.querySelectorAll('.bg-image');
	const totalImages = bgImages.length;
	
	// В отладочных целях можно вывести в консоль значения
	console.log("scrollPercent:", scrollPercent, "totalImages:", totalImages);
	
	if (totalImages === 0) {
			console.warn("Не найдены элементы с классом .bg-image");
			return;
	}
	
	const segmentProgress = scrollPercent * (totalImages - 1);
	const currentIndex = Math.floor(segmentProgress);
	const progress = segmentProgress - currentIndex;
	
	bgImages.forEach((img, index) => {
			if (index === currentIndex) {
					img.style.opacity = 1 - progress;
			} else if (index === currentIndex + 1) {
					img.style.opacity = progress;
			} else {
					img.style.opacity = 0;
			}
	});
}

// Вызываем функцию сразу, при загрузке и при изменении окна/прокрутке
document.addEventListener('DOMContentLoaded', updateBackground);
window.addEventListener('load', updateBackground);
window.addEventListener('scroll', updateBackground);
window.addEventListener('resize', updateBackground);

// Немедленный вызов
updateBackground();
