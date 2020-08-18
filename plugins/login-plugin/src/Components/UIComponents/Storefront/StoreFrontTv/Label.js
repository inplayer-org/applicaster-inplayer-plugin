import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

// Label.propTypes = {
//   title: String,
//   styles: { container: {}, text: {} },
// };

const Label = (props) => {
  const { styles, title } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Label;
