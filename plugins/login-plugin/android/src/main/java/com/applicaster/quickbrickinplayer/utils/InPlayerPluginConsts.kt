package com.applicaster.quickbrickinplayer.utils

class InPlayerRejection(code: String, message: String) {
    val code = code
    val message = message
}

internal val noCredentialsError = InPlayerRejection("-1",
        "Can not initialize inPlayer, Payload does not contain expected inPlayer credentials: in_player_client_id, in_player_referrer")

internal val noExpectedPayloadParams = InPlayerRejection("-2",
        "One of the expected params was not provided in Payload:")
