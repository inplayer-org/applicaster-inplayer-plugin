import React, { useState, useEffect } from "react";
import { Alert, View, ActivityIndicator } from "react-native";

import { useNavigation } from "@applicaster/zapp-react-native-utils/reactHooks/navigation";
import { signOut } from "../../Services/inPlayerService";
import { removeFromLocalStorage} from "../../Utils/UserAccount";

const LogoutFlow = (props) => {
    const [loading, setLoading] = useState(true);
    const navigator = useNavigation();
    const {
        configuration: { logout_completion_action = "go_back" },
    } = props;
    const { screenStyles } = props;

    const invokeCompleteAction = () => {
        if (logout_completion_action === "go_home") {
            navigator.goHome();
        } else {
            navigator.goBack();
        }
    };
    useEffect(() => {
        navigator.hideNavBar();
        performSignOut();
    }, []);


    const removeIdToken = async () => {
        await removeFromLocalStorage('idToken');
    }

    const showLogoutError = () => {
        const errorMessage = screenStyles?.logout_fail_text;
        const buttonText = screenStyles?.logout_fail_button_text;
        Alert.alert("",
                    errorMessage,
                    [{text: buttonText, onPress: () => navigator.goBack()}
                    ]
        );
    }

    const performSignOut = () => {
        signOut()
            .then((didLogout) => {
                if (didLogout) {
                    removeIdToken();
                    setTimeout(() => {
                        invokeCompleteAction();
                    }, 2000);
                } else {
                    showLogoutError();
                }
            })
            .catch(() => {
                showLogoutError();
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: screenStyles?.logout_background_color,
                alignItems: "center",
                height: "100%",
                justifyContent: "center",
            }}
        >
            {loading === true ? (
                <ActivityIndicator color={"white"} size={"large"} />
            ) : null }
        </View>
    );
};

export default LogoutFlow;
