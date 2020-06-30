import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";

import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
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
    var infoText = screenStyles?.logout_title_succeed_text;

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

    const performSignOut = () => {
        signOut()
            .then(async (didLogout) => {
                if (didLogout) {
                    await removeIdToken();
                    setTimeout(() => {
                        invokeCompleteAction();
                    }, 2000);
                } else {
                    navigator.goBack();
                }
            })
            .catch(() => {
                infoText = screenStyles?.logout_title_fail_text;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const textStyle = {
        fontFamily: platformSelect({
            ios: screenStyles?.logout_title_font_ios,
            android: screenStyles?.logout_title_font_android,
        }),
        fontSize: screenStyles?.logout_title_font_size,
        color: screenStyles?.logout_title_font_color,
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
            ) : (
                <Text style={textStyle}>{infoText}</Text>
            )}
        </View>
    );
};

export default LogoutFlow;
