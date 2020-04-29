package com.applicaster.quickbrickinplayer.implementation.Assets


import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.sdk.inplayer.model.assets.InPlayerItemAccess

enum class InPlayerAuthorizationKeys(val shorthand: String) {
    AccountId("account_id"),
    CountryCode("country_code"),
    CreatedAt("created_at"),
    CustomerId("customer_id"),
    CustomerUuid("customer_uuid"),
    ExpiresAt("expires_at"),
    Id("id"),
    IpAddress("ip_address"),
    Item("item"),
}


class InPlayerItemAccessExt {
    companion object {
        fun wrapToMap(model: InPlayerItemAccess): WritableMap {
            val map: WritableMap = Arguments.createMap()

            map.putDouble(InPlayerAuthorizationKeys.AccountId.shorthand, model.accountId.toDouble())
            map.putString(InPlayerAuthorizationKeys.CountryCode.shorthand, model.countryCode)
            map.putDouble(InPlayerAuthorizationKeys.CreatedAt.shorthand, model.createdAt.toDouble())
            map.putDouble(InPlayerAuthorizationKeys.CustomerId.shorthand, model.customerId.toDouble())
            map.putString(InPlayerAuthorizationKeys.CustomerUuid.shorthand, model.customerUUID)
            map.putDouble(InPlayerAuthorizationKeys.ExpiresAt.shorthand, model.expiresAt.toDouble())
            map.putDouble(InPlayerAuthorizationKeys.Id.shorthand, model.id.toDouble())
            map.putString(InPlayerAuthorizationKeys.IpAddress.shorthand, model.ipAddress)
            map.putMap(InPlayerAuthorizationKeys.Item.shorthand, InPlayerItemExt.wrapToMap(model.itemEntity))

            return map
        }

    }
}
