import * as R from "ramda";
import { fontcolor, fontsize } from "../Config/DefaultStyles";

function getPluginData(screenData) {
  let pluginData = {};

  if (screenData && screenData.general) {
    pluginData = { ...pluginData, ...screenData.general };
    validateStyles(pluginData);
  }

  return pluginData;
}

function validateStyles(pluginData) {
  const keys = Object.keys(pluginData);
  keys.forEach((key) => {
    const type = key.split("_").pop();
    if (type === "fontsize" || type === "fontcolor") {
      validateKey(type, key, pluginData);
    }
  });
}

function validateKey(type, key, pluginData) {
  const keysValidation = {
    fontsize: validateFontsize,
    fontcolor: validateFontcolor,
  };

  return keysValidation[type](key, pluginData);
}

const validateFontsize = (key, pluginData) => {
  const value = pluginData[key];
  const keyname = R.replace("_fontsize", "", key);

  const num = Number(value);
  pluginData[key] = Number.isFinite(num) ? num : fontsize[keyname];
};

const validateFontcolor = (key, pluginData) => {
  const value = pluginData[key];
  const keyname = R.replace("_fontcolor", "", key);

  pluginData[key] =
    value !== undefined && value !== null ? value : fontcolor[keyname];
};

export { getPluginData };
