const R = require("ramda");

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
    "@applicaster/applicaster-iap@0.2.15",
    "@react-native-community/blur@3.4.1",
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
  targets: ["mobile", "tv"],
  ui_frameworks: ["quickbrick"],
};

const stylesMobile = {
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
          label_tooltip: "Font for Restore Purchases Description Text for ios.",
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
          label_tooltip: "Font for the Payment Option Description for android.",
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
          label_tooltip: "Corner Radius for the Payment Option Action Button.",
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
          label_tooltip: "Brief text to give context to the terms of use link.",
          initial_value:
            "By making a selection and completing this transaction, you verify that you are at least 18 years old and agree to the",
        },
        {
          key: "terms_of_use_instructions_font_ios",
          type: "ios_font_selector",
          label_tooltip: "Font for the Terms of Use Instructions Text for ios.",
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
};

const stylesTv = {
  fields: [
    {
      key: "client_logo",
      type: "uploader",
      label: "Client Logo",
      label_tooltip: "Client logo image. Dimension 200 x44.",
      placeholder: "W 200px x H 44px",
    },
    {
      group: true,
      label: "Subscriber Agreement Design and Text",
      tooltip:
        "These fields affect the design of the subscriber agreement screen.",
      folded: true,
      fields: [
        {
          key: "privacy_screen_background_color",
          type: "color_picker_rgba",
          label: "Background Color for the payment screen.",
          label_tooltip: "Background Color for the payment screen.",
          initial_value: "rgba(60, 65, 75, 1)",
        },
        {
          key: "privacy_text_area_background_color",
          type: "color_picker_rgba",
          label:
            "Background Color for the text area where the Agreement and Privacy are shown.",
          label_tooltip:
            "Background Color for the text area where the Agreement and Privacy are shown.",
          initial_value: "rgba(54, 60, 71, 1)",
        },

        {
          key: "privacy_main_title_text",
          type: "text_input",
          label: "Main Title for the agreement and privacy screen.",
          label_tooltip: "Main Title for the agreement and privacy screen.",
          initial_value: "Subscriber Ageement & Privacy Policy",
          placeholder: "Subscriber Ageement & Privacy Policy",
        },
        {
          key: "privacy_main_title_text_font_android_tv",
          type: "android_font_selector",
          label_tooltip:
            "Font for the Main Title for the agreement and privacy screen for Android TV.",
          initial_value: "Roboto-Dark",
        },
        {
          key: "privacy_main_title_text_font_tvos",
          type: "tvos_font_selector",
          label_tooltip:
            "Font for the Main Title for the agreement and privacy screen for TvOS.",
          initial_value: "SFProDisplay-Bold",
        },
        {
          key: "privacy_main_title_text_fontsize",
          type: "number_input",
          label_tooltip:
            "Font Size Main Title for the agreement and privacy screen.",
          initial_value: "50",
        },
        {
          key: "privacy_main_title_text_fontcolor",
          type: "color_picker_rgba",
          label_tooltip:
            "Font Color Main Title for the agreement and privacy screen",
          initial_value: "rgba(255, 255, 255, 1)",
        },

        {
          key: "privacy_text",
          type: "text_input",
          label: "Text for the agreement and privacy.",
          label_tooltip: "Text for the agreement and privacy.",
          initial_value:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet nunc dui. Sed nec dignissim erat. Praesent molestie, odio et lacinia dapibus, lacus felis interdum justo, a viverra eros mauris vel nibh. Nullam consequat urna at lorem interdum, non mattis elit interdum. Cras libero erat, mattis ut mattis in, ornare ut ante. Duis id mi condimentum elit sagittis scelerisque. Duis facilisis vel lectus eu fermentum. Etiam venenatis fermentum felis nec ornare. Nullam pretium iaculis ligula sed accumsan.\n\n\nDonec id libero sit amet ligula cursus tempor. Donec urna felis, vestibulum id fringilla in, elementum ac diam. Nunc pretium, ligula ac accumsan accumsan, ipsum ante tristique nisi, et dictum dui arcu eu ex. Duis vel lectus quis nisl fringilla dictum. Praesent vulputate justo ligula, at commodo lorem sodales sed. Cras quis rhoncus ante. Nunc ultricies orci eget purus elementum, eget posuere elit semper. Suspendisse quis dignissim elit, eget dictum sem. Sed in nisl dui. Curabitur at sapien consectetur, lacinia turpis vitae, pharetra nisl. Nullam accumsan odio orci, quis elementum ex luctus id. Cras nec eros orci. Vestibulum eget convallis lectus. Donec eu lorem at purus elementum tempo.",
          placeholder: "Subscriber Ageement & Privacy Policy Text",
        },
        {
          key: "privacy_text_font_android_tv",
          type: "android_font_selector",
          label_tooltip:
            "Font for the text for the agreement and privacy screen for Android TV.",
          initial_value: "Roboto-Medium",
        },
        {
          key: "privacy_text_font_tvos",
          type: "tvos_font_selector",
          label_tooltip:
            "Font for the text for the agreement and privacy screen for TvOS.",
          initial_value: "SFProDisplay-Medium",
        },
        {
          key: "privacy_text_fontsize",
          type: "number_input",
          label_tooltip: "Font Size text for the agreement and privacy screen.",
          initial_value: "30",
        },
        {
          key: "privacy_text_fontcolor",
          type: "color_picker_rgba",
          label_tooltip: "Font Color text for the agreement and privacy screen",
          initial_value: "rgba(255, 255, 255, 1)",
        },
      ],
    },
    {
      group: true,
      label: "StoreFront Design and Text",
      tooltip:
        "These fields affect the design of the storefront screen plugin.",
      folded: true,
      fields: [
        {
          key: "storefront_screen_background_color",
          type: "color_picker_rgba",
          label: "Storefront Screen Background Color",
          label_tooltip: "Background Color for the payment screen.",
          initial_value: "rgba(54, 61, 71, 1)",
        },
        {
          key: "subscription_default_title_text",
          type: "text_input",
          label: "Subscription Default Title Text",
          label_tooltip: "Main Title for the payment screen.",
          initial_value: "Choose Your Subscription",
          placeholder: "Choose Your Subscription",
        },
        {
          key: "subscription_default_title_text_font_android_tv",
          type: "android_font_selector",
          label_tooltip:
            "Font for the Main Title for the payment screen for Android TV.",
          initial_value: "Roboto-Dark",
        },
        {
          key: "subscription_default_title_text_font_tvos",
          type: "tvos_font_selector",
          label_tooltip:
            "Font for the Main Title for the payment screent for TvOS.",
          initial_value: "SFProDisplay-Bold",
        },
        {
          key: "subscription_default_title_text_fontsize",
          type: "number_input",
          label_tooltip: "Font Size Main Title for the payment screen.",
          initial_value: "50",
        },
        {
          key: "subscription_default_title_text_fontcolor",
          type: "color_picker_rgba",
          label_tooltip: "Font Color Main Title for the payment screen",
          initial_value: "rgba(255, 255, 255, 1)",
        },

        {
          key: "event_schedule_text_date_format",
          type: "text_input",
          label: "Event Schedule ISO date format",
          label_tooltip: "Event Schedule ISO date format.",
          initial_value: "Choose Your Subscription",
          placeholder: "Choose Your Subscription",
        },
        {
          key: "event_schedule_text_font_android_tv",
          type: "android_font_selector",
          label_tooltip: "Font for the Event Schedule for Android TV.",
          initial_value: "Roboto-Medium",
        },
        {
          key: "event_schedule_text_font_tvos",
          type: "tvos_font_selector",
          label_tooltip:
            "Font for the Event Schedule for the payment screent for TvOS.",
          initial_value: "SFProDisplay-Medium",
        },
        {
          key: "event_schedule_text_fontsize",
          type: "number_input",
          label_tooltip: "Font for the Event Schedule for the payment screen.",
          initial_value: "24",
        },
        {
          key: "event_schedule_text_fontcolor",
          type: "color_picker_rgba",
          label_tooltip: "Font for the Event Schedule for the payment screen",
          initial_value: "rgba(255, 255, 255, 1)",
        },

        {
          key: "subscription_default_description_text",
          type: "text_input",
          label: "Subscription Default Description Text",
          label_tooltip: "Description text for the subscription.",
          initial_value: "Enjoy premium content",
          placeholder: "Enjoy premium content",
        },
        {
          key: "subscription_default_description_text_font_android_tv",
          type: "android_font_selector",
          label_tooltip:
            "Font for the Description text for the subscription for Android TV.",
          initial_value: "Roboto-Dark",
        },
        {
          key: "subscription_default_description_text_font_tvos",
          type: "tvos_font_selector",
          label_tooltip:
            "Font for the Description text for the subscription for TvOS.",
          initial_value: "SFProDisplay-Bold",
        },
        {
          key: "subscription_default_description_text_fontsize",
          type: "number_input",
          label_tooltip:
            "Font size for the Description text for the subscription",
          initial_value: "30",
        },
        {
          key: "subscription_default_description_text_fontcolor",
          type: "color_picker_rgba",
          label_tooltip:
            "Font Color for the Description text for the subscription",
          initial_value: "rgba(255, 255, 255, 1)",
        },
        {
          key: "policy_agreement_text",
          type: "text_input",
          label: "Policy Agreement Text",
          label_tooltip: "Text for the policy agreement.",
          initial_value:
            "By clicking “Subscribe” or “Buy” below, you also agree to the [Client’s App Name] Agreement and acknowledge that you have read our Privacy Policy",
          placeholder: "Policy Agreement Text",
        },
        {
          key: "policy_agreement_text_font_android_tv",
          type: "android_font_selector",
          label_tooltip: "Font for the policy agreement for Android TV.",
          initial_value: "Roboto-Medium",
        },
        {
          key: "policy_agreement_text_font_tvos",
          type: "tvos_font_selector",
          label_tooltip: "Font for the policy agreement for TvOS.",
          initial_value: "SFProDisplay-Medium",
        },
        {
          key: "policy_agreement_text_fontsize",
          type: "number_input",
          label_tooltip: "Font size for the policy agreement",
          initial_value: "24",
        },
        {
          key: "policy_agreement_text_fontcolor",
          type: "color_picker_rgba",
          label_tooltip: "Font Color for the policy agreement",
          initial_value: "rgba(255, 255, 255, 1)",
        },
        {
          key: "payment_option_background_color",
          type: "color_picker_rgba",
          label_tooltip: "Background Color for the Payment Option.",
          initial_value: "rgba(42, 45, 52, 1)",
        },
        {
          key: "payment_option_active_background_color",
          type: "color_picker_rgba",
          label_tooltip: "Background Color for the Active Payment Option.",
          initial_value: "rgba(42, 45, 52, 1)",
        },
        {
          key: "payment_option_corner_radius",
          type: "number_input",
          label: "Payment Option Corner Radius",
          label_tooltip: "Corner Radius for the Payment Option.",
          initial_value: "10",
        },
        {
          key: "payment_option_active_border_color",
          type: "color_picker_rgba",
          label_tooltip: "BColor for the Active Payment Option.",
          initial_value: "rgba(42, 45, 52, 1)",
        },
        {
          key: "payment_option_active_border_width",
          type: "number_input",
          label: "Payment Option active border width",
          label_tooltip: "Width for the Active Payment Option.",
          initial_value: "3",
        },
        {
          key: "payment_option_default_action_background_color",
          type: "color_picker_rgba",
          label_tooltip:
            "Default Background Color for the Payment Option Action.",
          initial_value: "rgba(39, 218, 134, 1)",
        },
        {
          key: "payment_option_active_default_action_background_color",
          type: "color_picker_rgba",
          label_tooltip:
            "Default Background Color for the Payment Option Action.",
          initial_value: "rgba(39, 218, 134, 1)",
        },

        {
          key: "payment_option_title_text_font_android_tv",
          type: "android_font_selector",
          label_tooltip: "Font for the payment option title for Android TV.",
          initial_value: "Roboto-Dark",
        },
        {
          key: "payment_option_title_text_font_tvos",
          type: "tvos_font_selector",
          label_tooltip: "Font for the payment option title for TvOS.",
          initial_value: "SFProDisplay-Bold",
        },
        {
          key: "payment_option_title_text_fontsize",
          type: "number_input",
          label_tooltip: "Font size for the payment option title",
          initial_value: "18",
        },
        {
          key: "payment_option_title_text_fontcolor",
          type: "color_picker_rgba",
          label_tooltip: "Font Color for the payment option title",
          initial_value: "rgba(255, 255, 255, 1)",
        },

        {
          key: "payment_option_description_text_font_android_tv",
          type: "android_font_selector",
          label_tooltip:
            "Font for the payment option description for Android TV.",
          initial_value: "Roboto-Dark",
        },
        {
          key: "payment_option_description_text_font_tvos",
          type: "tvos_font_selector",
          label_tooltip: "Font for the payment option description for TvOS.",
          initial_value: "SFProDisplay-Bold",
        },
        {
          key: "payment_option_description_text_fontsize",
          type: "number_input",
          label_tooltip: "Font size for the payment option description",
          initial_value: "18",
        },
        {
          key: "payment_option_description_text_fontcolor",
          type: "color_picker_rgba",
          label_tooltip: "Font Color for the payment option description",
          initial_value: "rgba(255, 255, 255, 1)",
        },

        {
          key: "payment_option_fee_text_font_android_tv",
          type: "android_font_selector",
          label_tooltip: "Font for the payment option fee for Android TV.",
          initial_value: "Roboto-Dark",
        },
        {
          key: "payment_option_fee_text_font_tvos",
          type: "tvos_font_selector",
          label_tooltip: "Font for the payment option fee for TvOS.",
          initial_value: "SFProDisplay-Bold",
        },
        {
          key: "payment_option_fee_text_fontsize",
          type: "number_input",
          label_tooltip: "Font size for the payment option fee",
          initial_value: "36",
        },
        {
          key: "payment_option_fee_text_fontcolor",
          type: "color_picker_rgba",
          label_tooltip: "Font Color for the payment option fee",
          initial_value: "rgba(255, 255, 255, 1)",
        },

        {
          key: "payment_option_action_text_type_buy",
          type: "text_input",
          label: "Text for the payment option action button type 'Buy'",
          label_tooltip: "Text for the payment option action button type 'Buy'",
          initial_value: "Buy",
          placeholder: "Action button 'Buy' type",
        },
        {
          key: "payment_option_action_text_type_subscribe",
          type: "text_input",
          label: "Text for the payment option action button type 'Subscribe'",
          label_tooltip:
            "Text for the payment option action button type 'Subscribe'",
          initial_value: "Subscribe",
          placeholder: "Action button 'Subscribe' type",
        },
        {
          key: "payment_option_action_text_font_android_tv",
          type: "android_font_selector",
          label_tooltip:
            "Font for the payment option action button for Android TV.",
          initial_value: "Roboto-Regular",
        },
        {
          key: "payment_option_action_text_font_tvos",
          type: "tvos_font_selector",
          label_tooltip: "Font for the payment option action button for TvOS.",
          initial_value: "SFProDisplay-Bold",
        },
        {
          key: "payment_option_action_text_fontsize",
          type: "number_input",
          label_tooltip: "Font size for the payment option action button",
          initial_value: "30",
        },
        {
          key: "payment_option_action_text_fontcolor",
          type: "color_picker_rgba",
          label_tooltip: "Font Color for the payment option action button",
          initial_value: "rgba(255, 255, 255, 1)",
        },
        {
          key: "restore_purchase_action_button_text",
          type: "text_input",
          label: "Restore Purchases Action Button Text",
          label_tooltip: "Text for the restore purchases button.",
          initial_value: "Restore",
          placeholder: "Restore purchase",
        },
        {
          key: "restore_purchase_action_button_text_font_android_tv",
          type: "android_font_selector",
          label_tooltip:
            "Font for the Main Title for the restore purchases button for Android TV.",
          initial_value: "Roboto-Regular",
        },
        {
          key: "restore_purchase_action_button_text_font_tvos",
          type: "tvos_font_selector",
          label_tooltip:
            "Font for the Main Title for the restore purchases button for TvOS.",
          initial_value: "SFProDisplay-Regular",
        },
        {
          key: "restore_purchase_action_button_text_fontsize",
          type: "number_input",
          label_tooltip:
            "Font Size Main Title for the restore purchases button.",
          initial_value: "30",
        },
        {
          key: "restore_purchase_action_button_text_fontcolor",
          type: "color_picker_rgba",
          label_tooltip:
            "Font Color Main Title for the restore purchases button",
          initial_value: "rgba(255, 255, 255, 1)",
        },
        {
          key: "restore_purchase_action_button_background_color",
          type: "color_picker_rgba",
          label_tooltip:
            "Default Background Color for the Restore Purchases Button.",
          initial_value: "rgba(70, 79, 97, 1)",
        },
        {
          key: "restore_purchase_active_action_button_background_color",
          type: "color_picker_rgba",
          label_tooltip:
            "Default Background Color for the Active Restore Purchases Button.",
          initial_value: "rgba(39, 218, 134, 1)",
        },
        {
          key: "subscriber_agreement_and_privacy_policy_text",
          type: "text_input",
          label: "Subscriber Agreement and Privacy Policy Link Text",
          label_tooltip: "Text for the Agreement and Privacy Policy Link.",
          initial_value:
            "[Client’s Name App] Subscriber Agreement and Privacy Policy",
          placeholder: "Agreement policy",
        },
        {
          key: "subscriber_agreement_and_privacy_policy_text_font_android_tv",
          type: "android_font_selector",
          label_tooltip:
            "Font for the Subscriber Agreement and Privacy Policy Link for Android TV.",
          initial_value: "Roboto-Medium",
        },
        {
          key: "subscriber_agreement_and_privacy_policy_text_font_tvos",
          type: "tvos_font_selector",
          label_tooltip:
            "Font for the Subscriber Agreement and Privacy Policy Link for TvOS.",
          initial_value: "SFProDisplay-Medium",
        },
        {
          key: "subscriber_agreement_and_privacy_policy_text_fontsize",
          type: "number_input",
          label_tooltip:
            "Font Size Subscriber Agreement and Privacy Policy Link.",
          initial_value: "24",
        },
        {
          key: "subscriber_agreement_and_privacy_policy_text_fontcolor",
          type: "color_picker_rgba",
          label_tooltip:
            "Font Color Subscriber Agreement and Privacy Policy Link",
          initial_value: "rgba(255, 255, 255, 1)",
        },
        {
          key: "subscriber_agreement_and_privacy_policy_text_active_color",
          type: "color_picker_rgba",
          label_tooltip:
            "Color for the Active Subscriber Agreement and Privacy Policy Link ",
          initial_value: "rgba(39, 218, 134, 1)",
        },
      ],
    },
    {
      group: true,
      label: "Account Design and Text",
      tooltip: "These fields affect the design of the screen plugin.",
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
          key: "email_input_background_focused",
          type: "color_picker_rgba",
          label: "Email Input Background Color (focused)",
          label_tooltip: "Background Color for the Focused Email Input.",
          initial_value: "rgba(39, 218, 134, 1)",
        },
        {
          key: "email_input_background_filled",
          type: "color_picker_rgba",
          label: "Email Input Background Color (filled)",
          label_tooltip: "Background Color for the Filled Email Input.",
          initial_value: "rgba(39, 218, 134, 1)",
        },
        {
          key: "email_input_border_color",
          type: "color_picker_rgba",
          label: "Email Input Border Color",
          label_tooltip: "Border Color for the Email Input.",
          initial_value: "rgba(39, 218, 134, 1)",
        },
        {
          key: "email_input_border_color_focused",
          type: "color_picker_rgba",
          label: "Email Input Border Color (focused)",
          label_tooltip: "Border Color for the Focused Email Input.",
          initial_value: "rgba(39, 218, 134, 1)",
        },
        {
          key: "email_input_border_color_filled",
          type: "color_picker_rgba",
          label: "Email Input Border Color (filled)",
          label_tooltip: "Border Color for the Filled Email Input.",
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
          key: "login_action_button_background_focused",
          type: "color_picker_rgba",
          label: "Login Action Button Focused Background Color",
          label_tooltip: "Background Color for the Login Action Button",
          initial_value: "rgba(93, 2, 13, 1)",
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
          key: "login_action_button_border_radius",
          type: "number_input",
          label: "Login Action Button Corner Radius",
          label_tooltip: "Corner radius for a login button.",
          initial_value: "5",
        },
        {
          key: "login_action_button_fontcolor",
          type: "color_picker_rgba",
          label_tooltip: "Font Color for Login Action Button Text.",
          initial_value: "#545A5C",
        },
        {
          key: "login_action_button_fontcolor_focused",
          type: "color_picker_rgba",
          label_tooltip: "Font Color for Focused Login Action Button Text.",
          initial_value: "#545A5C",
        },
        {
          key: "signup_action_button_background",
          type: "color_picker_rgba",
          label: "Sign Up Action Button Background Color",
          label_tooltip: "Background Color for the Sign Up Action Button.",
          initial_value: "rgba(39, 218, 134, 1)",
        },
        {
          key: "signup_action_button_background_focused",
          type: "color_picker_rgba",
          label: "Sign Up Action Button Focused Background Color",
          label_tooltip: "Background Color for the Sign Up Action Button",
          initial_value: "rgba(93, 2, 13, 1)",
        },
        {
          key: "signup_action_button_text",
          type: "text_input",
          label: "Sign Up Action Button Text",
          label_tooltip: "Text for the Sign Up Button.",
          initial_value: "SIGN UP",
          placeholder: "SIGN UP",
        },
        {
          key: "signup_action_button_font_tvos",
          type: "tvos_font_selector",
          label_tooltip: "Font for Sign Up Action Button Text for TvOS.",
          initial_value: "Helvetica-Bold",
        },
        {
          key: "signup_action_button_font_android",
          type: "android_font_selector",
          label_tooltip: "Font for Sign Up Action Button Text for Android TV.",
          initial_value: "Roboto-Bold",
        },
        {
          key: "signup_action_button_fontsize",
          type: "number_input",
          label_tooltip: "Font Size for Sign Up Action Button Text.",
          initial_value: "40",
        },
        {
          key: "signup_action_button_border_radius",
          type: "number_input",
          label: "Sign Up Action Button Corner Radius",
          label_tooltip: "Corner radius for a Sign Up button.",
          initial_value: "5",
        },
        {
          key: "signup_action_button_fontcolor",
          type: "color_picker_rgba",
          label_tooltip: "Font Color for Sign Up Action Button Text.",
          initial_value: "#545A5C",
        },
        {
          key: "signup_action_button_fontcolor_focused",
          type: "color_picker_rgba",
          label_tooltip: "Font Color for Focused Sign Up Action Button Text.",
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
      tooltip: "These fields affect the design of plugin confirmation screen.",
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
};

const androidPlatforms = [
  "android",
  "android_for_quickbrick",
  "android_tv_for_quickbrick",
  "amazon_fire_tv_for_quickbrick",
];

const tvPlatforms = [
  "tvos_for_quickbrick",
  "android_tv_for_quickbrick",
  "amazon_fire_tv_for_quickbrick",
];

const api = {
  apple: {},
  android: {
    class_name: "",
    react_packages: [
      "com.applicaster.iap.reactnative.IAPPackage",
      "com.cmcewen.blurview.BlurViewPackage",
    ],
    proguard_rules:
      "-keep public class * extends com.facebook.react.ReactPackage {*;} -keepclasseswithmembers,includedescriptorclasses class * { @com.facebook.react.bridge.ReactMethod <methods>;} -keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactProp <methods>; } -keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }",
  },
};

const project_dependencies = {
  apple: [],
  android: [
    {
      ApplicasterIAP:
        "./quick_brick/node_modules/@applicaster/applicaster-iap/Android/iap",
    },
    {
      ApplicasterIAPRN:
        "./quick_brick/node_modules/@applicaster/applicaster-iap/Android/iap-rn",
    },
    {
      "react-native-community_blur":
        "node_modules/@react-native-community/blur/android",
    },
  ],
};

const extra_dependencies = {
  apple: [
    {
      ApplicasterIAP:
        ":path => 'node_modules/@applicaster/applicaster-iap/iOS/ApplicasterIAP.podspec'",
    },
    {
      "react-native-blur":
        ":path => 'node_modules/@react-native-community/blur/react-native-blur.podspec'",
    },
  ],
  android: [],
};

const min_zapp_sdk = {
  ios: "20.2.0-Dev",
  android: "20.0.0",
  ios_for_quickbrick: "0.1.0-alpha1",
  android_for_quickbrick: "0.1.0-alpha1",
  tvos_for_quickbrick: "0.1.0-alpha1",
  android_tv_for_quickbrick: "0.1.0-alpha1",
  amazon_fire_tv_for_quickbrick: "0.1.0-alpha1",
};

function createManifest({ version, platform }) {
  const basePlatform = R.includes(platform, androidPlatforms)
    ? "android"
    : "apple";

  const isTV = R.includes(platform, tvPlatforms);

  const manifest = {
    ...baseManifest,
    platform,
    dependency_version: version,
    manifest_version: version,
    api: api[basePlatform],
    project_dependencies: project_dependencies[basePlatform],
    extra_dependencies: extra_dependencies[basePlatform],
    min_zapp_sdk: min_zapp_sdk[platform],
    styles: isTV ? stylesTv : stylesMobile,
  };

  return manifest;
}

module.exports = createManifest;
