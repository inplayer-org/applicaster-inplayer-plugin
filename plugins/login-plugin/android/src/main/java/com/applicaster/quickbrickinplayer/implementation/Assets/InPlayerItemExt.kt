package com.applicaster.quickbrickinplayer.implementation.Assets


import com.applicaster.quickbrickinplayer.utils.writableArrayOf
import com.applicaster.quickbrickinplayer.utils.writableMapOf
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.sdk.inplayer.model.assets.InPlayerAccessFee
import com.sdk.inplayer.model.assets.InPlayerItem
import com.sdk.inplayer.model.assets.InPlayerItemAccess

enum class InPlayerItemKeys(val shorthand: String) {
    AccessControlType("access_control_type"),
    CreatedAt("created_at"),
    Id("id"),
    IsActive("is_active"),
    ItemType("item_type"),
    MerchantId("merchant_id"),
    MerchantUuid("merchant_uuid"),
    Metadata("metadata"),
    Metahash("metahash"),
    Title("title"),
    UpdatedAt("updated_at"),
    Content("content"),
}

class InPlayerItemExt {
    companion object {
        fun wrapToMap(model: InPlayerItem): WritableMap {
            val map: WritableMap = Arguments.createMap()

            map.putDouble(InPlayerItemKeys.CreatedAt.shorthand, model.createdAt.toDouble())
            map.putDouble(InPlayerItemKeys.Id.shorthand, model.id.toDouble())
            map.putBoolean(InPlayerItemKeys.IsActive.shorthand, model.isActive)
            map.putDouble(InPlayerItemKeys.MerchantId.shorthand, model.merchantId.toDouble())
            map.putString(InPlayerItemKeys.MerchantUuid.shorthand, model.merchantUUID)
            map.putString(InPlayerItemKeys.Title.shorthand, model.title)
            map.putDouble(InPlayerItemKeys.UpdatedAt.shorthand, model.updatedAt.toDouble())

            map.putMap(InPlayerItemKeys.Metahash.shorthand, writableMapOf(model.metahash))


            map.putArray(InPlayerItemKeys.Metadata.shorthand, writableArrayOf(model.metadata.map { InPlayerItemMetadataExt.wrapToMap(it)}))

            map.putMap(InPlayerItemKeys.AccessControlType.shorthand, InPlayerAccessControlTypeExt.wrapToMap(model.accessControlType))
            map.putMap(InPlayerItemKeys.ItemType.shorthand, InPlayerItemTypeExt.wrapToMap(model.itemType))

//model.accessFees

            return map
        }

    }
}
//val accessFees: List<InPlayerAccessFee>
//
//val content: InPlayerItem.InPlayerAsset
