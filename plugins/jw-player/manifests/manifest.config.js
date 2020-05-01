// TODO: update manifest values

const baseManifest = {
  api: {},
  dependency_repository_url: [],
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
  npm_dependencies: ["react-native-jw-media-player-applicaster@0.0.2"],
  custom_configuration_fields: [
    {
      type: "text",
      key: "plist.JWPlayerKey",
      tooltip_text: "JWPlayerKey Key",
      default: "",
    },
  ],
  targets: ["mobile"],
  ui_frameworks: ["quickbrick"],
};

function createManifest({ version, platform }) {
  const manifest = {
    ...baseManifest,
    platform,
    dependency_version: version,
    manifest_version: version,
    min_zapp_sdk: min_zapp_sdk[platform],
    extra_dependencies: extra_dependencies[platform],
  };

  return manifest;
}

const min_zapp_sdk = {
  tvos: "12.2.0-Dev",
  ios: "20.2.0-Dev",
  android: "20.0.0",
};

const project_dependencies = {
  ios: [],
  android: [
    {
      InPlayerLogin:
        "./quick_brick/node_modules/@applicaster/quick-brick-inplayer/android",
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
