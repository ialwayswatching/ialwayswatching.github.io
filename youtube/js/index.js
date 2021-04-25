const API_KEY = 'AIzaSyDtW_j1g01LeSGrl3iDprxqjXxXR4jxkfs',
    CLIENT_ID = '176144385162-1oopc92vm0djutgq9bcbuo03q0cdvs3v.apps.googleusercontent.com',
    content = document.querySelector('.content'),
    navMenuMore = document.querySelector('.nav-menu-more'),
    showMore = document.querySelector('.show-more'),
    formSearch = document.querySelector('.form-search'),
    navLinkLiked = document.querySelectorAll('.nav-link-liked'),
    navLinkHome = document.querySelectorAll('.nav-link-home'),
    navLinkTrend = document.querySelectorAll('.nav-link-trend'),
    navLinkPlaylist = document.querySelectorAll('.nav-link-subs'),
    navLinkMusic = document.querySelector('.nav-link-music'),
    navLinkGames = document.querySelector('.nav-link-games'),
    menuBtn = document.querySelector('.menu-button'),
    sidebar = document.querySelector('.sidebar'),
    subList = document.querySelector('.sub-list');

const createCard = (dataVideo) => {
    const imgUrl = dataVideo.snippet.thumbnails.high.url,
        videoId = typeof dataVideo.id === 'string' ?
            dataVideo.id :
            dataVideo.id.videoId,
        titleVideo = dataVideo.snippet.title,
        viewCount = dataVideo.statistics?.viewCount,
        dateVideo = dataVideo.snippet.publishedAt,
        channelTitle = dataVideo.snippet.channelTitle;

    const card = document.createElement('li');
    card.classList.add('video-card');
    card.innerHTML = `
        <div class="video-thumb">
            <a class="link-video youtube-modal" href="https://youtu.be/${videoId}">
                <img src="${imgUrl}" alt="" class="thumbnail">
            </a>
        </div>
            <h3 class="video-title">${titleVideo}</h3>
        <div class="video-info">
            <span class="video-counter">
            ${viewCount ? `<span class="video-views">${getViewer(viewCount)}</span>` : ''}
                <span class="video-date">${getDate(dateVideo)}</span>
            </span>
            <span class="video-channel">${channelTitle}</span>
        </div>
        `;
    return card;
}

const createList = (listVideo, title, clear) => {

    const channel = document.createElement('section');
    channel.classList.add('channel');

    if (clear) {
        content.textContent = '';
    }

    if (title) {
        const header = document.createElement('h2');
        header.classList.add('card-title');
        header.textContent = title;
        channel.insertAdjacentElement('afterbegin', header);
    }

    const wrapper = document.createElement('ul');
    wrapper.classList.add('video-list');
    channel.insertAdjacentElement('beforeend', wrapper);

    listVideo.forEach(item => {
        const card = createCard(item);
        wrapper.append(card);
    });

    content.insertAdjacentElement('beforeend', channel);
};

const createSubList = listVideo => {
    subList.textContent = '';
    listVideo.forEach(item => {
        const { resourceId: { channelId: id }, title, thumbnails: { high: { url } } } = item.snippet;
        const html = `
        <li class="nav-item">
          <a href="#" class="nav-link" data-channel-id="${id}" data-title="${title}">
            <img src="${url}" alt="${title}" class="nav-image">
            <span class="nav-text">${title}</span>
          </a>
        </li>
        `
        subList.insertAdjacentHTML('beforeend', html)
    });
};

const getDate = (date) => {
    const currentDay = Date.parse(new Date());
    const days = Math.round((currentDay - Date.parse(new Date(date))) / 86400000);
    if (days > 30) {
        if (days > 60) {
            return Math.round(days / 30) + ' month ago'
        }
        return 'month ago'
    }

    if (days > 1) {
        return Math.round(days) + ' days ago'
    }
    return 'day ago'

    // написать условие для года
};

const getViewer = count => {
    if (count >= 1000000) {
        return Math.round(count / 1000000) + 'M views'
    }

    if (count >= 1000) {
        return Math.round(count / 1000) + 'K views'
    }

    return count + ' views'
};


// youtubeAPI
const authBtn = document.querySelector('.auth-btn'),
    userAvatar = document.querySelector('.user-avatar'),
    // успешная авторизация
    handleSuccessAuth = data => {
        authBtn.classList.add('hide');
        userAvatar.classList.remove('hide');
        userAvatar.src = data.getImageUrl();
        userAvatar.alt = data.getName();
        requestSub(createSubList);
    },
    // функция если не авторизован
    handleNoAuth = () => {
        authBtn.classList.remove('hide');
        userAvatar.classList.add('hide');
        userAvatar.src = '';
        userAvatar.alt = '';
    },
    // функция входа
    handleAuth = () => {
        gapi.auth2.getAuthInstance().signIn();
    },
    // функция выхода из аккаунта
    handleSignOut = () => {
        gapi.auth2.getAuthInstance().signOut();
    },
    // проверка статуса авторизации
    updateStatusAuth = data => {
        data.isSignedIn.listen(() => {
            updateStatusAuth(data);
        });
        if (data.isSignedIn.get()) {
            const userData = data.currentUser.get().getBasicProfile();
            handleSuccessAuth(userData);
        } else {
            handleNoAuth();
        }
    };

