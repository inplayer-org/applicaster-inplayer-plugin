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

class InPlayerLogin: NSObject, GeneralProviderProtocol {
    required init(pluginModel: ZPPluginModel) {
        model = pluginModel
    }

    var model: ZPPluginModel?

    var providerName: String {
        return "InPlayer"
    }

    func prepareProvider(_ defaultParams: [String: Any],
                         completion: ((Bool) -> Void)?) {
        if let configurationJSON = model?.configurationJSON,
            let uuid = configurationJSON[InPlayerLoginKey.publisherUUID] as? String,
            let reffer = configurationJSON[InPlayerLoginKey.referrer] as? String {
            let configuration = InPlayer.Configuration(clientId: uuid,
                                                       referrer: reffer,
                                                       environment: .staging)
            InPlayer.initialize(configuration: configuration)
        }

        completion?(true)
    }

    func disable(completion: ((Bool) -> Void)?) {
        completion?(true)
    }
}
