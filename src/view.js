import domReady from '@wordpress/dom-ready';

domReady(() => {
	class PopupListeners {
		constructor(element) {
			this.element = element;
			this.hasOpened = false;
			this.closeBtn = element.querySelector('.epb-modal-content > button');
			this.overlay = element.querySelector('.epb-modal-overlay');

			this.element.addEventListener('click', this.handleDocumentClick);
		}

		handleDocumentClick = (event) => {
			if (event.target.matches('.epb-popup input[type="button"]')) {
				event.preventDefault();
				this.openPopup();
			} else if (
				event.target.closest('.epb-popup-close-btn') !== null ||
				event.target === this.overlay
			) {
				this.closePopup();
			}
		};

		openPopup() {
			this.element.dataset.isopen = true;
			this.hasOpened = true;
		}

		closePopup() {
			this.element.dataset.isopen = false;
		}
	}

	const popups = document.querySelectorAll('.epb-popup');

	if (!popups.length) {
		return;
	}

	popups.forEach((block) => {
		new PopupListeners(block);
	});
});
