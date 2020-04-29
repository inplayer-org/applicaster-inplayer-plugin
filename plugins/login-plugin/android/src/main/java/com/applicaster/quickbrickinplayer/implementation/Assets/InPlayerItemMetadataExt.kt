package com.applicaster.quickbrickinplayer.implementation.Assets


import com.applicaster.quickbrickinplayer.utils.writableArrayOf
import com.applicaster.quickbrickinplayer.utils.writableMapOf
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.sdk.inplayer.model.assets.InPlayerItem
import com.sdk.inplayer.model.assets.InPlayerItemAccess
import com.sdk.inplayer.model.assets.ItemMetadata

enum class InPlayerItemMetadataKeys(val shorthand: String) {
    Id("id"),
    Name("name"),
    Value("value"),
}

class InPlayerItemMetadataExt {
    companion object {
        fun wrapToMap(model: ItemMetadata): WritableMap {
            val map: WritableMap = Arguments.createMap()

            map.putDouble(InPlayerItemMetadataKeys.Id.shorthand, model.id.toDouble())
            map.putString(InPlayerItemMetadataKeys.Name.shorthand, model.name)
            map.putString(InPlayerItemMetadataKeys.Value.shorthand, model.value)

            return map
        }

    }
}
