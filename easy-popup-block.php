<?php
/**
 * Plugin Name:       Easy customizable popup block
 * Description:       Create easily customizable popups for WordPress pages.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Ville Perkkio
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       easy-popup-block
 *
 * @package           epb
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 */
function epb_easy_popup_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'epb_easy_popup_block_init' );
