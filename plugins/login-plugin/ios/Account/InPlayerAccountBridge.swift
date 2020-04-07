import Foundation
import InPlayerSDK
import React
import ZappCore

struct InPlayerAccountBridgeKeys {
    static let fullName = "fullName"
    static let email = "username"
    static let password = "password"
}

@objc(InPlayerAccountBridge)
class InPlayerAccountBridge: NSObject, RCTBridgeModule {
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

    @objc func signUp(_ payload: [String: Any]?,
                      resolver: @escaping RCTPromiseResolveBlock,
                      rejecter: @escaping RCTPromiseRejectBlock) {
        guard InPlayer.inPlayerSDKInitialization(payload: payload) else {
            rejecter(noCredentialsError.code,
                     noCredentialsError.message,
                     nil)
            return
        }
        guard let fullName = payload?[InPlayerAccountBridgeKeys.fullName] as? String,
            let email = payload?[InPlayerAccountBridgeKeys.email] as? String,
            let password = payload?[InPlayerAccountBridgeKeys.password] as? String else {
            rejecter(noExpectedPayloadParams.code,
                     "\(noExpectedPayloadParams.message) fullName, email, password",
                     nil)

            return
        }

        InPlayer.Account.signUp(fullName: fullName,
                                email: email,
                                password: password,
                                passwordConfirmation: password,
                                success: { (autorization: InPlayerAuthorization) in
                                    let autorizationWrapper = InPlayerAuthorization.wrapToDictionary(authorization: autorization)
                                    resolver(autorizationWrapper)

        }) { (error: InPlayerError) in
            rejecter("\(error.code)",
                     error.message,
                     error.originalError)
        }
    }

    @objc func authenticate(_ payload: [String: Any]?,
                            resolver: @escaping RCTPromiseResolveBlock,
                            rejecter: @escaping RCTPromiseRejectBlock) {
        guard InPlayer.inPlayerSDKInitialization(payload: payload) else {
            rejecter(noCredentialsError.code,
                     noCredentialsError.message,
                     nil)
            return
        }

        guard let email = payload?[InPlayerAccountBridgeKeys.email] as? String,
            let password = payload?[InPlayerAccountBridgeKeys.password] as? String else {
            rejecter(noExpectedPayloadParams.code,
                     "\(noExpectedPayloadParams.message) email, password",
                     nil)
            return
        }

        InPlayer.Account.authenticate(username: email,
                                      password: password,
                                      success: { (autorization: InPlayerAuthorization) in
                                          let autorizationWrapper = InPlayerAuthorization.wrapToDictionary(authorization: autorization)
                                          resolver(autorizationWrapper)
        }) { (error: InPlayerError) in
            rejecter("\(error.code)",
                     error.message,
                     error.originalError)
        }
    }

    @objc func isAuthenticated(_ payload: [String: Any]?,
                               resolver: @escaping RCTPromiseResolveBlock,
                               rejecter: @escaping RCTPromiseRejectBlock) {
        guard InPlayer.inPlayerSDKInitialization(payload: payload) else {
            rejecter(noCredentialsError.code,
                     noCredentialsError.message,
                     nil)
            return
        }
        resolver(InPlayer.Account.isAuthenticated())
    }

    @objc func signOut(_ payload: [String: Any]?,
                       resolver: @escaping RCTPromiseResolveBlock,
                       rejecter: @escaping RCTPromiseRejectBlock) {
        guard InPlayer.inPlayerSDKInitialization(payload: payload) else {
            rejecter(noCredentialsError.code,
                     noCredentialsError.message,
                     nil)
            return
        }

        InPlayer.Account.signOut(success: {
            resolver(true)
        }) { (error: InPlayerError) in
            rejecter("\(error.code)",
                     error.message,
                     error.originalError)
        }
    }
}
