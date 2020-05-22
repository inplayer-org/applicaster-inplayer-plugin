export function invokeCallBack(
  props,
  { success = true, newPayload = null, error = null }
) {
  const { payload, assetFlowCallback } = props;
  assetFlowCallback &&
    assetFlowCallback({
      success,
      payload: newPayload || payload,
      error,
    });
}

export const unknownError = {
  message: "Unknown Error",
};

export function prepareActionSheetDataSource(data) {
  var actionSheetDataSource = data.map((item) => {
    return `${item.localizedTitle}: ${item.priceLocale}`;
  });
  // Add distruction button
  actionSheetDataSource.push("Cancel");
  return actionSheetDataSource;
}

export function cancelButtonIndex(actionSheetDataSource) {
  return actionSheetDataSource.length - 1;
}
