/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	__experimentalColorGradientControl as ColorGradientControl,
	// __experimentalBorderRadiusControl as BorderRadiusControl
} from '@wordpress/block-editor';
import { __experimentalBorderControl as BorderControl, ResizableBox  } from '@wordpress/components';
import { useBlockProps, InnerBlocks, InspectorControls  } from '@wordpress/block-editor';
import { __experimentalBoxControl as BoxControl, BaseControl, PanelBody, Button, PanelRow, TextareaControl, RangeControl, ToggleControl, TextControl  } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import { dispatch } from '@wordpress/data';

import './editor.scss';

/**
 * Creates a block editor controls for the block
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const {
		minWidth,
		width,
		maxWidth,
		minHeight,
		height,
		maxHeight,
		position,
		border,
		customCss,
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

	const closeBtnStyle = {
		'--closebtnsize': `${closeBtnSize}px`,
		color: closeBtnColor
	};

	const [previewing, setPreviewing] = useState(false);

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

	const overlayStyle = {
		backgroundColor: overlaySolidBg,
		background: overlayGradientBg
	}

	if(border) {
		modalStyle['--epb-modal-border-color'] = border?.color;
		modalStyle['--epb-modal-border-style'] = border?.style,
		modalStyle['--epb-modal-border-width'] = border?.width
	}

	let sanitizedCustomCss;

	if (customCss && customCss.trim() !== '') {
		sanitizedCustomCss = customCss.replace(/(<([^>]+)>)/gi, '');
	}

	const togglePreview = (e) => {
		e.preventDefault();
		setPreviewing(!previewing);
	}

	const toggleSelection = ( isSelected ) => {
		if(isSelected) {
			dispatch( 'core/block-editor' ).selectBlock( clientId );
		}
	}

	return (
		<>
			<InspectorControls >
				<PanelBody title={ __( 'Modal size and position', 'easy-popup-block' ) } initialOpen={ true }>
					<PanelRow>
						<ModalSizeControls label={ __( 'Width and height', 'easy-popup-block' ) } size={ { width, height } } onChange={ (newSize) => setAttributes( { width: newSize.width, height: newSize.height } )} />
					</PanelRow>
					<PanelRow>
						<ModalSizeControls label={ __( 'Minimum width and height', 'easy-popup-block' ) } size={ { width: minWidth, height: minHeight } } onChange={ (newSize) => setAttributes( { minWidth: newSize.width, minHeight: newSize.height } )} />
					</PanelRow>
					<PanelRow>
						<ModalSizeControls label={ __( 'Maximum width and height', 'easy-popup-block' ) } size={ { width: maxWidth, height: maxHeight } } onChange={ (newSize) => setAttributes( { maxWidth: newSize.width, maxHeight: newSize.height } )}/>
					</PanelRow>
					<SelectControl
						label={ __( 'Modal position', 'easy-popup-block')}
						className="epb-easy-popup-block-modal-position"
						value={ position }
						options={ [
							{ label: 'Absolute', value: 'absolute' },
							{ label: 'Fixed', value: 'fixed' },
							{ label: 'Relative', value: 'relative' },
							{ label: 'Sticky', value: 'sticky' },
						] }
						onChange={ ( value ) => setAttributes( { position: value} ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Modal apperance', 'easy-popup-block' ) } initialOpen={ true }>
					<PanelRow>
					<ColorGradientControl
						label={ __( 'Modal background', 'easy-popup-block' ) }
						enableAlpha
						defaultValue="#fff"
						colorValue={modalStyle?.backgroundColor}
						gradientValue={ modalStyle?.background }
						onGradientChange={ ( value ) => setAttributes( { modalGradientBg: value } ) }
						onColorChange={ (value) => setAttributes( { modalSolidBg: value })}
					/>
					</PanelRow>
					<PanelRow>
						<BorderControl
							label={ __( 'Modal border', 'easy-popup-block' ) }
							onChange={ (value) => setAttributes( { border: value })}
							value={ border }
							enableAlpha
							enableStyle
							withSlider
						/>
					</PanelRow>
					<RangeControl
						label={ __( 'Close button size', 'easy-popup-block')}
						value={ closeBtnSize }
						onChange={ ( value ) => setAttributes( { closeBtnSize: value} ) }
						min={ 0 }
						max={ 100 }
					/>
					<ColorGradientControl
						label={ __( 'Close button color', 'easy-popup-block' ) }
						enableAlpha
						defaultValue="#000"
						colorValue={closeBtnColor}
						onColorChange={ (value) => setAttributes( { closeBtnColor: value })}
					/>
					<ToggleControl
						label={ __( 'Alternative close button variant', 'easy-popup-block' )}
						help={ __( 'Moves the Close button to the top corner of the popup window.', 'easy-popup-block' )}
						checked={ closeBtnVariant === 'corner' }
						onChange={ (isChecked) => {
							setAttributes( { closeBtnVariant: isChecked ? 'corner' : '' } );
						} }
					/>
					<PanelRow>
						<TextareaControl
							label={__('Modal css', 'easy-popup-block')}
							value={customCss}
							onChange={(value) =>
								setAttributes({ customCss: value })
							}
							help={ __( 'Any css here will be applied to the modal' ) }
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title={ __( 'Overlay', 'easy-popup-block' ) } initialOpen={ true }>
					<ColorGradientControl
						label={ __( 'Overlay background', 'easy-popup-block' ) }
						enableAlpha
						defaultValue="#fff"
						colorValue={overlayStyle?.backgroundColor}
						gradientValue={ overlayStyle?.background }
						onGradientChange={ ( value ) => setAttributes( { overlayGradientBg: value } ) }
						onColorChange={ (value) => setAttributes( { overlaySolidBg: value })}
					/>
				</PanelBody>
				<PanelBody>
					<TextControl
						label={ __( 'Button text', 'easy-popup-block' ) }
						onChange={ ( value ) => setAttributes( { buttonText: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div className="epb-popup">
				<div className="epb-popup-preview">
					<Button
						variant="primary"
						onClick={togglePreview}
						{ ...useBlockProps() }
					>
						{ buttonText ? buttonText : __('Show Popup', 'easy-popup-block') }
					</Button>
				</div>
				{previewing && (
					<div className="epb-modal-wrapper" data-position={ position }>
						{sanitizedCustomCss && (
							<style>{sanitizedCustomCss}</style>
						)}
						<div
							style={overlayStyle}
							role="presentation"
							className="epb-modal-overlay"
							onClick={togglePreview}
						/>
						<ResizableBox
							minHeight="50"
							minWidth="50"
							enable={ {
								top: true,
								right: true,
								bottom: true,
								left: true,
								topRight: false,
								bottomRight: false,
								bottomLeft: false,
								topLeft: false,
							} }
							showHandle={ true }
							onResizeStop={ ( event, direction, elt, delta ) => {
								setAttributes( {
									height: `${parseInt(height) + delta.height}px`,
									width: `${parseInt(width) + delta.width}px`,
								} );
								toggleSelection( true );
							} }
							onResizeStart={ () => {
								toggleSelection( false );
							} }
						>
						<div className="epb-modal-content" style={modalStyle}>
							{isCloseBtnVisible && (
								<button
									className="epb-popup-close-btn"
									style={closeBtnStyle}
									onClick={togglePreview}
									data-closebtn-variant={ closeBtnVariant }
								>
									<span>✕</span>
								</button>
							)}
							<div className="epb-modal-body">
								<InnerBlocks />
							</div>
						</div>
						</ResizableBox>
					</div>
				)}
			</div>
		</>
	);
}

const ModalSizeControls = ({ label = '', size = { width: '400px', height: '400px'}, onChange = ( newSize ) => { newSize } } ) => {
	const defaultValues = { width: '400px', height: '400px' };

    return (
        <BaseControl label={ label } __nextHasNoMarginBottom={ true } className='epb-easy-popup-block-size-controls'>
			<PanelRow>
				<BoxControl
					label={ __( 'Width', 'easy-popup-block' ) }
					values={ { left: size.width, right: size.width } }
					onChange={ ( values ) => onChange( { ...size, width: values.left } ) }
					sides={ [ 'horizontal' ] }
					defaultValues={ { left: defaultValues.width, right: defaultValues.width } }
					splitOnAxis={ false }
				/>
				<BoxControl
					label={ __( 'Height', 'easy-popup-block' ) }
					values={ { top: size.height, bottom: size.height } }
					onChange={ ( values ) => onChange( { ...size, height: values.top } ) }
					sides={ [ 'vertical' ] }
					defaultValues={ { top: defaultValues.height, bottom: defaultValues.height } }
					splitOnAxis={ false }
				/>
			</PanelRow>
        </BaseControl>
    );
};
