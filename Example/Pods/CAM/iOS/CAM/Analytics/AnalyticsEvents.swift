//
//  AnalyticsEvents.swift
//  CAM
//
//  Created by Roman Karpievich on 7/9/19.
//

import Foundation
import StoreKit
import ZappPlugins

public enum Trigger: String {
    case tapCell = "Tap Cell"
    case appLaunch = "App Launch"
    case userAccountComponent = "UserAccounts Component"
    
    var key: String {
        return "Trigger"
    }
    
    var metadata: [String: String] {
        return [key: rawValue]
    }
}

extension CAMFlow {
    var firstScreen: String {
        switch self  {
        case .authentication:
            return "Login"
        case .storefront:
            return "Storefront"
        case .authAndStorefront:
            return "Login"
        case .logout:
            return "Logout"
        case .no:
            return "No"
        }
    }
}

enum AnalyticsEvents {
    case tapStandardLoginButton(PlayableItemInfo)
    case standardLoginSuccess(PlayableItemInfo)
    case standardLoginFailure(PlayableItemInfo)
    case tapAlternativeLogin(PlayableItemInfo)
    case alternativaLoginSucess(PlayableItemInfo)
    case alternativaLoginFailure(PlayableItemInfo)
    case alternativeLoginCancel(PlayableItemInfo)
    case tapStandardSignUpButton(PlayableItemInfo)
    case standardSignUpSuccess(PlayableItemInfo)
    case standardSignUpFailure(PlayableItemInfo)
    case tapAlternativeSignUp(PlayableItemInfo)
    case alternativeSignUpSuccess(PlayableItemInfo)
    case alternativeSignUpFailure(PlayableItemInfo)
    case alternativeSignUpCancel(PlayableItemInfo)
    case launchContentGatewayPlugin(Trigger, firstScreen: String, PlayableItemInfo)
    case contentGatewaySession(Trigger)
    case switchToLoginScreen
    case switchToSignUpScreen
    case launchPasswordResetScreen
    case resetPassword
    case viewAlert(AlertInfo, apiError: String?)
    case tapPurchaseButton(PlayableItemInfo, PurchaseProperties?)
    case completePurchase(PlayableItemInfo, PurchaseProperties?)
    case cancelPurchase(PlayableItemInfo, PurchaseProperties?)
    case storePurchaseError(Error, PlayableItemInfo, PurchaseProperties?)
    case tapRestorePurchaseLink(PlayableItemInfo)
    case startRestorePurchase(PlayableItemInfo)
    case completeRestorePurchase(PlayableItemInfo, [PurchaseProperties?])
    case storeRestorePurchaseError(Error, PlayableItemInfo, PurchaseProperties?)
    
    static var userFlow: [String] = []
    
    var key: String {
        switch self {
        case .tapStandardLoginButton: return "Tap Standard Login Button"
        case .standardLoginSuccess: return "Standard Login Success"
        case .standardLoginFailure: return "Standard Login Failure"
        case .tapAlternativeLogin: return "Tap Alternative Login"
        case .alternativaLoginSucess: return "Alternative Login Success"
        case .alternativaLoginFailure: return "Alternative Login Failure"
        case .alternativeLoginCancel: return "Alternative Login Cancel"
        case .tapStandardSignUpButton: return "Tap Standard Sign-Up Button"
        case .standardSignUpSuccess: return "Standard Sign-Up Success"
        case .standardSignUpFailure: return "Standard Sign-Up Failure"
        case .tapAlternativeSignUp: return "Tap Alternative Sign-Up"
        case .alternativeSignUpSuccess: return "Alternative Sign-Up Success"
        case .alternativeSignUpFailure: return "Alternative Sign-Up Failure"
        case .alternativeSignUpCancel: return "Alternative Sign-Up Cancel"
        case .launchContentGatewayPlugin: return "Launch Content Gateway Plugin"
        case .contentGatewaySession: return "Content Gateway Session"
        case .switchToLoginScreen: return "Switch to Login Screen"
        case .switchToSignUpScreen: return "Switch to Sign-Up Screen"
        case .launchPasswordResetScreen: return "Launch Password Reset Screen"
        case .resetPassword: return "Reset Password"
        case .viewAlert: return "View Alert"
        case .tapPurchaseButton: return "Tap Purchase Button"
        case .completePurchase: return "Complete Purchase"
        case .cancelPurchase: return "Cancel Purchase"
        case .storePurchaseError: return "Store Purchase Error"
        case .tapRestorePurchaseLink: return "Tap Restore Purchase Link"
        case .startRestorePurchase: return "Start Restore Purchase"
        case .completeRestorePurchase: return "Complete Restore Purchase"
        case .storeRestorePurchaseError: return "Store Restore Purchase Error"
        }
    }
    
