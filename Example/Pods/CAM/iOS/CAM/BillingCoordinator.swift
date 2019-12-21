//
//  PaymentCoordinator.swift
//  CAMFramework
//
//  Created by Egor Brel on 5/3/19.
//  Copyright © 2019 Egor Brel. All rights reserved.
//

import Foundation

protocol BillingCoordinatorProtocol: Coordinator {
    func showEntitlementPicker()
    func showRedeemCodeScreen()
    func popCurrentScreen()
    func finishBillingFlow(isUserHasAccess: Bool)
}

class BillingCoordinator: BillingCoordinatorProtocol {
    
    unowned var navigationController: UINavigationController
    unowned var parentCoordinator: PluginDataProviderProtocol
    var completionHandler: (Bool) -> Void
    
    public init(navigationController: UINavigationController,
                parentCoordinator: PluginDataProviderProtocol,
                completion: @escaping (Bool) -> Void) {
        self.navigationController = navigationController
        self.parentCoordinator = parentCoordinator
        self.completionHandler = completion
    }
    
    // MARK: - BillingCoordinatorProtocol
    
    func start() {
        showEntitlementPicker()
    }
    
    func showEntitlementPicker() {
        let controller = ViewControllerFactory.createEntitlementPicker(pluginDataProvider: parentCoordinator,
                                                                       billingCoordinator: self)
        navigationController.pushViewController(controller, animated: true)
    }
    
    func showRedeemCodeScreen() {
        
    }
    
    func popCurrentScreen() {
        navigationController.popViewController(animated: true)
    }
    
    func finishBillingFlow(isUserHasAccess: Bool) {
        completionHandler(isUserHasAccess)
    }
}
