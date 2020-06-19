export function accessTypeToProducType({ fee, purchaseMapping }) {
  console.log({ purchaseMapping });
  const {
    consumable_type_mapper,
    non_consumable_type_mapper,
    subscription_type_mapper,
  } = purchaseMapping;
  const accessType = fee?.access_type?.name;

  if (accessType == consumable_type_mapper) {
    return "consumable";
  } else if (
    accessType == non_consumable_type_mapper ||
    accessType === "ppv_custom"
  ) {
    return "nonConsumable";
  } else if (accessType == subscription_type_mapper) {
    return "subscription";
  }
  return null;
}

export function purchaseDataForFee({
    fee,
    allPackagesData,
    assetId,
    purchaseMapping,
  }) {
    const { item_type, id, item_title, description } = fee;
    console.log({ fee });
    if (item_type === "package") {
      for (let i = 0; i < allPackagesData.length; i++) {
        const packageItem = allPackagesData[i];
        const packageId = packageItem?.id;
        const access_fees = packageItem?.access_fees;
        console.log({
          packageItem,
          packageId,
          access_fees,
          searchItem: R.find(R.propEq("id", id))(access_fees),
        });
        if (access_fees && packageId && R.find(R.propEq("id", id))(access_fees)) {
          console.log({
            productType: accessTypeToProducType({ fee, purchaseMapping }),
            productIdentifier: `${packageId}_${id}`,
          });
          return {
            productType: accessTypeToProducType({ fee, purchaseMapping }),
            productIdentifier: `${packageId}_${id}`,
            title: item_title || description,
          };
        }
      }
      return null;
    } else {
      console.log({
        productType: accessTypeToProducType({ fee, purchaseMapping }),
        productIdentifier: `${assetId}_${id}`,
      });
      return {
        productType: accessTypeToProducType({ fee, purchaseMapping }),
        productIdentifier: `${assetId}_${id}`,
        title: item_title || description,
      };
    }
  }