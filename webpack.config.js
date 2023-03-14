const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const BannerPlugin = require( 'banner-plugin');
const VersionAutoPatchPlugin = require( 'version-auto-patch' );
const isProduction = process.env.NODE_ENV === 'production';

const customConfig = {
	...defaultConfig,
	plugins: [
		...defaultConfig.plugins,
		new BannerPlugin( { disabled: ! isProduction } ),
		new VersionAutoPatchPlugin({
			disabled: true,	//TODO: disabled for now: copy-webpack-plugin configuration issue causes an infinite loop.
			type: 'build'
		}),
	]
};

module.exports = customConfig;
