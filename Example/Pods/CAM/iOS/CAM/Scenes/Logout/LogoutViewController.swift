//
//  LogoutViewController.swift
//  CAM
//
//  Created by Egor Brel on 11/29/19.
//

import UIKit

class LogoutViewController: UIViewController {

    @IBOutlet var backgroundView: UIImageView!
    @IBOutlet var titleLabel: UILabel!
    @IBOutlet var descriptionLabel: UILabel!
    @IBOutlet var actionButton: UIButton!
    @IBOutlet var cancelButton: UIButton!
    
    var configDictionary: [String: String] {
        return presenter?.camDelegate.getPluginConfig() ?? [String: String]()
    }
    var presenter: LogoutPresenter?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureElements()
    }
    
    func configureElements() {
        backgroundView.setStyle(asset: .alertBackground)
        
        titleLabel.setStyle(config: configDictionary,
                            camTextKey: .logoutTitleText,
                            style: .confirmationTitleFont)
        
        descriptionLabel.setStyle(config: configDictionary,
                                 camTextKey: .logoutInfoText,
                                 style: .confirmationDescriptionFont)
        
        actionButton.setStyle(config: configDictionary,
                              backgroundAsset: .alertButton,
                              camTitleKey: .alertButtonText,
                              style: .confirmationButtonFont)
        
        cancelButton.setStyle(config: configDictionary,
                              backgroundAsset: .cancelButton,
                              camTitleKey: .cancelButtonText,
                              style: .cancelButtonFont)
    }
    
    func showError() {
        let alert = UIAlertController(title: "", message: configDictionary[CAMKeys.logoutErrorText.rawValue] ?? "",
                                      preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Ok", style: .default) { _ in
            self.willMove(toParent: nil)
            self.removeFromParent()
            return
        })
        self.present(alert, animated: false)
    }
    
    @IBAction func logout(_ sender: Any) {
        self.view.removeFromSuperview()
        presenter?.logout()
    }
    
    @IBAction func cancel(_ sender: Any) {
        self.view.removeFromSuperview()
        presenter?.cancel()
    }
}
