import React, { useState, useEffect } from "react";
import R from "ramda";
import moment from "moment";
import globalSessionManager from "../globalSessionManager";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  NativeModules,
  TouchableOpacity
} from "react-native";
import LoadingScreen from "./LoadingScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
    color: "white",
    marginTop: 100,
    marginBottom: 80
  },
  input: {
    fontFamily: "Montserrat-SemiBold",
    backgroundColor: "transparent",
    fontSize: 13,
    color: "white",
    width: 250,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#A9A9A9",
    marginBottom: 10,
    paddingHorizontal: 15
  },
  button: {
    height: 50,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1AD12",
    borderRadius: 50
  },
  buttonText: {
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 15
  },
  remindPassword: {
    color: "rgba(169, 169, 169, 1)",
    fontFamily: "Montserrat-Regular",
    fontSize: 11,
    marginBottom: 30
  }
});

const parseJSON = R.tryCatch(JSON.parse, () => null);

const App = props => {
  const riverScreen = Object.values(props.rivers).find(
    river => river.type === "my-plugin-identifier"
  );

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLoginStatus() {
      await checkLoginStatus();
    }
    getLoginStatus();
  }, []);

  const isTokenValid = expiresAt => moment().diff(expiresAt, "second") < 0;

  const checkLoginStatus = async () => {
    const { callback, payload } = props;
    const loginDetails = await NativeModules.LocalStorage.getItem(
      "loginDetails",
      "dev_demo_login"
    ).catch(err => {
      setLoading(false);
      globalSessionManager.logOut();
    });

    if (loginDetails && isTokenValid(parseJSON(loginDetails).expiresAt)) {
      callback({
        success: true,
        payload
      });
    } else {
      setLoading(false);
      globalSessionManager.logOut();
    }
  };

  const saveLoginData = ({ token, userId, expiresAt }) => {
    NativeModules.LocalStorage.setItem(
      "loginDetails",
      JSON.stringify({ token, userId, expiresAt }),
      "dev_demo_login"
    )
      .then(console.log)
      .catch(console.log);
  };

  const createExpirationDate = expiresIn =>
    moment()
      .add(expiresIn, "second")
      .format();

  const onSuccess = credentials => {
    // this is the example of the logic on auth0
    // to be replaced with what inPlayer needs
    // auth0.auth
    //   .userInfo({ token: credentials.accessToken })
    //   .then(profile => {
    //     globalSessionManager.logIn(credentials);
    //     saveLoginData({
    //       token: credentials.accessToken,
    //       userId: profile.sub,
    //       expiresAt: createExpirationDate(credentials.expiresIn)
    //     });
    //   })
    //   .catch(console.err);
  };
  const login = () => {
    const { callback, payload } = props;

    // example login flow for auth0
    // to be changed

    // auth0.auth
    //   .passwordRealm({
    //     username,
    //     password,
    //     realm: "Username-Password-Authentication"
    //   })
    //   .then(credentials => {
    //     onSuccess(credentials);
    //     callback({
    //       success: true,
    //       payload
    //     });
    //   })
    //   .catch(error => console.log({ error }));
  };

  return loading ? null : (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>InPlayer Demo</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        placeholderTextColor={"white"}
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        placeholderTextColor={"white"}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.remindPassword}>
        Forgotten your Username or Password?
      </Text>
      <TouchableOpacity onPress={login}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
