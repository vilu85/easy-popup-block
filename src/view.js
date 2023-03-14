import domReady from '@wordpress/dom-ready';

domReady(() => {
	class ModalListener {
		constructor(element) {
			this.element = element;
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
			this.hasOpened = true;
		}

		closePopup() {
			this.overlay.dataset.isopen = false;
		}
	}

	const popups = document.querySelectorAll('.epb-modal');

	if (!popups.length) {
		return;
	}

	popups.forEach((block) => {
		new ModalListener(block);
	});
});
