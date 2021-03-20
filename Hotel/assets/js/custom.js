$(document).ready(function () {
    // slider
    $('.hotel-slider, .review-slider').slick();
    // menu and scroll hidden for body
    $('.burger').on('click', function () {
        $('.mobile_hidden').slideToggle();
        $('body').toggleClass('burger-flow');
        $('.header').css('position', 'relative');
    });

    // disable scroll
    $.fn.disableScroll = function () {
        window.oldScrollPos = $(window).scrollTop();

        $(window).on('scroll.scrolldisabler', function (event) {
            $(window).scrollTop(window.oldScrollPos);
            event.preventDefault();
        });

        // enable scroll
    };
    $.fn.enableScroll = function () {
        $(window).off('scroll.scrolldisabler');
    };

    // modal window open, close, and center
    let dlg = $('.modal');
    $('.activities-item_book').on('click', function () {
        var offset = $(document).scrollTop(),
            viewportHeight = $(window).height();
        dlg.css('top', (offset + (viewportHeight / 2)) - (dlg.outerHeight() / 2));
        $('.overlay').toggle()
        dlg.slideToggle()
        $('body').disableScroll();
    });
    // off modal overlay click
    $('.overlay').on('click', function () {
        $(this).hide();
        dlg.hide();
        $(window).off('scroll.scrolldisabler');
    });
    // modal off esc
    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $('.overlay').hide();
            dlg.hide();
            $(window).off('scroll.scrolldisabler');
        }
    });
});
$('button').on('click', function (event) {
    event.preventDefault();
});


document.addEventListener('DOMContentLoaded', function () {
    mySticky()
    window.addEventListener('resize', function () {
        mySticky()
    });
})

function mySticky() {
    let header = document.querySelector('.header');
    let fixed = header.offsetTop + 120;
    window.addEventListener('scroll', function () {
        if (window.screen.width <= 760 && window.pageYOffset >= fixed) {
            header.classList.add('header_fixed');
        } else {
            header.classList.remove('header_fixed');
        }
    })
}