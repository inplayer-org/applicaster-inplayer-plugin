import React from "react";
import { View, Image, ImageBackground } from "react-native";
import TVRemoteHandlerComponent from "./TVRemoteHandlerComponent";
import ASSETS from "../../Config/Assets";

function Layout(props) {
  const { children, remoteHandler } = props;

  return (
    <TVRemoteHandlerComponent tvEventHandler={remoteHandler}>
      <ImageBackground
        source={{ uri: ASSETS.screenBackground }}
        style={{ ...styles.container }}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={{ uri: ASSETS.logo }}
          />
        </View>
        <View style={styles.subContainer}>{children}</View>
      </ImageBackground>
    </TVRemoteHandlerComponent>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
  },
  logoContainer: {
    alignSelf: "flex-start",
    margin: 58,
  },
  subContainer: {
    marginTop: 100,
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 230,
  },
  logo: {
    width: 350,
    height: 100,
  },
};

export default Layout;
