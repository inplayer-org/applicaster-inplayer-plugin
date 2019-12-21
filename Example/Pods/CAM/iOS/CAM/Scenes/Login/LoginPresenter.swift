//
//  LoginPresenter.swift
//  CAMFramework
//
//  Created by Egor Brel on 4/29/19.
//  Copyright © 2019 Egor Brel. All rights reserved.
//

import Foundation
import ZappPlugins

protocol LoginViewProtocol: AnyObject {
    func showError(description: String?)
    func showLoadingScreen(_ show: Bool)
    func updateTable(fields: [AuthField])
}

class LoginPresenter {
    
    unowned var view: LoginViewProtocol
    unowned var coordinatorDelegate: AuthorizationCoordinatorProtocol
    unowned var camDelegate: CAMDelegate
    
    var isRoot: Bool = false
    
    init(view: LoginViewProtocol,
         coordinatorDelegate: AuthorizationCoordinatorProtocol,
         camDelegate: CAMDelegate) {
        self.view = view
        self.coordinatorDelegate = coordinatorDelegate
        self.camDelegate = camDelegate
    }
    
    func viewDidLoad() {
        if let json = camDelegate.getPluginConfig()[CAMKeys.authFields.rawValue],
           let data = json.data(using: .utf8) {
            if let jsonAuthFields = try? JSONDecoder().decode(AuthFields.self, from: data),
               let loginFields = jsonAuthFields.login {
                view.updateTable(fields: loginFields)
            }
        }
    }
    
    func showResetPasswordScreen() {
        coordinatorDelegate.showResetPasswordScreen()
    }
    
    func showSignUpScreen() {
        ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: AnalyticsEvents.switchToSignUpScreen)
        if isRoot {
            coordinatorDelegate.showSingUpScreen(isCoordinatorRootController: false)
        } else {
            coordinatorDelegate.popCurrentScreen()
        }
    }
    
    func close() {
        coordinatorDelegate.finishCoordinatorFlow(result: false)
    }
    
    func backToPreviousScreen() {
        coordinatorDelegate.popCurrentScreen()
        if isRoot {
            coordinatorDelegate.finishCoordinatorFlow(result: false)
        }
    }
    
    func login(data: [AuthField]) {
        let playableInfo = camDelegate.playableItemInfo
        let tapLoginEvent = AnalyticsEvents.tapStandardLoginButton(playableInfo)
        ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: tapLoginEvent)
        
        view.showLoadingScreen(true)
        if let data = validate(data: data) {
            camDelegate.login(authData: data, completion: { [weak self] (result) in
                guard let self = self else { return }
                
                switch result {
                case .success:
                    let successLoginEvent = AnalyticsEvents.standardLoginSuccess(playableInfo)
                    ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: successLoginEvent)
                    self.coordinatorDelegate.finishCoordinatorFlow(result: true)
                case .failure(let error):
                    let failureLoginEvent = AnalyticsEvents.standardLoginFailure(playableInfo)
                    ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: failureLoginEvent)
                    let viewAlertEvent = AnalyticsEvents.makeViewAlert(from: error)
                    ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: viewAlertEvent)
                    AnalyticsEvents.userFlow.append("Failed Attempt")
                    
                    self.view.showLoadingScreen(false)
                    self.view.showError(description: error.localizedDescription)
                }
            })
        } else {
            view.showLoadingScreen(false)
        }
    }
    
    func validate(data: [AuthField]) -> [String: String]? {
        var data = data
        var isSucceed = true
        var result = [String: String]()
        for index in 0..<data.count {
            if data[index].mandatory && (data[index].text ?? "").isEmpty {
                isSucceed = false
                data[index].state = .error
                data[index].errorDescription = camDelegate.getPluginConfig()[CAMKeys.emptyFieldsMessage.rawValue] ?? ""
                continue
            }
            if data[index].type == .email && !(data[index].text ?? "").isEmailValid() {
                isSucceed = false
                data[index].state = .error
                data[index].errorDescription = camDelegate.getPluginConfig()[CAMKeys.wrongEmailMessage.rawValue] ?? ""
                continue
            }
            if let key = data[index].key {
                result[key] = data[index].text
            }
        }
        if isSucceed {
            return result
        } else {
            view.showLoadingScreen(false)
            view.updateTable(fields: data)
        }
        return nil
    }
    
    func showFacebookAuthScreen() {
        let playableInfo = camDelegate.playableItemInfo
        let tapLoginEvent = AnalyticsEvents.tapAlternativeLogin(playableInfo)
        ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: tapLoginEvent)
        
        view.showLoadingScreen(true)

        guard let facebookClient = ZAAppConnector.sharedInstance().facebookAccountKitDelegate else {
            self.view.showLoadingScreen(false)
            return
        }
        facebookClient.authorizeFacebook(true, readPermissions: ["public_profile", "email"],
                                         completion: { (isUserLogged, error) in
            if isUserLogged {
                self.getFacebookUser(client: facebookClient)
            } else {
                let cancelLoginEvent = AnalyticsEvents.alternativeLoginCancel(playableInfo)
                ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: cancelLoginEvent)
                AnalyticsEvents.userFlow.append("Failed Attempt")
                
                self.view.showLoadingScreen(false)
                if let error = error {
                    self.view.showError(description: error.localizedDescription)
                }
            }
        })
    }
    
    func getFacebookUser(client: ZAAppDelegateConnectorFacebookAccountKitProtocol) {
        client.clientRequest(withGraphPath: "me", withParams: ["fields": "id, email"], withHTTPMethod: "GET",
                             withCompletionHandler: { (_, result, error) in
            if let error = error {
                self.view.showLoadingScreen(false)
                self.view.showError(description: error.localizedDescription)
                return
            }
            if let fields = result as? [String: Any],
               let userId = fields["id"] as? String,
               let email = fields["email"] as? String {
                self.facebookLogin(email: email, userId: userId)
            }
        })
    }
    
    func facebookLogin(email: String, userId: String) {
        let playableInfo = camDelegate.playableItemInfo

        self.camDelegate.facebookLogin(userData: (email: email, userId: userId), completion: { [weak self] (result) in
            guard let self = self else { return }
            self.view.showLoadingScreen(false)
            switch result {
            case .success:
                let successLoginEvent = AnalyticsEvents.alternativaLoginSucess(playableInfo)
                ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: successLoginEvent)
                self.coordinatorDelegate.finishCoordinatorFlow(result: true)
            case .failure(let error):
                let failureLoginEvent = AnalyticsEvents.alternativaLoginFailure(playableInfo)
                ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: failureLoginEvent)
                self.view.showError(description: error.localizedDescription)
            }
        })
    }
}
