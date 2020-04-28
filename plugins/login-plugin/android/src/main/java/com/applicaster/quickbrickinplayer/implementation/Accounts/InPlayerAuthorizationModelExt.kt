package com.applicaster.quickbrickinplayer.implementation.Accounts


import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.sdk.inplayer.model.account.InPlayerAuthorizationModel

enum class InPlayerAuthorizationKeys(val shorthand: String) {
    AccessToken("access_token"),
    RefreshToken("refresh_token"),
    Account("account"),
}

class InPlayerAuthorizationModelExt {
    companion object {
        fun wrapToMap(model:InPlayerAuthorizationModel): WritableMap {
            val map: WritableMap = Arguments.createMap()

            map.putString(InPlayerAuthorizationKeys.AccessToken.shorthand, model.accessToken)
            map.putString(InPlayerAuthorizationKeys.RefreshToken.shorthand, model.refreshToken)
            map.putMap(InPlayerAuthorizationKeys.Account.shorthand, InPlayerUserExt.wrapToMap(model.account))

            return map
        }

    }
}
