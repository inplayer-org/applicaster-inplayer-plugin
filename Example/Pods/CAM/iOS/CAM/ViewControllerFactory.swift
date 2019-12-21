//
//  ViewControllerFactory.swift
//  CAM
//
//  Created by Egor Brel on 5/10/19.
//

import UIKit

class ViewControllerFactory {
    
    static func createLoginScreen(pluginDataProvider: PluginDataProviderProtocol,
                                  isRoot: Bool,
                                  authCoordinator: AuthorizationCoordinatorProtocol) -> LoginViewController {
        let loginVC = LoginViewController.instantiateVC()
        let presenter = LoginPresenter(view: loginVC,
                                       coordinatorDelegate: authCoordinator,
                                       camDelegate: pluginDataProvider.getCamDelegate())
        presenter.isRoot = isRoot
        
        loginVC.presenter = presenter
        
        return loginVC
    }
    
    static func createSignUpScreen(pluginDataProvider: PluginDataProviderProtocol,
                                   isRoot: Bool,
                                   authCoordinator: AuthorizationCoordinatorProtocol) -> SignUpViewController {
        let signUpVC = SignUpViewController.instantiateVC()
        let presenter = SignUpPresenter(view: signUpVC,
                                        coordinatorDelegate: authCoordinator,
                                        camDelegate: pluginDataProvider.getCamDelegate())
        presenter.isRoot = isRoot
        signUpVC.presenter = presenter
        
        return signUpVC
    }
    
    static func createResetPasswordScreen(pluginDataProvider: PluginDataProviderProtocol,
                                          authCoordinator: AuthorizationCoordinatorProtocol) -> ResetPasswordViewController {
        let resetPasswordVC = ResetPasswordViewController.instantiateVC()
        let presenter = ResetPasswordPresenter(view: resetPasswordVC,
                                               coordinatorDelegate: authCoordinator,
                                               camDelegate: pluginDataProvider.getCamDelegate())
        resetPasswordVC.presenter = presenter
        
        return resetPasswordVC
    }
    
    static func createLogoutScreen(pluginDataProvider: PluginDataProviderProtocol,
                                   authCoordinator: AuthorizationCoordinatorProtocol) -> LogoutViewController {
        let logoutVC = LogoutViewController.instantiateVC()
        let presenter = LogoutPresenter(view: logoutVC,
                                        coordinatorDelegate: authCoordinator,
                                        camDelegate: pluginDataProvider.getCamDelegate())
        logoutVC.presenter = presenter
        return logoutVC
    }
    
    static func createEntitlementPicker(pluginDataProvider: PluginDataProviderProtocol,
                                        billingCoordinator: BillingCoordinatorProtocol) -> EntitlementPickerViewController {
        let pickerVC = EntitlementPickerViewController.instantiateVC()
        let presenter = EntitlementPickerPresenter(view: pickerVC,
                                                   coordinatorDelegate: billingCoordinator,
                                                   camDelegate: pluginDataProvider.getCamDelegate())
        pickerVC.presenter = presenter

        return pickerVC
    }
}
