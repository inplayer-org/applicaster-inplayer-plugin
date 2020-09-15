const baseManifest = {
  dependency_repository_url: [],
  dependency_name: "@applicaster/quick-brick-inplayer",
  author_name: "Applicaster",
  author_email: "zapp@applicaster.com",
  name: "inPlayer Hook Plugin",
  description: "InPlayer Hook Plugin",
  type: "login",
  screen: true,
  react_native: true,
  identifier: "quick-brick-inplayer",
  ui_builder_support: true,
  whitelisted_account_ids: ["5c9ce7917b225c000f02dfbc"],
  deprecated_since_zapp_sdk: "",
  unsupported_since_zapp_sdk: "",
  preload: true,
  npm_dependencies: [
    "@inplayer-org/inplayer.js@2.13.3",
    "react-native-dropdownalert@4.2.1",
    "@applicaster/applicaster-iap@0.2.14",
    "@react-native-community/async-storage@1.9.0",
    "react-native-actionsheet@2.4.0",
    "react-native-keyboard-aware-scroll-view@0.9.1",
  ],
  styles: {
    fields: [
      {
        key: "background_color",
        type: "color_picker",
        label: "Background font color",
        initial_value: "#161b29ff",
      },
      {
        key: "title_font_ios",
        type: "ios_font_selector",
        label: "iOS title font",
        initial_value: "Roboto-Bold",
      },
      {
        key: "title_font_android",
        type: "android_font_selector",
        label: "Android title font",
        initial_value: "Roboto-Bold",
      },
      {
        key: "title_font_size",
        type: "number_input",
        label: "Title font size",
        initial_value: 15,
      },
      {
        key: "title_font_color",
        type: "color_picker",
        label: "Title font color",
        initial_value: "#ffffffff",
      },
      {
        key: "title_font_text",
        type: "text_input",
        label: "Text title",
        initial_value: "InPlayer",
      },
      {
        key: "back_button_font_ios",
        type: "ios_font_selector",
        label: "iOS back button font",
        initial_value: "Roboto-Bold",
      },
      {
        key: "back_button_font_android",
        type: "android_font_selector",
        label: "Android back button font",
        initial_value: "Roboto-Bold",
      },
      {
        key: "back_button_font_size",
        type: "number_input",
        label: "Back button font size",
        initial_value: 15,
      },
      {
        key: "back_button_font_color",
        type: "color_picker",
        label: "Back button font color",
        initial_value: "#ffffffff",
      },
      {
        key: "back_button_text",
        type: "text_input",
        label: "Back button title",
        initial_value: "Back",
      },
      {
        key: "fields_font_ios",
        type: "ios_font_selector",
        label: "iOS input fields title font",
        initial_value: "Roboto-Bold",
      },
      {
        key: "fields_font_android",
        type: "android_font_selector",
        label: "Android input fields title font",
        initial_value: "Roboto-Bold",
      },
      {
        key: "fields_font_size",
        type: "number_input",
        label: "Input fields title font size",
        initial_value: 13,
      },
      {
        key: "fields_font_color",
        type: "color_picker",
        label: "Input fields font color",
        initial_value: "#ffffffff",
      },
      {
        key: "fields_placeholder_font_color",
        type: "color_picker",
        label: "Input fields placeholder font color",
        initial_value: "#ffffffff",
      },
      {
        key: "fields_separator_color",
        type: "color_picker",
        label: "Input fields separator color",
        initial_value: "#a9a9a9ff",
      },
      {
        key: "fields_email_text",
        type: "text_input",
        label: "Email field placeholder text",
        initial_value: "E-mail",
      },
      {
        key: "fields_password_text",
        type: "text_input",
        label: "Password field placeholder text",
        initial_value: "Password",
      },
      {
        key: "fields_token_text",
        type: "text_input",
        label: "Token field placeholder text",
        initial_value: "Token",
      },
      {
        key: "fields_password_confirmation_text",
        type: "text_input",
        label: "Password field confirmation placeholder text",
        initial_value: "Password Confirmation",
      },
      {
        key: "fields_set_new_password_text",
        type: "text_input",
        label: "New password field placeholder text",
        initial_value: "New password",
      },
      {
        key: "fields_name_text",
        type: "text_input",
        label: "Name field placeholder text",
        initial_value: "Enter your name",
      },
      {
        key: "forgot_password_font_ios",
        type: "ios_font_selector",
        label: "iOS forgot password font",
        initial_value: "Roboto-Regular",
      },
      {
        key: "forgot_password_font_android",
        type: "android_font_selector",
        label: "Android forgot password font",
        initial_value: "Roboto-Regular",
      },
      {
        key: "forgot_password_font_size",
        type: "number_input",
        label: "Forgot password font size",
        initial_value: 11,
      },
      {
        key: "forgot_password_font_color",
        type: "color_picker",
        label: "Forgot password font color",
        initial_value: "#a9a9a9ff",
      },
      {
        key: "forgot_password_text",
        type: "text_input",
        label: "Forgot password title",
        initial_value: "Forgotten your Username or Password?",
      },
      {
        key: "action_button_background_color",
        type: "color_picker",
        label: "iOS action button background color",
        initial_value: "#f1af13ff",
      },
      {
        key: "action_button_font_ios",
        type: "ios_font_selector",
        label: "iOS action button font",
        initial_value: "Roboto-Bold",
      },
      {
        key: "action_button_font_android",
        type: "android_font_selector",
        label: "Android action button font",
        initial_value: "Roboto-Bold",
      },
      {
        key: "action_button_font_size",
        type: "number_input",
        label: "Action button font size",
        initial_value: 15,
      },
      {
        key: "action_button_font_color",
        type: "color_picker",
        label: "Action button font Color",
        initial_value: "#ffffffff",
      },
      {
        key: "action_button_login_text",
        type: "text_input",
        label: "Action button login title",
        initial_value: "LOG IN",
      },
      {
        key: "action_button_signup_text",
        type: "text_input",
        label: "Action button sign up title",
        initial_value: "SIGN UP",
      },
      {
        key: "action_button_forgot_password_text",
        type: "text_input",
        label: "Action button request password title",
        initial_value: "REQUEST PASSWORD",
      },
      {
        key: "action_button_set_new_password_text",
        type: "text_input",
        label: "Action button set new password title",
        initial_value: "SET NEW PASSWORD",
      },
      {
        key: "create_account_link_font_ios",
        type: "ios_font_selector",
        label: "iOS Create account link font",
        initial_value: "Roboto-Regular",
      },
      {
        key: "create_account_link_font_android",
        type: "android_font_selector",
        label: "Android Create account link font",
        initial_value: "Roboto-Regular",
      },
      {
        key: "create_account_link_font_size",
        type: "number_input",
        label: "Create account link font size",
        initial_value: 11,
      },
      {
        key: "create_account_link_font_color",
        type: "color_picker",
        label: "Create account link font color",
        initial_value: "#a9a9a9ff",
      },
      {
        key: "create_account_link_text",
        type: "text_input",
        label: "Create account link title",
        initial_value: "No user? Sign Up!",
      },
      {
        key: "video_stream_exception_message",
        type: "text_input",
        label: "Message in case video url is empty",
        initial_value: "Video stream in not available. Please try again later",
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
        key: "logout_background_color",
        type: "color_picker",
        label: "Logout background font color",
        initial_value: "#161b29ff",
      },
      {
        key: "logout_title_font_ios",
        type: "ios_font_selector",
        label: "Logout iOS title font",
        initial_value: "Roboto-Bold",
      },
      {
        key: "logout_title_font_android",
        type: "android_font_selector",
        label: "Logout Android title font",
        initial_value: "Roboto-Bold",
      },
      {
        key: "logout_title_font_size",
        type: "number_input",
        label: "Logout title font size",
        initial_value: 15,
      },
      {
        key: "logout_title_font_color",
        type: "color_picker",
        label: "Logout title font color",
        initial_value: "#ffffffff",
      },
      {
        key: "logout_title_succeed_text",
        type: "text_input",
        label: "Logout text succeed title",
        initial_value: "Successfully Logged Out",
      },
      {
        key: "logout_title_fail_text",
        type: "text_input",
        label: "Logout text failed title",
        initial_value: "Logout Failed",
      },
      {
        group: true,
        label: "Storefront Screen Design and Text",
        tooltip: "These fields affect the design of the storefront screen.",
        folded: true,
        fields: [
          {
            key: "payment_screen_background",
            type: "color_picker_rgba",
            label: "Payment Screen Background Color",
            label_tooltip: "Background Color for the payment screen.",
            initial_value: "rgba(66,74,87,1)",
          },
          {
            key: "close_button",
            type: "uploader",
            label: "Close Button",
            label_tooltip: "Icon for close button. Dimensions 45 x 45.",
            placeholder: "W 45px x H 45px",
          },
          {
            key: "client_logo",
            type: "uploader",
            label: "Client Logo",
            label_tooltip: "Client logo image. Dimension 200 x44.",
            placeholder: "W 200px x H 44px",
          },
          {
            key: "payment_screen_title_text",
            type: "text_input",
            label: "Payment Screen Title Text",
            label_tooltip: "Main Title for the payment screen.",
            initial_value: "Choose Your Subscription",
            placeholder: "Choose Your Subscription",
          },
          {
            key: "payment_screen_title_font_ios",
            type: "ios_font_selector",
            label_tooltip: "Font for Main Title for ios.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "payment_screen_title_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for Main Title for android.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "payment_screen_title_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Main Title Text.",
            initial_value: "21",
          },
          {
            key: "payment_screen_title_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Main Title Text.",
            initial_value: "rgba(255, 255, 255, 1)",
          },
          {
            key: "restore_purchases_text",
            type: "text_input",
            label: "Restore Purchases Description Text",
            label_tooltip: "Description text for restoring purchases.",
            initial_value: "Purchased already a subscription?",
            placeholder: "Purchased already a subscription?",
          },
          {
            key: "restore_purchases_text_font_ios",
            type: "ios_font_selector",
            label_tooltip:
              "Font for Restore Purchases Description Text for ios.",
            initial_value: "Roboto-Regular",
          },
          {
            key: "restore_purchases_text_font_android",
            type: "android_font_selector",
            label_tooltip:
              "Font for Restore Purchases Description Text for android.",
            initial_value: "Roboto-Regular",
          },
          {
            key: "restore_purchases_text_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Restore Purchases Description Text.",
            initial_value: "12",
          },
          {
            key: "restore_purchases_text_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Restore Purchases Description Text.",
            initial_value: "rgba(255, 255, 255, 1)",
          },
          {
            key: "restore_purchases_link",
            type: "text_input",
            label: "Restore Purchases Link Text",
            label_tooltip: "Text for the Restore Purchases link.",
            initial_value: "Restore",
            placeholder: "Restore",
          },
          {
            key: "restore_purchases_link_font_ios",
            type: "ios_font_selector",
            label_tooltip: "Font for Restore Purchases Link Text for ios.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "restore_purchases_link_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for Restore Purchases Link Text for android.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "restore_purchases_link_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Restore Purchases Link Text.",
            initial_value: "13",
          },
          {
            key: "restore_purchases_link_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Restore Purchases Link Text.",
            initial_value: "rgba(255, 255, 255, 1)",
          },
          {
            key: "payment_option_background",
            type: "color_picker_rgba",
            label: "Payment Option Background Color",
            label_tooltip: "Background Color for the Payment Option.",
            initial_value: "rgba(255, 255, 255, 1)",
          },
          {
            key: "payment_option_corner_radius",
            type: "number_input",
            label: "Payment Option Corner Radius",
            label_tooltip: "Corner Radius for the Payment Option.",
            initial_value: "6",
          },
          {
            key: "payment_option_title_font_ios",
            type: "ios_font_selector",
            label_tooltip: "Font for the Payment Option Title for ios.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "payment_option_title_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for the Payment Option Title for android.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "payment_option_title_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Payment Option Title.",
            initial_value: "20",
          },
          {
            key: "payment_option_title_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Payment Option Title.",
            initial_value: "rgba(0,0,0,1)",
          },
          {
            key: "payment_option_description_font_ios",
            type: "ios_font_selector",
            label_tooltip: "Font for the Payment Option Description for ios.",
            initial_value: "Roboto-Regular",
          },
          {
            key: "payment_option_description_font_android",
            type: "android_font_selector",
            label_tooltip:
              "Font for the Payment Option Description for android.",
            initial_value: "Roboto-Regular",
          },
          {
            key: "payment_option_description_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Payment Option Description.",
            initial_value: "14",
          },
          {
            key: "payment_option_description_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Payment Option Description.",
            initial_value: "rgba(66,74,87,1)",
          },
          {
            key: "payment_option_button_background",
            type: "color_picker_rgba",
            label: "Payment Option Action Button Background Color",
            label_tooltip:
              "Background Color for the Payment Option Action Button.",
            initial_value: "rgba(39, 218, 134, 1)",
          },
          {
            key: "payment_option_button_corner_radius",
            type: "number_input",
            label: "Payment Option Action Button Corner Radius",
            label_tooltip:
              "Corner Radius for the Payment Option Action Button.",
            initial_value: "18",
          },
          {
            key: "payment_option_button_font_ios",
            type: "ios_font_selector",
            label_tooltip:
              "Font for the Payment Option Action Button Text for ios.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "payment_option_button_font_android",
            type: "android_font_selector",
            label_tooltip:
              "Font for the Payment Option Action Button Text for android.",
            initial_value: "Roboto-Bold",
          },
          {
            key: "payment_option_button_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for Payment Option Action Button Text.",
            initial_value: "12",
          },
          {
            key: "payment_option_button_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for Payment Option Action Button Text.",
            initial_value: "rgba(255, 255, 255, 1)",
          },
          {
            key: "terms_of_use_instructions_text",
            type: "text_input",
            label: "Payment Terms of use instructions Text",
            label_tooltip:
              "Brief text to give context to the terms of use link.",
            initial_value:
              "By making a selection and completing this transaction, you verify that you are at least 18 years old and agree to the",
          },
          {
            key: "terms_of_use_instructions_font_ios",
            type: "ios_font_selector",
            label_tooltip:
              "Font for the Terms of Use Instructions Text for ios.",
            initial_value: "Roboto-Regular",
          },
          {
            key: "terms_of_use_instructions_font_android",
            type: "android_font_selector",
            label_tooltip:
              "Font for the Terms of Use Instructions Text for android.",
            initial_value: "Roboto-Regular",
          },
          {
            key: "terms_of_use_instructions_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for the Terms of Use Instructions Text.",
            initial_value: "10",
          },
          {
            key: "terms_of_use_instructions_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for the Terms of Use Instructions Text.",
            initial_value: "rgba(255, 255, 255, 1)",
          },
          {
            key: "terms_of_use_link",
            type: "text_input",
            label: "Payment Terms of use Link",
            label_tooltip: "Link for the Terms of Use.",
            initial_value: "http://google.com",
          },
          {
            key: "terms_of_use_link_text",
            type: "text_input",
            label: "Payment Terms of use Link Text",
            label_tooltip: "Text for the Terms of Use Link.",
            initial_value: "terms of use.",
          },
          {
            key: "terms_of_use_link_font_ios",
            type: "ios_font_selector",
            label_tooltip: "Font for the Terms of Use Link Text for ios.",
            initial_value: "Roboto-Regular",
          },
          {
            key: "terms_of_use_link_font_android",
            type: "android_font_selector",
            label_tooltip: "Font for the Terms of Use Link Text for android.",
            initial_value: "Roboto-Regular",
          },
          {
            key: "terms_of_use_link_fontsize",
            type: "number_input",
            label_tooltip: "Font Size for the Terms of Use Link Text.",
            initial_value: "10",
          },
          {
            key: "terms_of_use_link_fontcolor",
            type: "color_picker_rgba",
            label_tooltip: "Font Color for the Terms of Use Link Text.",
            initial_value: "rgba(255, 255, 255, 1)",
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
      type: "number_input",
      key: "in_player_branding_id",
      tooltip_text: "In Player Branding ID",
      default: "",
    },
    {
      type: "text",
      key: "in_player_referrer",
      tooltip_text: "In Player Referrer URL",
      default: "",
    },
    {
      type: "text",
      key: "in_player_custom_asset_key",
      tooltip_text: "Custom asset key",
      default: "extensions.event_inplayer_id",
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
      type: "tag_select",
      key: "logout_completion_action",
      tooltip_text: "Defines what action plugin should do after user log out. ",
      options: [
        {
          text: "Go back to previous screen",
          value: "go_back",
        },
        {
          text: "Go back to home screen",
          value: "go_home",
        },
      ],
      initial_value: "go_back",
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
  hooks: {
    fields: [
      {
        group: true,
        label: "Before Load",
        folded: true,
        fields: [
          {
            key: "preload_plugins",
            type: "preload_plugins_selector",
            label: "Select Plugins",
          },
        ],
      },
    ],
  },
  targets: ["mobile"],
  ui_frameworks: ["quickbrick"],
};

function createManifest({ version, platform }) {
  const basePlatform = platform.includes("ios") ? "ios" : "android";

  const manifest = {
    ...baseManifest,
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
  ios: {},
  android: {
    class_name: "com.reactnativecommunity.asyncstorage.AsyncStoragePackage",
    react_packages: [
      "com.reactnativecommunity.asyncstorage.AsyncStoragePackage",
      "com.applicaster.iap.reactnative.IAPPackage",
    ],
    proguard_rules:
      "-keep public class com.reactnativecommunity.asyncstorage.** {*;} -keep public class * extends com.facebook.react.ReactPackage {*;} -keepclasseswithmembers,includedescriptorclasses class * { @com.facebook.react.bridge.ReactMethod <methods>;} -keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactProp <methods>; } -keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }",
  },
};

const project_dependencies = {
  ios: [],
  android: [
    {
      "react-native-community_async-storage":
        "node_modules/@react-native-community/async-storage/android",
    },
    {
      ApplicasterIAP:
        "./quick_brick/node_modules/@applicaster/applicaster-iap/Android/iap",
    },
    {
      ApplicasterIAPRN:
        "./quick_brick/node_modules/@applicaster/applicaster-iap/Android/iap-rn",
    },
  ],
};

const extra_dependencies = {
  ios: [
    {
      ApplicasterIAP:
        ":path => 'node_modules/@applicaster/applicaster-iap/iOS/ApplicasterIAP.podspec'",
    },
    {
      RNCAsyncStorage:
        ":path => 'node_modules/@react-native-community/async-storage/RNCAsyncStorage.podspec'",
    },
  ],
  android: [],
};
const min_zapp_sdk = {
  ios: "20.2.0-Dev",
  android: "20.0.0",
  ios_for_quickbrick: "0.1.0-alpha1",
  android_for_quickbrick: "0.1.0-alpha1",
};

module.exports = createManifest;