    var metadata: [String: Any] {
        var metadata: [String: Any] = ["Plugin Provider": loginPluginName]
        switch self {
        case .tapStandardLoginButton(let info),
             .standardLoginSuccess(let info),
             .standardLoginFailure(let info),
             .tapAlternativeLogin(let info),
             .alternativaLoginSucess(let info),
             .alternativaLoginFailure(let info),
             .alternativeLoginCancel(let info),
             .tapStandardSignUpButton(let info),
             .standardSignUpSuccess(let info),
             .standardSignUpFailure(let info),
             .tapAlternativeSignUp(let info),
             .alternativeSignUpSuccess(let info),
             .alternativeSignUpFailure(let info),
             .alternativeSignUpCancel(let info):
            metadata = metadata.merge(info.metadata)
        case .launchContentGatewayPlugin(let trigger, let firstScreen, let info):
            metadata = metadata
                .merge(trigger.metadata)
                .merge(["First Screen": firstScreen])
                .merge(info.metadata)
        case .contentGatewaySession(let trigger):
            let action = AnalyticsEvents.userFlow.joined(separator: " & ")
            metadata = metadata
                .merge(trigger.metadata)
                .merge(["Action": action])
        case .switchToLoginScreen,
             .switchToSignUpScreen,
             .launchPasswordResetScreen,
             .resetPassword:
            break
        case .viewAlert(let alert, let apiError):
            metadata = metadata
                .merge(alert.metadata)
                .merge(["API Error Message": apiError ?? kNoneProvided])
        case .tapPurchaseButton(let info, let voucher):
            metadata = metadata
                .merge(info.metadata)
                .merge(voucher?.metadata ?? [:])
        case .completePurchase(let info, let voucher),
             .cancelPurchase(let info, let voucher):
            metadata = metadata
                .merge(["Purchase Entity Name": info.name])
                .merge(voucher?.metadata ?? [:])
        case .storePurchaseError(let error, let info, let voucher):
            metadata = metadata
                .merge(["Error Message": error.localizedDescription])
                .merge(["Error Code ID": error.code])
                .merge(["Purchase Entity Name": info.name])
                .merge(voucher?.metadata ?? [:])
            switch error {
            case let skError as SKError:
                metadata = metadata.merge(["Error Code ID": "\(skError.errorCode)"])
            case let nsError as NSError:
                metadata = metadata.merge(["Error Code ID": "\(nsError.code)"])
            default:
                break
            }
        case .tapRestorePurchaseLink(let info),
             .startRestorePurchase(let info):
            metadata = metadata.merge(info.metadata)
        case .completeRestorePurchase(let info, let purchaseProperties):
            metadata = metadata
                .merge(["Purchase Entity Name": info.name])
                .merge([PurchaseProperties.key: purchaseProperties.compactMap({ $0?.metadata })])
        case .storeRestorePurchaseError(let error, let info, _):
            metadata = metadata
                .merge(["Error Message": error.localizedDescription])
                .merge(["Error Code ID": error.code])
                .merge(["Purchase Entity Name": info.name])
                .merge([PurchaseProperties.key: kNoneProvided])
        }
        
        return metadata
    }
    
    private var loginPluginName: String {
        return ZPPluginManager.pluginModel(.Login)?.pluginName ?? ""
    }
    
    static public func makeViewAlert(from error: Error) -> AnalyticsEvents {
        return AnalyticsEvents.viewAlert(AlertInfo(title: kNoneProvided,
                                                   description: error.localizedDescription,
                                                   isConfirmation: IsConfirmationAlert.no),
                                         apiError: error.localizedDescription)
    }
}

private extension Error {
    var code: String {
        switch self {
        case let error as SKError:
        return "\(error.code)"
        case let error as NSError:
            return "\(error.code)"
        default:
            return kNoneProvided
        }
    }
}

private let kNoneProvided = "None provided"
