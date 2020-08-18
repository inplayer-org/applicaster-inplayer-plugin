import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";

const ClientLogo = ({ imageSrc }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    Image.getSize(imageSrc, (width, height) => {
      setSize({ width, height });
    });
  }, []);

  return <Image style={size} source={{ uri: imageSrc }} />;
};

ClientLogo.propTypes = { imageSrc: PropTypes.string };

export default ClientLogo;
