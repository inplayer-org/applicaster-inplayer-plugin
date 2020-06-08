const baseManifest = {
  dependency_name: "@applicaster/quick-brick-jw-player",
  author_name: "Applicaster",
  author_email: "zapp@applicaster.com",
  name: "JWPlayer QuickBrick",
  description: "Quick Brick JW Player plugin",
  type: "player",
  react_native: true,
  identifier: "quick-brick-jw-player",
  ui_builder_support: true,
  whitelisted_account_ids: ["5c9ce7917b225c000f02dfbc"],
  deprecated_since_zapp_sdk: "",
  unsupported_since_zapp_sdk: "",
  targets: ["mobile"],
  ui_frameworks: ["quickbrick"],
};

function createManifest({ version, platform }) {
  const basePlatform = platform.includes(ios) ? "ios" : "android";

  const manifest = {
    ...baseManifest,

    platform,
    dependency_version: version,
    manifest_version: version,
    api: api[basePlatform],
    npm_dependencies: npm_dependencies[basePlatform],
    dependency_repository_url: dependency_repository_url[basePlatform],
    min_zapp_sdk: min_zapp_sdk[platform],
    extra_dependencies: extra_dependencies[basePlatform],
    project_dependencies: project_dependencies[basePlatform],
    custom_configuration_fields: custom_configuration_fields[basePlatform],
  };

  return manifest;
}
const api = {
  ios: {},
  tvos: {},
  android: {
    class_name: "com.appgoalz.rnjwplayer.RNJWPlayerPackage",
    react_packages: ["com.appgoalz.rnjwplayer.RNJWPlayerPackage"],
    proguard_rules: "-keep public class com.appgoalz.rnjwplayer.** {*;}",
  },
};

const min_zapp_sdk = {
  tvos: "12.2.0-Dev",
  ios: "20.2.0-Dev",
  android: "20.0.0",
  ios_for_quickbrick: "0.1.0-alpha1",
  android_for_quickbrick: "0.1.0-alpha1",
};

const dependency_repository_url = {
  ios: [],
  tvos: [],
  android: [
    {
      url: "https://mvn.jwplayer.com/content/repositories/releases/",
    },
  ],
};
const project_dependencies = {
  ios: [],
  tvos: [],
  android: [
    {
      "jw-media-player":
        "node_modules/react-native-jw-media-player-applicaster/android",
    },
  ],
};

const npm_dependencies = {
  ios: ["react-native-jw-media-player-applicaster@0.0.6"],
  tvos: ["react-native-jw-media-player-applicaster@0.0.6"],
  android: [
    "react-native-jw-media-player-applicaster@0.0.6",
    "@applicaster/quick-brick-jw-player@0.0.14",
  ],
};

const custom_configuration_fields = {
  ios: [
    {
      type: "text",
      key: "plist.JWPlayerKey",
      tooltip_text: "JWPlayerKey tvos licence key",
      default: "",
    },
  ],
  tvos: [
    {
      type: "text",
      key: "plist.JWPlayerKey",
      tooltip_text: "JWPlayerKey ios licence key",
      default: "",
    },
  ],
  android: [
    {
      type: "text",
      key: "jw_player_android_key",
      tooltip_text: "JWPlayerKey android licence key",
      default: "",
    },
  ],
};
const extra_dependencies = {
  ios: [
    {
      "JWPlayer-SDK": "'= 3.12.0'",
    },
    {
      "react-native-jw-media-player-applicaster":
        ":path => 'node_modules/react-native-jw-media-player-applicaster/ios/react-native-jw-media-player-applicaster.podspec'",
    },
  ],
};
module.exports = createManifest;
