const baseManifest = {
  api: {},
  dependency_repository_url: [],
  dependency_name: "@applicaster/quick-brick-inplayer",
  author_name: "Applicaster",
  author_email: "zapp@applicaster.com",
  name: "inPlayer Hook Plugin",
  description: "InPlayer Hook Plugin",
  type: "general",
  screen: true,
  react_native: true,
  identifier: "quick-brick-inplayer",
  ui_builder_support: true,
  whitelisted_account_ids: ["5c9ce7917b225c000f02dfbc"],
  min_zapp_sdk: "20.2.0-Dev",
  deprecated_since_zapp_sdk: "",
  unsupported_since_zapp_sdk: "",
  preload: true,
  extra_dependencies: [
    {
      InPlayerLogin:
        ":path => './quick_brick/node_modules/@applicaster/quick-brick-inplayer/InPlayerLogin.podspec'",
    },
    {
      ApplicasterIAP:
        ":path => 'node_modules/@applicaster/applicaster-iap/iOS/ApplicasterIAP.podspec'",
    },
  ],
  npm_dependencies: [
    "react-native-dropdownalert@4.2.1",
    "@applicaster/applicaster-iap@0.1.4",
  ],
  custom_configuration_fields: [
    {
      type: "text",
      key: "in_player_client_id",
      tooltip_text: "In Player Client ID",
      default: "",
    },
    {
      type: "text",
      key: "in_player_referrer",
      tooltip_text: "In Player Referrer URL",
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
    api: api[platform],
    project_dependencies: project_dependencies[platform],
    min_zapp_sdk: min_zapp_sdk[platform],
  };

  return manifest;
}

const api = {
  ios: {},
  android: {
    require_startup_execution: false,
    class_name: "com.applicaster.reactnative.plugins.APReactNativeAdapter",
    react_packages: [
      "com.applicaster.quickbrickinplayer.reactnative.InPlayerPackage",
    ],
  },
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
const min_zapp_sdk = {
  ios: "20.2.0-Dev",
  android: "20.0.0",
};

module.exports = createManifest;
