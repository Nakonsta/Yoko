//https://css-tricks.com/container-adapting-tabs-with-more-button/
const container = document.querySelector('.more-js')
const primary = container.querySelector('.header__nav')
const primaryItems = container.querySelectorAll('.more-js__item:not(.-more)')
primary.classList.add('header__nav--jsfied')

// insert "more" button and duplicate the list

primary.insertAdjacentHTML('beforeend', `
  <li class="primary -more">
    <button type="button" aria-haspopup="true" aria-expanded="false">
      <span>Еще...</span>
    </button>
    <ul class="-secondary">
      ${primary.innerHTML}
    </ul>
  </li>
`)
const secondary = container.querySelector('.-secondary')
const secondaryItems = secondary.querySelectorAll('.more-js__item')
const allItems = container.querySelectorAll('li')
const moreLi = primary.querySelector('.-more')
const moreBtn = moreLi.querySelector('button')
moreBtn.addEventListener('click', (e) => {
    e.preventDefault()
    container.classList.toggle('--show-secondary')
    moreBtn.setAttribute('aria-expanded', container.classList.contains('--show-secondary'))
})


function doAdapt() {
    allItems.forEach((item) => {
        item.classList.remove('--hidden')
    })
    let stopWidth = $(moreBtn).outerWidth()
    let hiddenItems = []
    const primaryWidth = $(primary).outerWidth()
    primaryItems.forEach((item, i) => {
        if(primaryWidth >= stopWidth + $(item).width()) {
            stopWidth += $(item).outerWidth()
        } else {
            item.classList.add('--hidden')
            hiddenItems.push(i)
        }
    })
    if(!hiddenItems.length) {
        moreLi.classList.add('--hidden')
        container.classList.remove('--show-secondary')
        moreBtn.setAttribute('aria-expanded', false)
    }
    else {
        secondaryItems.forEach((item, i) => {
            if(!hiddenItems.includes(i)) {
                item.classList.add('--hidden')
            }
        })
    }
}

doAdapt() // adapt immediately on load
window.addEventListener('resize', doAdapt) // adapt on window resize
