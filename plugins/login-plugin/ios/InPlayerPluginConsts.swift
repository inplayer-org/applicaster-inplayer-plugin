//
//  InPlayerPluginConsts.swift
//  InPlayerLogin
//
//  Created by Anton Kononenko on 4/2/20.
//

import Foundation
import InPlayerSDK
import ZappCore

struct InPlayerRejection {
    let code: String
    let message: String
}

let noCredentialsError = InPlayerRejection(code: "-1",
                                           message: "Can not initialize inPlayer, Payload does not contain expected inPlayer credentials: in_player_client_id, in_player_referrer")

let noExpectedPayloadParams = InPlayerRejection(code: "-2",
                                                message: "One of the expected params was not provided in Payload:")
