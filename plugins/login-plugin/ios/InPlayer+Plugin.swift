//
//  InPlayerLogin.swift
//  InPlayerLogin
//
//  Created by Anton Kononenko on 4/2/20.
//

import Foundation
import InPlayerSDK
import ZappCore

struct InPlayerLoginKey {
    static let publisherUUID = "in_player_publisher_id"
    static let referrer = "in_player_referrer"
}

struct InPlayerSharredSession {
    static let sharedSessionStorage = "shared_in_player_session_storage"
    static let isInPlayerInitialized = "is_in_player_initialized"
}

extension InPlayer {
  

    class func inPlayerSDKInitialization(payload: [String: Any]?) -> Bool {
        let sessionStorage = FacadeConnector.connector?.storage
        guard isInitialized() == false else {
            return true
        }

        guard let uuid = payload?[InPlayerLoginKey.publisherUUID] as? String,
            let referrer = payload?[InPlayerLoginKey.referrer] as? String else {
            return false
        }

        let configuration = InPlayer.Configuration(clientId: uuid,
                                                   referrer: referrer,
                                                   environment: .staging)
        InPlayer.initialize(configuration: configuration)

        _ = sessionStorage?.sessionStorageSetValue(for: InPlayerSharredSession.isInPlayerInitialized,
                                                   value: "true",
                                                   namespace: InPlayerSharredSession.sharedSessionStorage)
        return true
    }

    class func isInitialized() -> Bool {
        let sessionStorage = FacadeConnector.connector?.storage

        guard let resultString = sessionStorage?.sessionStorageValue(for: InPlayerSharredSession.isInPlayerInitialized,
                                                                     namespace: InPlayerSharredSession.sharedSessionStorage),
            Bool(resultString) == true else {
            return false
        }
        return true
    }
}
