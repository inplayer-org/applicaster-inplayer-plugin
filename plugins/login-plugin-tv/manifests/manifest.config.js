const baseManifest = {
  dependency_repository_url: [],
  dependency_name: "@applicaster/quick-brick-inplayer-tv",
  author_name: "Olga Duk",
  author_email: "oduk@scand.com",
  name: "inPlayer Hook Plugin for TV",
  description: "InPlayer Hook Plugin for TV",
  type: "login",
  screen: true,
  react_native: true,
  identifier: "quick-brick-inplayer-tv",
  ui_builder_support: true,
  whitelisted_account_ids: ["5c9ce7917b225c000f02dfbc"],
  deprecated_since_zapp_sdk: "",
  unsupported_since_zapp_sdk: "",
  preload: true,
  npm_dependencies: [
    "@inplayer-org/inplayer.js@2.13.3",
    "@react-native-community/async-storage@1.9.0",
    "@react-native-community/blur@3.4.1",
  ],
  general: {
    fields: [
      {
        group: true,
        label: "Screen Design and Text",
        tooltip: "These fields affect the design of the main screen plugin.",
        folded: true,
        fields: [
          {
            key: "login_title_text",
            type: "text_input",
            label: "Login Title Text",
            label_tooltip:
              "Main text at the right of the screen. Preferably use to depict the name of the app or welcome the user.",
            initial_value: "Welcome To The App",
            placeholder: "Welcome To The App",
          },
          {
            key: "login_title_font_tvos",
            type: "tvos_font_selector",
            label_tooltip: "Font for Login Title Text for TvOS.",
            initial_value: "Helvetica-Bold",
          },
          {
            key: "login_title_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for Login Title Text for Android TV.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "login_title_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Login Title Text.",
            initial_value: "60",
          },
          {
            key: "login_title_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Login Title Text.",
            initial_value: "#545A5C",
          },
          {
            key: "main_description_text",
            type: "text_input",
            label: "Main Description Text",
            label_tooltip:
              "This text can be used to give a brief introduction to the product.",
            initial_value:
              "Helping companies maximize any cloud infrastructure, reduce costs, increase engagement, and significantly improve time to market and speed of ongoing innovation.",
            placeholder:
              "Helping companies maximize any cloud infrastructure, reduce costs, increase engagement, and significantly improve time to market and speed of ongoing innovation.",
          },
          {
            key: "main_description_font_tvos",
            type: "tvos_font_selector",
            label_tooltip: "Font for Main Description Text for TvOS.",
            initial_value: "Helvetica-Bold",
          },
          {
            key: "main_description_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for Main Description Text for Android TV.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "main_description_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Main Description Text.",
            initial_value: "38",
          },
          {
            key: "main_description_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Main Description Text.",
            initial_value: "#545A5C",
          },
          {
            key: "optional_instructions_1_text",
            type: "text_input",
            label: "Optional Instructions 1 Text",
            label_tooltip:
              "This text can be used to add information relevant to the user(Support/Terms of use/links).",
            initial_value: "Optional Instructions",
            placeholder: "Optional Instructions",
          },
          {
            key: "optional_instructions_1_font_tvos",
            type: "tvos_font_selector",
            label_tooltip: "Font for Optional Instructions 1 Text for TvOS.",
            initial_value: "Helvetica-Bold",
          },
          {
            key: "optional_instructions_1_font_android",
            type: "android_font_selector",
            label_tooltip:
              "Font for Optional Instructions 1 Text for Android TV.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "optional_instructions_1_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Optional Instructions 1 Text.",
            initial_value: "26",
          },
          {
            key: "optional_instructions_1_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Optional Instructions 1 Text.",
            initial_value: "#545A5C",
          },
          {
            key: "optional_instructions_2_text",
            type: "text_input",
            label: "Optional Instructions 2 Text",
            label_tooltip:
              "This text can be used to add information relevant to the user(Support/Terms of use/links).",
            initial_value: "Optional Instructions",
            placeholder: "Optional Instructions",
          },
          {
            key: "optional_instructions_2_font_tvos",
            type: "tvos_font_selector",
            label_tooltip: "Font for Optional Instructions 2 Text for TvOS.",
            initial_value: "Helvetica-Bold",
          },
          {
            key: "optional_instructions_2_font_android",
            type: "android_font_selector",
            label_tooltip:
              "Font for Optional Instructions 2 Text for Android TV.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "optional_instructions_2_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Optional Instructions 2 Text.",
            initial_value: "26",
          },
          {
            key: "optional_instructions_2_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Optional Instructions 2 Text.",
            initial_value: "#545A5C",
          },
          {
            key: "use_dark_keyboard",
            type: "switch",
            label: "Use Dark Keyboard",
            label_tooltip: "Enables the dark keyboard appearance.",
            initial_value: "false",
          },
          {
            key: "email_input_background",
            type: "color_picker_rgba",
            label: "Email Input Background Color",
            label_tooltip: "Background Color for the Email Input.",
            initial_value: "rgba(39, 218, 134, 1)",
          },
          {
            key: "email_input_placeholder",
            type: "text_input",
            label: "Email Input placeholder",
            label_tooltip: "Placeholder to show for the Email Input Field.",
            initial_value: "Email",
            placeholder: "Email",
          },
          {
            key: "email_input_font_tvos",
            type: "tvos_font_selector",
            label_tooltip: "Font for Email Input Text for TvOS.",
            initial_value: "Helvetica-Bold",
          },
          {
            key: "email_input_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for Email Input Text for Android TV.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "email_input_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Email Input Field.",
            initial_value: "30",
          },
          {
            key: "email_input_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Email Input Field.",
            initial_value: "#9B9B9B",
          },
          {
            key: "password_input_background",
            type: "color_picker_rgba",
            label: "Password Input Background Color",
            label_tooltip: "Background Color for the Password Input.",
            initial_value: "rgba(39, 218, 134, 1)",
          },
          {
            key: "password_input_placeholder",
            type: "text_input",
            label: "Password Input placeholder",
            label_tooltip: "Placeholder to show for the Password Input Field.",
            initial_value: "Password",
            placeholder: "Password",
          },
          {
            key: "password_input_font_tvos",
            type: "tvos_font_selector",
            label_tooltip: "Font for Password Input Text for TvOS.",
            initial_value: "Helvetica-Bold",
          },
          {
            key: "password_input_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for Password Input Text for Android TV.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "password_input_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Password Input Field.",
            initial_value: "30",
          },
          {
            key: "password_input_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Password Input Field.",
            initial_value: "#9B9B9B",
          },
          {
            key: "login_action_button_background",
            type: "color_picker_rgba",
            label: "Login Action Button Background Color",
            label_tooltip: "Background Color for the Login Action Button.",
            initial_value: "rgba(39, 218, 134, 1)",
          },
          {
            key: "login_action_button_text",
            type: "text_input",
            label: "Login Action Button Text",
            label_tooltip: "Text for the Login Button.",
            initial_value: "Log In",
            placeholder: "Log In",
          },
          {
            key: "login_action_button_font_tvos",
            type: "tvos_font_selector",
            label_tooltip: "Font for Login Action Button Text for TvOS.",
            initial_value: "Helvetica-Bold",
          },
          {
            key: "login_action_button_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for Login Action Button Text for Android TV.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "login_action_button_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Login Action Button Text.",
            initial_value: "40",
          },
          {
            key: "login_action_button_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Login Action Button Text.",
            initial_value: "#545A5C",
          },
          {
            key: "enable_skip_functionality",
            type: "switch",
            label: "Enable Skip Functionality",
            label_tooltip:
              "Enables the ability to skip the login by using the back button or activating the skip button in the UI.",
            initial_value: "true",
          },
          {
            key: "skip_action_button_background",
            type: "color_picker_rgba",
            label: "Skip Action Button Background Color",
            label_tooltip: "Background Color for the Skip Action Button.",
            initial_value: "rgba(39, 218, 134, 1)",
            conditional_fields: [
              {
                condition_value: [true],
                key: "general/enable_skip_functionality",
              },
            ],
          },
          {
            key: "skip_action_button_text",
            type: "text_input",
            label: "Skip Action Button Text",
            label_tooltip: "Text for the Skip Button.",
            initial_value: "Skip",
            placeholder: "Skip",
            conditional_fields: [
              {
                condition_value: [true],
                key: "general/enable_skip_functionality",
              },
            ],
          },
          {
            key: "skip_action_button_font_tvos",
            type: "tvos_font_selector",
            label_tooltip: "Font for Skip Action Button Text for TvOS.",
            initial_value: "Helvetica-Bold",
            conditional_fields: [
              {
                condition_value: [true],
                key: "general/enable_skip_functionality",
              },
            ],
          },
          {
            key: "skip_action_button_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for Skip Action Button Text for Android TV.",
            initial_value: "Roboto-Bold",
            conditional_fields: [
              {
                condition_value: [true],
                key: "general/enable_skip_functionality",
              },
            ],
          },
          {
            key: "skip_action_button_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Skip Action Button Text.",
            initial_value: "40",
            conditional_fields: [
              {
                condition_value: [true],
                key: "general/enable_skip_functionality",
              },
            ],
          },
          {
            key: "skip_action_button_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Skip Action Button Text.",
            initial_value: "#545A5C",
            conditional_fields: [
              {
                condition_value: [true],
                key: "general/enable_skip_functionality",
              },
            ],
          },
        ],
      },
      {
        group: true,
        label: "Confirmation Screen Design and Text",
        tooltip:
          "These fields affect the design of plugin confirmation screen.",
        folded: true,
        fields: [
          {
            key: "confirmation_message_text",
            type: "text_input",
            label: "Confirmation Message Text",
            label_tooltip: "Text for the Confirmation message.",
            initial_value: "Are you sure you want to logout?",
            placeholder: "Are you sure you want to logout?",
          },
          {
            key: "confirmation_message_font_tvos",
            type: "tvos_font_selector",
            label_tooltip: "Font for Confirmation Text for TvOS.",
            initial_value: "Helvetica-Bold",
          },
          {
            key: "confirmation_message_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for Confirmation Text for Android TV.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "confirmation_message_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for confirmation text.",
            initial_value: "41",
          },
          {
            key: "confirmation_message_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for confirmation text.",
            initial_value: "#FFFFFF",
          },
          {
            key: "confirm_action_button_background",
            type: "color_picker_rgba",
            label: "Confirm Action Button Background Color",
            label_tooltip: "Background Color for the Confirm Action Button.",
            initial_value: "rgba(39, 218, 134, 1)",
          },
          {
            key: "confirm_action_button_text",
            type: "text_input",
            label: "Confirm Action Button Text",
            label_tooltip: "Text for the Confirm Button.",
            initial_value: "Yes",
            placeholder: "Yes",
          },
          {
            key: "confirm_action_button_font_tvos",
            type: "tvos_font_selector",
            label_tooltip: "Font for Confirm Button for TvOS.",
            initial_value: "Helvetica-Bold",
          },
          {
            key: "confirm_action_button_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for Confirm Button for Android TV.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "confirm_action_button_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Confirm Action Button Text.",
            initial_value: "40",
          },
          {
            key: "confirm_action_button_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Confirm Action Button Text.",
            initial_value: "#545A5C",
          },
          {
            key: "cancel_action_button_background",
            type: "color_picker_rgba",
            label: "Cancel Action Button Background Color",
            label_tooltip: "Background Color for the Cancel Action Button.",
            initial_value: "rgba(39, 218, 134, 1)",
          },
          {
            key: "cancel_action_button_text",
            type: "text_input",
            label: "Cancel Action Button Text",
            label_tooltip: "Text for the Cancel Button.",
            initial_value: "Cancel",
            placeholder: "Cancel",
          },
          {
            key: "cancel_action_button_font_tvos",
            type: "tvos_font_selector",
            label_tooltip: "Font for Cancel Button for TvOS.",
            initial_value: "Helvetica-Bold",
          },
          {
            key: "cancel_action_button_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for Cancel Button for Android TV.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "cancel_action_button_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Cancel Action Button Text.",
            initial_value: "40",
          },
          {
            key: "cancel_action_button_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Cancel Action Button Text.",
            initial_value: "#545A5C",
          },
        ],
      },
      {
        group: true,
        label: "Alert Design and Text",
        tooltip: "These fields affect the design of plugin alert component.",
        folded: true,
        fields: [
          {
            key: "video_stream_exception_message",
            type: "text_input",
            label: "Message in case video url is empty",
            initial_value:
              "Video stream in not available. Please try again later",
          },
          {
            key: "general_error_message",
            type: "text_input",
            label: "General error message",
            tooltip:
              "A default error message that is shown in case something goes wrong in the flow",
            initial_value: "Something went wrong. Please try again later",
          },
          {
            key: "error_description_font_tvos",
            type: "tvos_font_selector",
            label_tooltip: "Font for Description Text for TvOS.",
            initial_value: "Helvetica",
          },
          {
            key: "error_description_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for Description Text for Android TV.",
            initial_value: "Roboto-Regular",
          },
          {
            key: "error_description_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Description Text.",
            initial_value: "36",
          },
          {
            key: "error_description_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Description Text.",
            initial_value: "rgba(84, 90, 92, 1)",
          },
          {
            key: "close_action_button_background",
            type: "color_picker_rgba",
            label: "Alert “OK” Action Button Background Color",
            label_tooltip:
              "Background Color for the Alert “OK” Action Button. Will be used if no assets found.",
            initial_value: "rgba(39, 218, 134, 1)",
          },
          {
            key: "close_action_button_text",
            type: "text_input",
            label: "Alert “OK” Action Button Text",
            label_tooltip:
              "Text for “OK” Action button on the error overlay screen.",
            initial_value: "Ok",
            placeholder: "Ok",
          },
          {
            key: "close_action_button_font_tvos",
            type: "tvos_font_selector",
            label_tooltip: "Font for “OK” Action button Text for TvOS.",
            initial_value: "Helvetica",
          },
          {
            key: "close_action_button_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for “OK” Action button Text for Android TV.",
            initial_value: "Roboto-Regular",
          },
          {
            key: "close_action_button_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Alert “OK” Action Button Text.",
            initial_value: "41",
          },
          {
            key: "close_action_button_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Alert “OK” Action Button Text.",
            initial_value: "rgba(84, 90, 92, 1)",
          },
        ],
      },
    ],
  },
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
    {
      type: "tag_select",
      key: "in_player_environment",
      tooltip_text: "InPlayer working environment",
      options: [
        {
          text: "Development",
          value: "develop",
        },
        {
          text: "Production",
          value: "prod",
        },
      ],
      initial_value: "prod",
    },
    {
      type: "text",
      key: "consumable_type_mapper",
      tooltip_text: "Mapping key for consumable purchase",
      default: "consumable",
    },
    {
      type: "text",
      key: "non_consumable_type_mapper",
      tooltip_text: "Mapping key for non consumable purchase",
      default: "ppv",
    },
    {
      type: "text",
      key: "subscription_type_mapper",
      tooltip_text: "Mapping key for subscription purchase",
      default: "subscription",
    },
  ],
  targets: ["tv"],
  ui_frameworks: ["quickbrick"],
};

