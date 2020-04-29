package com.applicaster.quickbrickinplayer.implementation.Assets

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.sdk.inplayer.model.assets.InPlayerAccessControlType

enum class InPlayerAccessControlTypeKeys(val shorthand: String) {
    Id("id"),
    Auth("auth"),
    Name("name"),

}

class InPlayerAccessControlTypeExt {
    companion object {
        fun wrapToMap(model: InPlayerAccessControlType): WritableMap {
            val map: WritableMap = Arguments.createMap()

            map.putDouble(InPlayerAccessControlTypeKeys.Id.shorthand, model.id.toDouble())
            map.putBoolean(InPlayerAccessControlTypeKeys.Auth.shorthand, model.auth)
            map.putString(InPlayerAccessControlTypeKeys.Name.shorthand, model.name)

            return map
        }

    }
}
