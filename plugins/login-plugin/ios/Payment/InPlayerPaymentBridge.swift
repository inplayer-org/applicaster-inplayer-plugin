import Foundation
import InPlayerSDK
import React
import ZappCore

struct InPlayerPaymentBridgeKeys {
    static let receiptString = "receiptString"
    static let productIdentifier = "productIdentifier"
}

@objc(InPlayerPaymentBridge)
class InPlayerPaymentBridge: NSObject, RCTBridgeModule {
    static func moduleName() -> String! {
        return "InPlayerAccountBridge"
    }

    public class func requiresMainQueueSetup() -> Bool {
        return true
    }

    /// prefered thread on which to run this native module
    @objc public var methodQueue: DispatchQueue {
        return DispatchQueue.main
    }

    @objc func validate(_ payload: [String: Any]?,
                        resolver: @escaping RCTPromiseResolveBlock,
                        rejecter: @escaping RCTPromiseRejectBlock) {
        guard InPlayer.inPlayerSDKInitialization(payload: payload) else {
            rejecter(noCredentialsError.code,
                     noCredentialsError.message,
                     nil)
            return
        }
        guard let receiptString = payload?[InPlayerPaymentBridgeKeys.receiptString] as? String,
            let productIdentifier = payload?[InPlayerPaymentBridgeKeys.productIdentifier] as? String else {
            rejecter(noExpectedPayloadParams.code,
                     "\(noExpectedPayloadParams.message) \(InPlayerPaymentBridgeKeys.receiptString), \(InPlayerPaymentBridgeKeys.productIdentifier)",
                     nil)

            return
        }

        InPlayer.Payment.validate(receiptString: receiptString, productIdentifier: productIdentifier, success: {
            resolver(true)
        }) { (error: InPlayerError) in
            rejecter("\(error.code)",
                     error.message,
                     error.originalError)
        }
    }
}