const getAssetsField = (isTvos) => ({
  key: isTvos ? "ios_assets_bundle" : "android_assets_bundle",
  type: "uploader",
  label: `${isTvos ? "tvOS" : "Android TV"} Design Assets`,
  label_tooltip:
    "Please upload a zip file to provide the design assets for this plugin. For guidance and proper naming of the assets, please refer to this <a href='https://assets-production.applicaster.com.s3.amazonaws.com/applicaster-employees/marketplace/OPT/Login%20Plugin%20-%20Designer%20Documentation.sketch'>resource</a>.",
});

function createManifest({ version, platform }) {
  const isTvos = platform.includes("tvos");
  const basePlatform = isTvos
    ? "tvos_for_quickbrick"
    : "android_tv_for_quickbrick";

  const assetsField = getAssetsField(isTvos);

  const baseManifestCopy = JSON.parse(JSON.stringify(baseManifest));
  baseManifestCopy.custom_configuration_fields.push(assetsField);

  const manifest = {
    ...baseManifestCopy,
    platform,
    dependency_version: version,
    manifest_version: version,
    api: api[basePlatform],
    project_dependencies: project_dependencies[basePlatform],
    extra_dependencies: extra_dependencies[basePlatform],
    min_zapp_sdk: min_zapp_sdk[platform],
  };

  return manifest;
}

