import React from "react";
import { getPluginData } from "../Utils/storageUtils";

export function getCustomPluginData(screenData) {
  const {
    login_title_fontcolor: loginTitleFontColor,
    login_title_fontsize: loginTitleFontSize,
    main_description_fontcolor: mainDescriptionFontColor,
    main_description_fontsize: mainDescriptionFontSize,
    optional_instructions_1_fontcolor: instructions1FontColor,
    optional_instructions_1_fontsize: instructions1FontSize,
    optional_instructions_2_fontcolor: instructions2FontColor,
    optional_instructions_2_fontsize: instructions2FontSize,
    error_notice_message_fontcolor: errorMessageFontColor,
    error_notice_message_fontsize: errorMessageFontSize,
    login_action_button_fontcolor: loginButtonFontColor,
    login_action_button_fontsize: loginButtonFontSize,
    skip_action_button_fontcolor: skipButtonFontColor,
    skip_action_button_fontsize: skipButtonFontSize,
    username_input_fontsize: usernameInputFontSize,
    username_input_fontcolor: usernameInputFontColor,
    password_input_fontsize: passwordInputFontSize,
    password_input_fontcolor: passwordInputFontColor,
    login_title_text: loginTitle = "",
    main_description_text: mainDescription = "",
    optional_instructions_1_text: instructions1 = "",
    optional_instructions_2_text: instructions2 = "",
    username_input_placeholder: usernamePlaceholder = "",
    password_input_placeholder: passwordPlaceholder = "",
    login_action_button_text: loginLabel = "",
    skip_action_button_text: skipLabel = "",
    confirmation_message_text: confirmationMessage = "",
    confirm_action_button_text: confirmLabel = "",
    cancel_action_button_text: cancelLabel = "",
    cancel_action_button_fontsize: cancelButtonFontSize,
    cancel_action_button_fontcolor: cancelButtonFontColor,
    confirm_action_button_fontsize: confirmButtonFontSize,
    confirm_action_button_fontcolor: confirmButtonFontColor,
    confirmation_message_fontsize: confirmationMessageFontSize,
    confirmation_message_fontcolor: confirmationMessageFontColor,
    enable_skip_functionality: skip = false,
    use_dark_keyboard: isDarkKeyboard = false,
  } = getPluginData(screenData);

  const loginTitleStyle = {
    color: loginTitleFontColor,
    fontSize: loginTitleFontSize,
  };

  const mainDescriptionStyle = {
    color: mainDescriptionFontColor,
    fontSize: mainDescriptionFontSize,
  };

  const optionalInstructions1Style = {
    color: instructions1FontColor,
    fontSize: instructions1FontSize,
  };

  const optionalInstructions2Style = {
    color: instructions2FontColor,
    fontSize: instructions2FontSize,
  };

  const errorNoticeMessageStyle = {
    color: errorMessageFontColor,
    fontSize: errorMessageFontSize,
  };

  const loginButtonStyle = {
    color: loginButtonFontColor,
    fontSize: loginButtonFontSize,
  };

  const usernameInputStyle = {
    color: usernameInputFontColor,
    fontSize: usernameInputFontSize,
  };

  const passwordInputStyle = {
    color: passwordInputFontColor,
    fontSize: passwordInputFontSize,
  };

  const skipButtonStyle = {
    color: skipButtonFontColor,
    fontSize: skipButtonFontSize,
  };

  const confirmationMessageStyle = {
    color: confirmationMessageFontColor,
    fontSize: confirmationMessageFontSize,
  };

  const confirmButtonStyle = {
    color: confirmButtonFontColor,
    fontSize: confirmButtonFontSize,
  };

  const cancelButtonStyle = {
    color: cancelButtonFontColor,
    fontSize: cancelButtonFontSize,
  };

  const customText = {
    loginTitle,
    mainDescription,
    instructions1,
    instructions2,
    usernamePlaceholder,
    passwordPlaceholder,
    loginLabel,
    skipLabel,
    confirmationMessage,
    confirmLabel,
    cancelLabel,
  };

  return {
    loginTitleStyle,
    mainDescriptionStyle,
    optionalInstructions1Style,
    optionalInstructions2Style,
    errorNoticeMessageStyle,
    loginButtonStyle,
    usernameInputStyle,
    passwordInputStyle,
    skipButtonStyle,
    confirmationMessageStyle,
    confirmButtonStyle,
    cancelButtonStyle,
    customText,
    skip,
    isDarkKeyboard,
  };
}

export const PluginContext = React.createContext();
