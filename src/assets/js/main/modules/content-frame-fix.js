let newsDetailContent = document.querySelector('.news-detail__content')
let aboutUsContent = document.querySelector('.about-us__contant')

function wrap(el, className = 'news-detail__frame') {
    const wrapper = document.createElement('div');
    wrapper.classList = className;
    el.insertAdjacentElement('afterend', wrapper);
    wrapper.appendChild(el)
}

if (newsDetailContent) {
    let frames = newsDetailContent.querySelectorAll('iframe')

    frames.forEach((frame) => {
        wrap(frame)
    })
}

if (aboutUsContent) {
    let frames = aboutUsContent.querySelectorAll('iframe')

    frames.forEach((frame) => {
        wrap(frame, 'about-us__frame')
    })
}

