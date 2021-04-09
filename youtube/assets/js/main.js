const channelSwiper = new Swiper('.channel__slider', {
    // Optional parameters
    loop: true,
    slidesPerView: 6,
    // Navigation arrows
    navigation: {
        nextEl: '.channel__button-next',
        prevEl: '.channel__button-prev',
    },
});

const recomendSwiper = new Swiper('.recomend__slider', {
    // Optional parameters
    loop: true,
    slidesPerView: 3,
    // Navigation arrows
    navigation: {
        nextEl: '.recomend__button-next',
        prevEl: '.recomend__button-prev',
    },
});


const FoodSwiper = new Swiper('.food__slider', {
    // Optional parameters
    loop: true,
    slidesPerView: 6,
    // Navigation arrows
    navigation: {
        nextEl: '.food__button-next',
        prevEl: '.food__button-prev',
    },
});