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

export function prepareActionSheetDataSource(data) {
  var actionSheetDataSource = data.map((item) => {
    return `${item.title}: ${item.price}`;
  });
  actionSheetDataSource.push("Cancel");
  return actionSheetDataSource;
}

export function cancelButtonIndex(actionSheetDataSource) {
  return actionSheetDataSource.length - 1;
}