// функция авторизации
function initClient() {
    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': 'https://www.googleapis.com/auth/youtube.readonly',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    })
        .then(() => {
            updateStatusAuth(gapi.auth2.getAuthInstance());
            authBtn.addEventListener('click', handleAuth);
            userAvatar.addEventListener('click', handleSignOut);

        })
        .then(screenLoad)
        .catch(e => {
            console.warn(e)
        });
};

// загрузка авторизации
gapi.load('client:auth2', initClient);

// запрос конкретного канала
const requestVideos = (channelId, cb, maxResults = 6) => {
    gapi.client.youtube.search.list({
        part: 'snippet',
        channelId,
        maxResults,
        order: 'date',
    }).execute(response => {
        cb(response.items);
    })
};

// получаем тренды
const requestTrending = (cb, maxResults = 6) => {
    gapi.client.youtube.videos.list({
        part: 'snippet, statistics',
        chart: 'MostPopular',
        regionCode: 'RU',
        maxResults,
    }).execute(response => {
        cb(response.items);
    })
};

// получаем музыку
const requestMusic = (cb, maxResults = 6) => {
    gapi.client.youtube.videos.list({
        part: 'snippet, statistics',
        chart: 'MostPopular',
        regionCode: 'RU',
        maxResults,
        videoCategoryId: '10',
    }).execute(response => {
        cb(response.items);
    })
};

const requestGames = (cb, maxResults = 6) => {
    gapi.client.youtube.videos.list({
        part: 'snippet, statistics',
        chart: 'MostPopular',
        regionCode: 'RU',
        maxResults,
        videoCategoryId: '20',
    }).execute(response => {
        cb(response.items);
    })
};

// реализуем поиск
const requestSearch = (searchText, cb, maxResults = 12) => {
    gapi.client.youtube.search.list({
        part: 'snippet',
        q: searchText,
        maxResults,
        order: 'relevance',
    }).execute(response => {
        cb(response.items)
    })
};

// Запрашиваем подписчиков
const requestSub = (cb, maxResults = 6) => {
    gapi.client.youtube.subscriptions.list({
        part: 'snippet',
        mine: true,
        maxResults,
        order: 'unread',
    }).execute(response => {
        cb(response.items);
    })
};

const requestLike = (cb, maxResults = 6) => {
    gapi.client.youtube.videos.list({
        part: 'contentDetails, snippet, statistics',
        maxResults,
        myRating: 'like',
    }).execute(response => {
        cb(response.items)
    })
};

// запрос подписок
requestPlaylist = (cb, maxResults = 6) => {
    gapi.client.youtube.playlists.list({
        part: 'contentDetails, snippet',
        maxResults,
        mine: true,
    }).execute(response => {
        cb(response.items)
    })
};


// загружаем запросы в вёрстку
const screenLoad = () => {
    content.textContent = '';
    requestVideos('UC5V-Uv0eUg0Fby0v13luULw', data => {
        createList(data, 'NaVi CSGO');
        requestTrending(data => {
            createList(data, 'Тренды')
            requestMusic(data => {
                createList(data, 'Музыка')
            });
        });
    });
};

// dropdown
showMore.addEventListener('click', (event) => {
    event.preventDefault();
    navMenuMore.classList.toggle('nav-menu-more-show');
});

// изменение содержимого враппера на содержимое из запроса поиска
formSearch.addEventListener('submit', event => {
    event.preventDefault();
    const value = formSearch.elements.search.value;
    requestSearch(value, data => {
        createList(data, 'Результат поиска', true);
    });
});

// заполняем subList и генерируем видео из подписок
subList.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    const channelLink = target.closest('.nav-link');
    const channelId = channelLink.dataset.channelId;
    const title = channelLink.dataset.title;
    requestVideos(channelId, data => {
        createList(data, title, true);
    }, 12);
});

// реализация лайкнутых видео
navLinkLiked.forEach(elem => {
    elem.addEventListener('click', event => {
        event.preventDefault();
        requestLike(data => {
            createList(data, 'Понравившиеся', true);
        }, 12);
    });
});

// домашняя страница
navLinkHome.forEach(elem => {
    elem.addEventListener('click', event => {
        event.preventDefault();
        screenLoad();
    })
})

// страница трендов
navLinkTrend.forEach(elem => {
    elem.addEventListener('click', event => {
        event.preventDefault();
        requestTrending(data => {
            createList(data, 'Тренды', true);
        }, 21);
    })
})

// плейлисты
navLinkPlaylist.forEach(elem => {
    elem.addEventListener('click', event => {
        event.preventDefault();
        requestPlaylist(data => {
            createList(data, 'Плейлисты', true);
        }, 3);
    });
});

// музыка
navLinkMusic.addEventListener('click', e => {
    e.preventDefault();
    requestMusic(data => {
        createList(data, 'Музыка', true);
    }, 12);
})

// игры
navLinkGames.addEventListener('click', e => {
    e.preventDefault();
    requestGames(data => {
        createList(data, 'Игры', true);
    }, 10);
})

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hide')
    sidebar.classList.toggle('fade')
})