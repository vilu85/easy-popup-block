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
		closeBtnVariant,
		buttonText
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
		<>
		{sanitizedCustomCss && <style>{sanitizedCustomCss}</style>}
		<div className='epb-modal'>
		{isOpenBtnVisible && (
			<input type="button" value={ buttonText ? buttonText : __('Show Popup', 'easy-popup-block') } { ...useBlockProps.save() } />
		) }
			<div className="epb-modal-wrapper" style={overlayStyle} data-position={ position } data-isopen="false">
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
						<InnerBlocks.Content />
					</div>
			</div>
		</div>
		</>
	);
}
