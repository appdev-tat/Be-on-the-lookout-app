const fse = require( 'fs-extra' );

// remove old external dist directory
fse.removeSync( 'external/dist' );

// create external i18n directory
const i18nDir = 'external/dist/i18n';
fse.ensureDirSync( i18nDir );

// copy i18n files to external i18n directory
fse.copySync( 'src/assets/i18n', i18nDir );

// copy the version number from package.json
const version = fse.readJSONSync( 'package.json' ).version;
fse.writeFileSync( 'external/dist/version', '"' + version + '"' );
