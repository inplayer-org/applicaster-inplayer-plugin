import React from "react";
import { Platform } from "react-native";
import { TVEventHandlerComponent } from "@applicaster/zapp-react-native-tvos-ui-components/Components/TVEventHandlerComponent";

export default function TVRemoteHandlerComponent({ tvEventHandler, children }) {
  const renderTvOSRemoteComponent = () => {
    return (
      <TVEventHandlerComponent tvEventHandler={tvEventHandler}>
        {children}
      </TVEventHandlerComponent>
    );
  };

  return Platform.OS === "ios" ? renderTvOSRemoteComponent() : children;
}
