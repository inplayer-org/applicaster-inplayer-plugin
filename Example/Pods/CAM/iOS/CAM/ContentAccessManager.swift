//
//  ContentAccessManager.swift
//  CAMFramework
//
//  Created by Egor Brel on 4/25/19.
//  Copyright © 2019 Egor Brel. All rights reserved.
//

import UIKit
import ZappPlugins

protocol PluginDataProviderProtocol: AnyObject {
    func getCamDelegate() -> CAMDelegate
}

protocol Coordinator: AnyObject {
    func start()
}

open class ContentAccessManager {
    
    private var navigationController: UINavigationController
    private var completion: (Bool) -> Void
    private var delegate: CAMDelegate
    private weak var rootViewController: UIViewController!
    private var childCoordinator: Coordinator?
    private var camFlow: CAMFlow
    
    public init(rootViewController: UIViewController,
                camDelegate: CAMDelegate,
                camFlow: CAMFlow,
                completion: @escaping (Bool) -> Void) {
        self.rootViewController = rootViewController
        self.delegate = camDelegate
        self.camFlow = camFlow
        self.completion = completion
        self.navigationController = UINavigationController()
        self.navigationController.modalPresentationStyle = .fullScreen
        self.navigationController.isNavigationBarHidden = true
    }
    
    public func startFlow() {
        camFlow.update(with: delegate.getPluginConfig(),
                       and: (delegate.isUserLoggedIn(), delegate.isPurchaseNeeded()))
        
        var firstScreen = camFlow.firstScreen
        if camFlow == .authentication || camFlow == .authAndStorefront {
            let dictionary = delegate.getPluginConfig()
            firstScreen = dictionary[CAMKeys.defaultAuthScreen.rawValue] ?? firstScreen
        }
        let launchEvent = AnalyticsEvents.launchContentGatewayPlugin(delegate.analyticsStorage().trigger,
                                                                     firstScreen: firstScreen,
                                                                     delegate.playableItemInfo)
        ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: launchEvent,
                                                                     timed: true)
        AnalyticsEvents.userFlow.removeAll()
        
        switch camFlow {
        case .authentication:
            startAuthenticationFlow()
        case .storefront:
            startStorefrontFlow()
        case .authAndStorefront:
            startAuthAndStorefrontFlow()
        case .logout:
            startLogoutFlow()
        case .no:
            completion(true)
        }
        
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(appSendToBackground),
                                               name: UIApplication.didEnterBackgroundNotification,
                                               object: nil)
    }
    
    // MARK: - Private methods
    
    private func startAuthenticationFlow() {
        authenticate { (isUserLogged) in
            self.finishFlow(isUserLogged)
        }
    }
    
    private func startStorefrontFlow() {
        purchase { (isPurchased) in
            self.finishFlow(isPurchased)
        }
    }
    
    private func startAuthAndStorefrontFlow() {
        authenticate { (isUserLogged) in
            if isUserLogged == true {
                if self.delegate.isPurchaseNeeded() {
                    self.startStorefrontFlow()
                } else {
                    self.finishFlow(true)
                }
            } else {
                self.finishFlow(false)
            }
        }
    }
    
    private func startLogoutFlow() {
        logout { (isLogoutSucceeded) in
            self.finishFlow(isLogoutSucceeded)
        }
    }
    
    private func authenticate(with completion: @escaping (Bool) -> Void) {
        rootViewController.present(navigationController, animated: true, completion: nil)
        childCoordinator = AuthorizationCoordinator(navigationController: self.navigationController,
                                                    parentCoordinator: self,
                                                    flow: .auth,
                                                    completion: completion)
        childCoordinator!.start()
    }
    
    private func logout(with completion: @escaping (Bool) -> Void) {
        childCoordinator = AuthorizationCoordinator(parentCoordinator: self,
                                                    rootViewController: rootViewController,
                                                    flow: .logout,
                                                    completion: completion)
        childCoordinator!.start()
    }
    
    private func purchase(with completion: @escaping (Bool) -> Void) {
        if navigationController.presentingViewController == nil {
            rootViewController.present(navigationController, animated: true, completion: nil)
        }
        
        childCoordinator = BillingCoordinator(navigationController: navigationController,
                                              parentCoordinator: self,
                                              completion: completion)
        childCoordinator!.start()
    }
    
    private func finishFlow(_ result: Bool) {
        if result == false {
            AnalyticsEvents.userFlow.append("Cancel")
        }
        let event = AnalyticsEvents.contentGatewaySession(delegate.analyticsStorage().trigger)
        ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: event,
                                                                     timed: true)
        
        childCoordinator = nil
        switch camFlow {
        case .logout:
            self.completion(result)
        default:
            navigationController.viewControllers.removeAll()
            self.navigationController.dismiss(animated: true, completion: {
                self.completion(result)
            })
        }
    }
    
    @objc private func appSendToBackground() {
        AnalyticsEvents.userFlow.append("Send app to background")
    }
}

extension ContentAccessManager: PluginDataProviderProtocol {
    
    func getCamDelegate() -> CAMDelegate {
        return delegate
    }
}
