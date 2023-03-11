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
			disabled: isProduction,
			type: 'build'
		})
	]
};

module.exports = customConfig;
