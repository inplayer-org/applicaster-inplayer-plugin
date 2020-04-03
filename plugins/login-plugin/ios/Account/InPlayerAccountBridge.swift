//
//  InPlayerAccountBridge.swift
//  InPlayerLogin
//
//  Created by Anton Kononenko on 4/3/20.
//

import Foundation
import InPlayerSDK
import React
import ZappCore

struct InPlayerAccountBridgeKeys {
    static let fullName = "fullName"
    static let email = "email"
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

    @objc func signUp(payload: [String: Any]?,
                      resolver: @escaping RCTPromiseResolveBlock,
                      rejecter: @escaping RCTPromiseRejectBlock) {
        guard let fullName = payload?[InPlayerAccountBridgeKeys.fullName] as? String,
            let email = payload?[InPlayerAccountBridgeKeys.email] as? String,
            let password = payload?[InPlayerAccountBridgeKeys.password] as? String else {
            rejecter("ErrorCode", "Error", nil)

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

    @objc func authenticate(payload: [String: Any]?,
                            resolver: @escaping RCTPromiseResolveBlock,
                            rejecter: @escaping RCTPromiseRejectBlock) {
        guard let email = payload?[InPlayerAccountBridgeKeys.email] as? String,
            let password = payload?[InPlayerAccountBridgeKeys.password] as? String else {
            rejecter("ErrorCode", "Error", nil)

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

    @objc func isAuthenticated(resolver: @escaping RCTPromiseResolveBlock,
                               rejecter: @escaping RCTPromiseRejectBlock) {
        resolver(InPlayer.Account.isAuthenticated())
    }

    @objc func signOut(resolver: @escaping RCTPromiseResolveBlock,
                       rejecter: @escaping RCTPromiseRejectBlock) {
        InPlayer.Account.signOut(success: {
            resolver(true)
        }) { (error: InPlayerError) in
            rejecter("\(error.code)",
                     error.message,
                     error.originalError)
        }
    }
}
