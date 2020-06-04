### How to prepare environment for development?

##### Prepare Working environment

1. Clone repo to your working directory
2. In the root of working directory execute `npx @applicaster/zapplicaster-cli init` from terminal
3. Finish CLI initialization completed requested data from the script

##### Prepare application

1. In the root directory execute `yarn prepare_app -a ZAPP_APPLICATION_ID -b` from terminal
2. Run `yarn start` to start local server
prepare_app script will prepare local environmment for plugins that exists in `plugins` folder.
Also it will prepare the directory for a builder of the selected platform
Note: please check `package.json` file in `scripts` section for possible command line options

##### Start iOS

Build application from XCode in the directory that was provided during cli initialization

##### Start Android

1. Start Android Simulator
2. Call `./gradlew installMobileGoogleDebug -PREACT_NATIVE_PACKAGER_ROOT=localhost:8081` in the Android builder folder to build and attach application to simulator
3. Call `adb reverse tcp:8081 tcp:8081` to connect local server
4. Call `adb shell input keyevent 82` when application is running to show RN debug dialog
3. CLI script will ask configuration options and set up the environment
