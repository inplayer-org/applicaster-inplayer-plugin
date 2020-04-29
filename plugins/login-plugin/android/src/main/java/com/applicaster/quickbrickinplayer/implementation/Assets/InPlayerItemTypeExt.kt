package com.applicaster.quickbrickinplayer.implementation.Assets


import com.applicaster.quickbrickinplayer.utils.writableArrayOf
import com.applicaster.quickbrickinplayer.utils.writableMapOf
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.sdk.inplayer.model.assets.InPlayerItem
import com.sdk.inplayer.model.assets.InPlayerItemAccess
import com.sdk.inplayer.model.assets.InPlayerItemType

enum class InPlayerItemTypeKeys(val shorthand: String) {
    ContentType("content_type"),
    DescriptionField("description"),
    Host("host"),
    Id("id"),
    Name("name"),
}

class InPlayerItemTypeExt {
    companion object {
        fun wrapToMap(model: InPlayerItemType): WritableMap {
            val map: WritableMap = Arguments.createMap()

            map.putDouble(InPlayerItemTypeKeys.Id.shorthand, model.id.toDouble())
            map.putString(InPlayerItemTypeKeys.Name.shorthand, model.name)
            map.putString(InPlayerItemTypeKeys.Host.shorthand, model.host)
            map.putString(InPlayerItemTypeKeys.DescriptionField.shorthand, model.description)
            map.putString(InPlayerItemTypeKeys.ContentType.shorthand, model.contentType)

            return map
        }

    }
}
