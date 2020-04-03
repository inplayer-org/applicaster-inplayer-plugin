const baseManifest = {
  api: {},
  dependency_repository_url: [],
  dependency_name: "@applicaster/dev-demo-login",
  author_name: "Applicaster",
  author_email: "zapp@applicaster.com",
  name: "dev_demo_login",
  description: "Quick Brick Developers Demo login plugin",
  type: "general",
  screen: true,
  react_native: true,
  identifier: "dev_demo_login",
  ui_builder_support: true,
  whitelisted_account_ids: ["5e132c906663330008c0f8ab"],
  min_zapp_sdk: "0.0.1",
  deprecated_since_zapp_sdk: "",
  unsupported_since_zapp_sdk: "",
  preload: true,
  general: {
    fields: [
      {
        type: "switch",
        key: "is_flow_blocker",
        tooltip_text: "Define if hook will block flow in case cancelation",
        initial_value: false
      },
      {
        type: "switch",
        key: "allow_screen_plugin_presentation",
        tooltip_text: "Define if",
        initial_value: false
      }
    ]
  },
  custom_configuration_fields: [],
  targets: ["mobile"],
  ui_frameworks: ["quickbrick"]
};

function createManifest({ version, platform }) {
  const manifest = {
    ...baseManifest,
    platform,
    dependency_version: version,
    manifest_version: version
  };

  return manifest;
}

module.exports = createManifest;
