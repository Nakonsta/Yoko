let newsDetailContent = document.querySelector('.news-detail__content')

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
