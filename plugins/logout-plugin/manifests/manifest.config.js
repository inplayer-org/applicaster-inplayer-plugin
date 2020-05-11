const baseManifest = {
  api: {},
  dependency_repository_url: [],
  dependency_name: "@applicaster/quick-brick-inplayer-logout",
  author_name: "Applicaster",
  author_email: "zapp@applicaster.com",
  name: "inPlayer Hook Plugin Logout QuickBrick",
  description: "InPlayer Hook Plugin Logout",
  type: "general",
  screen: true,
  react_native: true,
  identifier: "quick-brick-inplayer-logout",
  ui_builder_support: true,
  whitelisted_account_ids: ["5c9ce7917b225c000f02dfbc"],
  deprecated_since_zapp_sdk: "",
  unsupported_since_zapp_sdk: "",
  npm_dependencies: [
    "@applicaster/quick-brick-inplayer",
    "@react-native-community/async-storage@1.9.0",
  ],
  preload: true,
  custom_configuration_fields: [],
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
  };

  return manifest;
}

const min_zapp_sdk = {
  ios: "20.2.0-Dev",
  android: "20.0.0",
};
module.exports = createManifest;
