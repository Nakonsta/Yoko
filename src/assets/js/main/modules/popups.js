const popupLinksClass = 'popup-link';
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

function openPopupById(id) {
	const name = id.replace('#', '');
	const curentPopup = document.getElementById(name);
	popupOpen(curentPopup);
}

document.addEventListener('click', function(e) {
	if( ! e.target.classList.contains(popupLinksClass) ) return;
	e.preventDefault();
	const href = e.target.getAttribute('href');
	openPopupById(href);
	e.preventDefault();
});

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
		if (getInternetExplorerVersion() !== -1) {
			// IE обнаружен
			let body = curentPopup.querySelector(".popup__content");
			console.log($(body).height(), $(window).height())
			if ($(body).height() > $(window).height()) {
				curentPopup.classList.add('popup--fix-ie');
			}
		}
		if( document.querySelector('.mobile-nav') ) {
			document.querySelector('.mobile-nav').classList.remove('mobile-nav--open')
		}
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock-popup');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock-popup');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();


function popupOpenUniversalForm(title = '', text = '') {
	let modal = document.getElementById('universal-form');
	let titleModal = modal ? modal.querySelector('.advantages__title') : null;
	let textModal = modal ? modal.querySelector('.advantages__text') : null;

	console.log(titleModal)

	titleModal.innerHTML = title;
	if (titleModal) {
		titleModal.innerHTML = title;
	}
	if (textModal) {
		textModal.innerHTML = text;
	}

	if (modal) {
		popupOpen(modal);
	}
}

(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();

window.popupOpen = popupOpenUniversalForm;
window.openPopupById = openPopupById;
