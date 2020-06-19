import R from "ramda";

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

export function mergeFeesTitlesIfNeeded({ storeFeesData, inPlayerFeesData }) {
  for (let i = 0; i < storeFeesData.length; i++) {
    const storeFee = storeFeesData[i];
    console.log({ storeFee });
    if (storeFee.title == null || storeFee.title.length === 0) {
      const inPlayerFee = R.find(
        R.propEq("productIdentifier", storeFee.productIdentifier)
      )(inPlayerFeesData);
      console.log({ inPlayerFeesData });
      if (inPlayerFee?.title) {
        storeFee.title = inPlayerFee.title;
      }
    }
  }
}
