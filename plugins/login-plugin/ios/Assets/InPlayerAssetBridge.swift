import Foundation
import InPlayerSDK
import React
import ZappCore

struct InPlayerAssetBridgeKeys {
    static let id = "id"
    static let entryId = "entryId"
}

@objc(InPlayerAssetBridge)
class InPlayerAssetBridge: NSObject, RCTBridgeModule {
    static func moduleName() -> String! {
        return "InPlayerAssetsBridge"
    }

    public class func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc public var methodQueue: DispatchQueue {
        return DispatchQueue.main
    }

    @objc func checkAccessForAsset(_ payload: [String: Any]?,
                                   resolver: @escaping RCTPromiseResolveBlock,
                                   rejecter: @escaping RCTPromiseRejectBlock) {
        guard InPlayer.inPlayerSDKInitialization(payload: payload) else {
            rejecter(noCredentialsError.code,
                     noCredentialsError.message,
                     nil)
            return
        }
        guard let idString = payload?[InPlayerAssetBridgeKeys.id] as? String,
            let id = Int(idString) else {
            rejecter(noExpectedPayloadParams.code,
                     "\(noExpectedPayloadParams.message) \(InPlayerAssetBridgeKeys.id)",
                     nil)

            return
        }
        let entryId = payload?[InPlayerAssetBridgeKeys.entryId] as? String

        InPlayer.Asset.checkAccessForAsset(id: id,
                                           entryId: entryId,
                                           success: { (access: InPlayerItemAccess) in
                                               let itemAccess = InPlayerItemAccess.wrapToDictionary(itemAccess: access)
                                               resolver(itemAccess)
        }) { (error: InPlayerError) in
            rejecter("\(error.code)",
                     error.message,
                     error.originalError)
        }
    }
}
