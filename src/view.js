import domReady from '@wordpress/dom-ready';

domReady(() => {
	class ModalListener {
		constructor(element) {
			this.element = element;
			this.initialBodyStyle = {};
			this.hasOpened = false;
			this.openBtn = element.querySelector('input[type="button"].wp-block-epb-easy-popup-block');
			this.closeBtn = element.querySelector('.epb-modal-content > button');
			this.overlay = element.querySelector('.epb-modal-wrapper');

			this.element.addEventListener('click', this.handleElementClick);
		}

		handleElementClick = (event) => {
			if (event.target === this.openBtn) {
				event.preventDefault();
				this.openPopup();
			} else if (
				event.target === this.closeBtn || event.target.closest('.epb-modal-content > button') !== null ||
				event.target === this.overlay
			) {
				this.closePopup();
			}
		};

		openPopup() {
			this.overlay.dataset.isopen = true;
			const body = document.body;
			this.initialBodyStyle = {
				height: body.style.height,
				overflowY: body.style.overflowY,
				marginRight: body.style.marginRight
			};
			body.style.height = '100vh';
			body.style.overflowY = 'hidden';
			body.style.marginRight = '15px';
			this.hasOpened = true;
		}

		closePopup() {
			const body = document.body;
			body.style.height = this.initialBodyStyle.height;
			body.style.overflowY = this.initialBodyStyle.overflowY;
			body.style.marginRight = this.initialBodyStyle.marginRight;
			this.overlay.dataset.isopen = false;
		}
	}

	const popups = document.querySelectorAll('.epb-modal');

	if (!popups.length) {
		return;
	}

	window.addEventListener('scroll', () => {
		document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
	});

	popups.forEach((block) => {
		new ModalListener(block);
	});
});
