let index = 0;
const items = document.querySelectorAll('.carousel-item');

function showCarousel() {
    items.forEach((item, i) => {
        item.style.transform = `translateX(${(i - index) * 320}px)`;
    });
}

setInterval(() => {
    index = (index + 1) % items.length;
    showCarousel();
}, 3000);
