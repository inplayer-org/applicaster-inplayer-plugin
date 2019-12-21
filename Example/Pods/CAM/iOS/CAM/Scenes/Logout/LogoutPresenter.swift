//
//  LogoutPresenter.swift
//  CAM
//
//  Created by Egor Brel on 11/29/19.
//

import Foundation

class LogoutPresenter {
    
    unowned var view: LogoutViewController
    unowned var coordinatorDelegate: AuthorizationCoordinatorProtocol
    unowned var camDelegate: CAMDelegate
    
    init(view: LogoutViewController,
         coordinatorDelegate: AuthorizationCoordinatorProtocol,
         camDelegate: CAMDelegate) {
        self.view = view
        self.coordinatorDelegate = coordinatorDelegate
        self.camDelegate = camDelegate
    }
    
    func logout() {
        camDelegate.logout { result in
            switch result {
            case .success:
                self.view.willMove(toParent: nil)
                self.view.removeFromParent()
                self.coordinatorDelegate.finishCoordinatorFlow(result: true)
            case .failure:
                self.coordinatorDelegate.finishCoordinatorFlow(result: false)
                self.view.showError()
            }
        }
    }
    
    func cancel() {
        self.view.willMove(toParent: nil)
        self.view.removeFromParent()
        coordinatorDelegate.finishCoordinatorFlow(result: false)
    }
    
}
