import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { StyleSheet } from "react-native";

const mapKeyToStyle = (key, obj) => {
  return {
    fontFamily: platformSelect({
      ios: obj?.[`${key}_font_tvos`],
      android: obj?.[`${key}_font_android`],
    }),
    fontSize: Number(obj?.[`${key}_fontsize`]),
    color: obj?.[`${key}_fontcolor`],
  };
};

const getInputStyle = (backgroundColor) => {
  return {
    ...styles.input,
    backgroundColor: backgroundColor || "grey",
  };
};

const styles = {
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#787878",
    width: 600,
    height: 90,
  },
};

export { mapKeyToStyle, getInputStyle };
