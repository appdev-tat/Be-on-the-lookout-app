# Truckers Against Trafficking mobile app

An app for Truckers Against Trafficking, built with [PhoneGap](http://phonegap.com/) and [Ionic](http://ionicframework.com/).

PhoneGap apps are essentially just websites that run as a native app, so all you need is a little web design knowhow.

## Developing instructions

### Setting up a dev environment

##### Step 1

Use git (either the [command line utility](https://git-scm.com/) or the [github desktop app](https://desktop.github.com/)) to clone the repo to a directory of your choice.

If you use the command line utility:

```sh
$ cd some/directory/
$ git clone https://github.com/appdev-tat/TAT-app.git
```

##### Step 2

Download the PhoneGap desktop app and the PhoneGap developer app for mobile devices. See the [PhoneGap](http://phonegap.com/) website for details.

##### Step 3

Run the PhoneGap desktop app and open the TAT-app project folder. Click the `>` button to start the server.

##### Step 4

Click the IP address at the bottom of the PhoneGap desktop app. This opens up a browser window to display the app. When you make changes to the project files, the browser should automatically refresh to show the changes.

You can also preview the app on a mobile device by running the PhoneGap mobile app. Enter the IP address shown on the desktop app when prompted. Just like the browser on your computer, your mobile device should automatically refresh in response to changes in the project files.

##### Step 5, optional advanced dev environment

Install [Node.js](https://nodejs.org/en/).

In a terminal or command console, navigate to the repo directory and run:

```sh
$ npm install -g phonegap
$ npm install -g ionic
$ npm install
```

Both the phonegap and ionic command line tools have rather nifty features. Ionic has a tool to let you see what the app looks like on both iOS and Android simultaneously. In a console, in the project directory, run:

```sh
$ ionic serve --lab
```

### Project layout

For simple edits, you only need to worry about the files here:

```sh
[project-dir]/www/templates/
```

Each file in that directory represents a different "page" in the app, with the exception of `tabs.html`.

Be aware that apps made with Ionic also use the [Angular framework](https://angularjs.org/).

##### Notes for beginners

Edit the files using any text editor, for example, Notepad. If you want to use something much better, install [Visual Studio Code](https://code.visualstudio.com).

Here's a basic [HTML tutorial](http://www.w3schools.com/html/). Some of it does not apply to this app. For anything beyond what the tutorial covers, get assistance from a web developer.

### Building the app

When you're happy with the changes you've made to the app, increment the version number in config.xml (each update in the app store must use a different version number) and use git to commit to the master branch and push your changes to github.

Then merge the `master` branch into the `master-ios` branch. As of this writing, the only difference between the two repos is the `config.xml` file. The master branch is used for Android deployments and the master-ios branch is used for iOS deployments.

Log into [PhoneGap Build](https://build.phonegap.com/) with the username `appdev@truckersagainsttrafficking.org` and check the settings of the app (https://build.phonegap.com/apps/2498603/settings) to ensure that you're building from the branch that corresponds to the platform you wish to build for. In order to build an .ipa for testing or for release, or to build an .apk for release, you will need to unlock and use a "key".

For iOS:
* For testing: use the "Basic app ad hoc" key.
* For release to the app store: use the "Basic app distribution" key.

For Android:
* For release to the Google Play store: use the "Android app release" key.

The keys require a password in order to unlock and use. If you know the credentials for the "appdev" gmail account, then you can probably guess the password to unlock the iOS keys. For the password which unlocks the Android key, contact the Sheridan Programmers Guild.

If these keys do not exist, or if you need to add additional approved devices to the provisioning profile for the iOS ad-hoc key, you will need to re-create the keys. Keys can be created at the [Edit Account screen](https://build.phonegap.com/people/edit). You will need access to the .p12 certificate files in order to do this. See Google Drive for the `appdev@truckersagainsttrafficking` account for details.

#### Testing the app on Android

After building the app, scan the QR code on the PhoneGap webpage.

#### Testing the app on iOS

After building the app using the ad hoc key, you may be able to just scan the QR code using a device which is approved in the provisioning profile. If this doesn't work, download the .ipa and go to [Diawi](https://www.diawi.com/) and follow the instructions.


## Other things to note

I think Ionic has a built-in way to generate all the necessary icon sizes automatically, but I used [http://pgicons.abiro.com/](http://pgicons.abiro.com/). If you need to make changes to the app icon, use this tool to generate files that match the filenames of the current icons.

When you deploy changes, you should merge those changes into the `master-ios` branch as well. The only difference between `master` and `master-ios` should be the `config.xml` file.

App icon from https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Bus_stop_symbol.svg/2000px-Bus_stop_symbol.svg.png