const api = {
  tvos_for_quickbrick: {},
  android_tv_for_quickbrick: {
    class_name: "com.reactnativecommunity.asyncstorage.AsyncStoragePackage",
    react_packages: [
      "com.reactnativecommunity.asyncstorage.AsyncStoragePackage",
      "com.cmcewen.blurview.BlurViewPackage",
    ],
    proguard_rules:
      "-keep public class com.reactnativecommunity.asyncstorage.** {*;}",
  },
};

const project_dependencies = {
  tvos_for_quickbrick: [],
  android_tv_for_quickbrick: [
    {
      "react-native-community_async-storage":
        "node_modules/@react-native-community/async-storage/android",
    },
    {
      "react-native-community_blur":
        "node_modules/@react-native-community/blur/android",
    },
  ],
};

const extra_dependencies = {
  tvos_for_quickbrick: [
    {
      RNCAsyncStorage:
        ":path => 'node_modules/@react-native-community/async-storage/RNCAsyncStorage.podspec'",
    },
    {
      "react-native-blur":
        ":path => 'node_modules/@react-native-community/blur/react-native-blur.podspec'",
    },
  ],
  android_tv_for_quickbrick: [],
};
const min_zapp_sdk = {
  tvos_for_quickbrick: "0.1.0-alpha1",
  android_tv_for_quickbrick: "0.1.0-alpha1",
};

module.exports = createManifest;