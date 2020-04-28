package com.applicaster.quickbrickinplayer.implementation.Accounts

import com.applicaster.quickbrickinplayer.utils.writableArrayOf
import com.applicaster.quickbrickinplayer.utils.writableMapOf
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.sdk.inplayer.model.account.InPlayerUser

enum class InPlayerAccountKeys(val shorthand: String) {
    Completed("completed"),
    CreatedAt("created_at"),
    Email("email"),
    FullName("full_name"),
    Username("username"),
    Id("id"),
    Referrer("referrer"),
    Roles("roles"),
    UpdatedAt("updated_at"),
    Uuid("uuid"),
    MerchantId("merchant_id"),
    MerchantUUID("merchant_uuid"),
    Metadata("metadata"),
}

class InPlayerUserExt {
    companion object {
        fun wrapToMap(user: InPlayerUser): WritableMap {

            val map: WritableMap = Arguments.createMap()

            map.putDouble(InPlayerAccountKeys.CreatedAt.shorthand, user.createdAt.toDouble())
            map.putString(InPlayerAccountKeys.Email.shorthand, user.email)
            map.putString(InPlayerAccountKeys.FullName.shorthand, user.fullName)
            map.putInt(InPlayerAccountKeys.Id.shorthand, user.id.toInt())
            map.putBoolean(InPlayerAccountKeys.Completed.shorthand, user.isCompleted)
            map.putString(InPlayerAccountKeys.MerchantId.shorthand, user.merchantId)
            map.putString(InPlayerAccountKeys.MerchantUUID.shorthand, user.merchantUUID)
            map.putString(InPlayerAccountKeys.Uuid.shorthand, user.uuid)
            map.putDouble(InPlayerAccountKeys.UpdatedAt.shorthand, user.updatedAt.toDouble())
            map.putString(InPlayerAccountKeys.Referrer.shorthand, user.referrer)

            map.putMap(InPlayerAccountKeys.Metadata.shorthand, writableMapOf(user.metadata))
            map.putArray(InPlayerAccountKeys.Roles.shorthand, writableArrayOf(user.roles))

            return map
        }
    }
}