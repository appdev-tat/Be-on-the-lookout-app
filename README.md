# Busing on the Lookout (BOTL) mobile app

This mobile app helps to combat human trafficking in the busing industry.

Features:
* A reference of how to recognize signs of trafficking
* Quick links to call or email the national human trafficking hotline, to report instances of trafficking
* Educational resources: videos, news stories, books, documentaries, etc

This app is built with Ionic (which uses Angular) and packaged as a native app using Cordova.

## Quickstart

`npm install` and `npm start` to run the app in the browser. Some features will not work in the browser.

## Updating external resources

The app fetches a few things from a server during runtime, such as translation files. These are kept in the `external/`. After making updates and incrementing the app's version number, run `npm run build-external` and copy the resources from `external/dist/` to the proxy server.

## Services

### Firebase

The app uses Firebase for:

* storing URLs of videos and some images, so these can be updated without pushing an app update

## Helpful tools

[i18n-editor](https://github.com/jcbvm/i18n-editor) - Use this to manage translations

## Building and deploying

The app cannot be built with PhoneGap, as it uses plugins that PhoneGap does not support. So, you must install the relevant SDKs and run cordova commands to build the app.
