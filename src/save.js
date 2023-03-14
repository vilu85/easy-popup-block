/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Saves the block and its attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const { attributes } = props;
	const {
		minWidth,
		width,
		maxWidth,
		minHeight,
		height,
		maxHeight,
		customCss,
		border,
		position,
		modalSolidBg,
		modalGradientBg,
		overlaySolidBg,
		overlayGradientBg,
		closeBtnSize,
		closeBtnColor,
		closeBtnVariant
	} = attributes;

	const isCloseBtnVisible = true;	//TODO: Move to attributes
	const isOpenBtnVisible = true; //TODO: Move to attributes

	const closeBtnStyle = {
		'--closebtnsize': `${closeBtnSize}px`,
		color: closeBtnColor
	}

	const modalStyle = {
		minWidth,
		width,
		maxWidth,
		minHeight,
		height,
		maxHeight,
		backgroundColor: modalSolidBg,
		background: modalGradientBg,
	}

	if(border) {
		modalStyle['--epb-modal-border-color'] = border?.color;
		modalStyle['--epb-modal-border-style'] = border?.style,
		modalStyle['--epb-modal-border-width'] = border?.width
	}

	const overlayStyle = {
		backgroundColor: overlaySolidBg,
		background: overlayGradientBg
	}

	let sanitizedCustomCss;

	if (customCss && customCss.trim() !== '') {
		sanitizedCustomCss = customCss.replace(/(<([^>]+)>)/gi, '');
	}

	return (
		<div
			className="epb-popup"
			data-isopen="false"
		>
			{isOpenBtnVisible && (
				<input type="button" value={__('Show Popup', 'epb-popup')} { ...useBlockProps.save() } />
			)}
			<div className="epb-popup-wrapper">
				<div className="epb-modal-wrapper" data-position={ position } >
					{sanitizedCustomCss && <style>{sanitizedCustomCss}</style>}
					<div
						role="presentation"
						className="epb-modal-overlay"
						style={ overlayStyle }
					/>
					<div className="epb-modal-content" style={modalStyle}>
						{isCloseBtnVisible && (
							<button
								className="epb-popup-close-btn"
								style={closeBtnStyle}
								data-closebtn-variant={ closeBtnVariant }
							>
								<span>✕</span>
							</button>
						)}
						<div className="epb-modal-body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
