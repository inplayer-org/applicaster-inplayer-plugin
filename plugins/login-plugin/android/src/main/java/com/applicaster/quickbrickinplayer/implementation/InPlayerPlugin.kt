package com.applicaster.quickbrickinplayer.implementation

import com.applicaster.session.SessionStorage
import com.facebook.react.bridge.ReactApplicationContext
import com.sdk.inplayer.configuration.InPlayer
import org.json.JSONObject

class InPlayerPlugin {
    companion object {
        private const val sharedSessionStorage = "shared_in_player_session_storage"
        private const val isInPlayerInitialized = "is_in_player_initialized"

        fun inPlayerSDKInitialization(context: ReactApplicationContext,
                                      jsonObject:JSONObject): Boolean {

            if (isInPlayerInitialized()) {
                return true
            }

            val inPlayerReferrer = jsonObject.getString("in_player_referrer")
            val inPlayerClientId = jsonObject.getString("in_player_client_id")
            if (inPlayerClientId.isNullOrEmpty()) {
                return false
            }

            InPlayer.initialize(InPlayer.Configuration.Builder(context, inPlayerClientId)
                    .withReferrer(inPlayerReferrer)
                    .withEnvironment(InPlayer.EnvironmentType.STAGING)
                    .build())
            SessionStorage.set(isInPlayerInitialized,"true",sharedSessionStorage)
            return true
        }

        private fun isInPlayerInitialized(): Boolean {
            var isInitialized = SessionStorage.get(isInPlayerInitialized, sharedSessionStorage)?.toBoolean()
            return  isInitialized ?: false
        }
    }
}
