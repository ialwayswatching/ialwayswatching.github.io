let c1 = '#6C5DD3',
    c2 = '#A0D7E7',
    c3 = '#FDFDFD',
    c4 = '#3F8CFF',
    t1 = '#808191',
    t2 = '#FDFDFD';

function canvas(c1, c2, text) {
    let ctx = document.getElementById('myChart');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['', 'Oct', 'Mar', 'Jul', 'Aug', ''],
            datasets: [
                {
                    data: [0, 22.4, 8.3, 60, 12.1, 30.7],
                    fill: false,
                    borderColor: c1,
                    borderWidth: 2
                },
                {
                    data: [0, 28.2, 0, 44.8, 12.1, 41.6],
                    fill: false,
                    borderColor: c2,
                    borderWidth: 2
                }
            ]
        },
        options: {
            legend: {
                display: false,
                labels: {
                    fontSize: '13',
                    lineHeight: '18'
                }
            },
            layout: {
                padding: {
                    left: 37,
                    right: 25,
                    top: 43,
                    bottom: 7
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        fontColor: text,
                        beginAtZero: false,
                        padding: 18
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        max: 60,
                        min: 0,
                        stepSize: 20,
                        beginAtZero: false,
                        fontColor: text,
                        padding: 20
                    }
                }]
            },
        }
    });
}

canvas(c1, c2, t1)

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-switch__checkbox').checked = true
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector('.theme-switch__checkbox').checked = false
    }
    let checkbox = document.querySelector('.theme-switch__checkbox');
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            canvas(c3, c4, t2);
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            canvas(c1, c2, t1);
            localStorage.setItem('theme', 'light');
        }
    })
});

new WOW().init();

const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'vertical',
    loop: false,
    speed: 500,
    effect: 'coverflow',
    coverflowEffect: {
        depth: 100,
        rotate: 30,
        slideShadows: true,
        stretch: 10,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    mousewheel: {
        invert: false,
    }
});

