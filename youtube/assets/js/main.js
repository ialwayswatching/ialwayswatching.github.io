const channelSwiper = new Swiper('.channel__slider', {
    // Optional parameters
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        1900: {
            slidesPerView: 6
        },
        1600: {
            slidesPerView: 5
        },
        1300: {
            slidesPerView: 4
        },
        1100: {
            slidesPerView: 3
        },
        800: {
            slidesPerView: 2
        },
    },
    // Navigation arrows
    navigation: {
        nextEl: '.channel__button-next',
        prevEl: '.channel__button-prev',
    },
});

const recomendSwiper = new Swiper('.recomend__slider', {
    // Optional parameters
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        1600: {
            slidesPerView: 3
        },
        1100: {
            slidesPerView: 2
        },
    },
    // Navigation arrows
    navigation: {
        nextEl: '.recomend__button-next',
        prevEl: '.recomend__button-prev',
    },
});


const FoodSwiper = new Swiper('.food__slider', {
    // Optional parameters
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        1900: {
            slidesPerView: 6
        },
        1600: {
            slidesPerView: 5
        },
        1300: {
            slidesPerView: 4
        },
        1100: {
            slidesPerView: 3
        },
        800: {
            slidesPerView: 2
        },
    },
    // Navigation arrows
    navigation: {
        nextEl: '.food__button-next',
        prevEl: '.food__button-prev',
    },
});

const searchBtn = document.querySelector('.mobile__search'),
    mobileSearch = document.querySelector('.input__group');

searchBtn.addEventListener('click', () => {
    mobileSearch.classList.toggle('is-open');
});

if (document.documentElement.scrollWidth <= 640) {
    channelSwiper.destroy();
    recomendSwiper.destroy();
    FoodSwiper.destroy();
}