import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";

import R from "ramda";

import { useNavigation } from "@applicaster/zapp-react-native-utils/reactHooks/navigation";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { signOut } from "@applicaster/quick-brick-inplayer/src/Services/inPlayerService";
import { removeFromLocalStorage} from "../../Utils/UserAccount";

const getScreenStyles = R.path(["screenData", "styles"]);

const LogoutFlow = (props) => {
    const [loading, setLoading] = useState(true);
    const navigator = useNavigation();
    const {
        configuration: { completion_action = "go_back" },
    } = props;

    const invokeCompleteAction = () => {
        if (completion_action === "go_home") {
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
            .then((didLogout) => {
                if (didLogout) {
                    removeIdToken();
                    setTimeout(() => {
                        invokeCompleteAction();
                    }, 2000);
                } else {
                    navigator.goBack();
                }
            })
            .catch(() => {
                //infoText = screenStyles?.title_fail_text;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                height: "100%",
                justifyContent: "center",
            }}
        >
            <ActivityIndicator color={"white"} size={"large"} />
        </View>
    );
};

export default LogoutFlow;
