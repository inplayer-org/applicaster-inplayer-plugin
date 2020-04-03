//
//  InPlayerLogin.swift
//  InPlayerLogin
//
//  Created by Anton Kononenko on 4/2/20.
//

import Foundation
import InPlayerSDK
import ZappCore

class InPlayerLogin: NSObject, GeneralProviderProtocol {
    required init(pluginModel: ZPPluginModel) {
        model = pluginModel
    }

    lazy var pluginConfiguration: [AnyHashable: Any] = {
        [:]
    }()

    var model: ZPPluginModel?

    var providerName: String {
        return "InPlayer"
    }

    func prepareProvider(_ defaultParams: [String: Any],
                         completion: ((Bool) -> Void)?) {
        let configuration = InPlayer.Configuration(clientId: "",
                                                   referrer: nil,
                                                   environment: .staging)
        InPlayer.initialize(configuration: configuration)
        
        completion?(true)
    }

    func disable(completion: ((Bool) -> Void)?) {
        completion?(true)
    }
}

