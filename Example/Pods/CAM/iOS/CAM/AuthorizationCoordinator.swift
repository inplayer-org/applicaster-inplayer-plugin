//
//  AuthorizationCoordinator.swift
//  CAMFramework
//
//  Created by Egor Brel on 4/26/19.
//  Copyright © 2019 Egor Brel. All rights reserved.
//

import UIKit
import ZappPlugins

enum AuthorizationCoordinatorFlow {
    case auth
    case logout
}

protocol AuthorizationCoordinatorProtocol: Coordinator {
    func showLoginScreen(isCoordinatorRootController: Bool)
    func showSingUpScreen(isCoordinatorRootController: Bool)
    func showResetPasswordScreen()
    func popCurrentScreen()
    func finishCoordinatorFlow(result: Bool)
}

class AuthorizationCoordinator: AuthorizationCoordinatorProtocol {

    var coordinatorFlow: AuthorizationCoordinatorFlow = .auth
    weak var rootViewController: UIViewController?
    weak var navigationController: UINavigationController?
    unowned var parentCoordinator: PluginDataProviderProtocol
    var completionHandler: ((Bool) -> Void)?
    
    public init(navigationController: UINavigationController? = nil,
                parentCoordinator: PluginDataProviderProtocol,
                rootViewController: UIViewController? = nil,
                flow: AuthorizationCoordinatorFlow,
                completion: @escaping (Bool) -> Void) {
        self.coordinatorFlow = flow
        self.rootViewController = rootViewController
        self.navigationController = navigationController
        self.parentCoordinator = parentCoordinator
        self.completionHandler = completion
    }
    
    // MARK: - AuthorizationCoordinatorProtocol
    
    func start() {
        switch coordinatorFlow {
        case .auth:
            startAuthFlow()
        case .logout:
            startLogoutFlow()
        }
    }
    
    func startAuthFlow() {
        let dictionary = self.parentCoordinator.getCamDelegate().getPluginConfig()
        switch dictionary[CAMKeys.defaultAuthScreen.rawValue] {
        case "Login":
            showLoginScreen(isCoordinatorRootController: true)
        case "Sign-up":
            showSingUpScreen(isCoordinatorRootController: true)
        default:
            return
        }
    }
    
    func startLogoutFlow() {
        showLogoutScreen()
    }
    
    func showLoginScreen(isCoordinatorRootController: Bool) {
        let controller = ViewControllerFactory.createLoginScreen(pluginDataProvider: parentCoordinator,
                                                                 isRoot: isCoordinatorRootController,
                                                                 authCoordinator: self)
        navigationController?.pushViewController(controller, animated: true)
    }
    
    func showLogoutScreen() {
        let controller = ViewControllerFactory.createLogoutScreen(pluginDataProvider: parentCoordinator,
                                                                  authCoordinator: self)
        self.rootViewController?.addChildViewController(controller)
    }
    
    func showSingUpScreen(isCoordinatorRootController: Bool) {
        let controller = ViewControllerFactory.createSignUpScreen(pluginDataProvider: parentCoordinator,
                                                                  isRoot: isCoordinatorRootController,
                                                                  authCoordinator: self)
        navigationController?.pushViewController(controller, animated: true)
    }
    
    func showResetPasswordScreen() {
        ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: AnalyticsEvents.launchPasswordResetScreen)
        let controller = ViewControllerFactory.createResetPasswordScreen(pluginDataProvider: parentCoordinator,
                                                                         authCoordinator: self)
        navigationController?.pushViewController(controller, animated: true)
    }
    
    func popCurrentScreen() {
        navigationController?.popViewController(animated: true)
    }
    
    func finishCoordinatorFlow(result: Bool) {
        switch coordinatorFlow {
        case .auth:
            let loggedInValue = result == true ? "Yes" : "No"
            let pluginName = ZPPluginManager.pluginModel(.Login)?.pluginName ?? ""
            
            ZAAppConnector.sharedInstance().pluginsDelegate?.analyticsPluginsManager?.setEventUserGenericProperties(["Logged In": loggedInValue,
            "Authentication Provider": pluginName])
        case .logout:
            break
        }
        completionHandler?(result)
    }
}
