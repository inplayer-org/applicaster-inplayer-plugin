//
//  ResetPasswordViewController.swift
//  CAMFramework
//
//  Created by Egor Brel on 4/30/19.
//  Copyright © 2019 Egor Brel. All rights reserved.
//

import UIKit
import ZappPlugins

class ResetPasswordViewController: UIViewController {

    var loadingPopover = LoadingPopover.nibInstance()
    var resetPasswordFields = [AuthField]()
    @IBOutlet var scrollView: UIScrollView!
    @IBOutlet var backgroundImageView: UIImageView!
    @IBOutlet var backButton: UIButton!
    @IBOutlet var closeButton: UIButton!
    @IBOutlet var logoImageView: UIImageView!
    @IBOutlet var titleLabel: UILabel!
    @IBOutlet var infoLabel: UILabel!
    @IBOutlet var resetPasswordFieldsTable: UITableView!
    @IBOutlet var resetButton: UIButton!
    
    @IBOutlet var tableHeightConstraint: NSLayoutConstraint!
    
    var configDictionary: [String: String] {
        return presenter?.camDelegate.getPluginConfig() ?? [String: String]()
    }
    
    var presenter: ResetPasswordPresenter?
    
    var resetPasswordFieldsTableHeight: CGFloat {
        return CGFloat(resetPasswordFields.count) * 48 + CGFloat((resetPasswordFields.count - 1) * 7)
    }
    
    // MARK: - Flow & UI Setup
    
    override func viewDidLoad() {
        super.viewDidLoad()
        presenter?.viewDidLoad()
        setupUI()
        subscribeKeyboardNotifications()
        configureElements()
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        loadingPopover.frame = self.view.bounds
        setupConstraints()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        AnalyticsEvents.userFlow.append("Reset Password")
    }
    
    func configureElements() {
        backgroundImageView.setStyle(asset: .background)
        backButton.setStyle(iconAsset: .backButton)
        closeButton.setStyle(iconAsset: .closeButton)
        logoImageView.setStyle(asset: .headerLogo)
        titleLabel.setStyle(config: configDictionary, camTextKey: .passwordResetTitleText, style: .screenTitleFont)
        infoLabel.setStyle(config: configDictionary, camTextKey: .passwordResetInfoText,
                               style: .screenDescriptionFont)
        resetButton.setStyle(config: configDictionary,
                             backgroundAsset: .actionButton,
                             camTitleKey: .passwordResetButtonText,
                             style: .actionButtonFont)
    }
    
    func setupConstraints() {
        tableHeightConstraint.constant = resetPasswordFieldsTableHeight
        self.view.layoutIfNeeded()
    }
    
    func setupUI() {
        resetPasswordFieldsTable.backgroundView = UIView()
        resetPasswordFieldsTable.allowsSelection = false
        closeButton.isHidden = presenter?.camDelegate.analyticsStorage().trigger == .appLaunch
    }
    
    // MARK: - Keyboard
    
    @IBAction func hideKeyboard() {
        view.endEditing(true)
    }
    
    func subscribeKeyboardNotifications() {
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardNotification(_:)), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardNotification(_:)), name: UIResponder.keyboardWillHideNotification, object: nil)
    }
    
    @objc func keyboardNotification(_ notification: NSNotification) {
        if notification.name == UIResponder.keyboardWillShowNotification {
            setViewYCoordinate(value: -100)
        } else {
            setViewYCoordinate(value: 0)
        }
    }
    
    func setViewYCoordinate(value: CGFloat) {
        if self.view.frame.origin.y > value || value == 0 {
            self.view.frame.origin.y = value
        }
    }
    
    // MARK: - Actions
    
    @IBAction func resetPassword(_ sender: UIButton) {
        hideKeyboard()
        presenter?.resetPassword(data: resetPasswordFields)
    }
    
    @IBAction func backToPreviousScreen(_ sender: UIButton) {
        presenter?.backToPreviousScreen()
    }
    
    @IBAction func close(_ sender: UIButton) {
        presenter?.close()
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}

// MARK: - ResetPasswordViewProtocol
extension ResetPasswordViewController: ResetPasswordViewProtocol {
    
    func updateTable(fields: [AuthField]) {
        resetPasswordFields = fields
        resetPasswordFieldsTable.reloadData()
    }
    
    func showLoadingScreen(_ show: Bool) {
        if show {
            self.view.addSubview(loadingPopover)
        } else {
            loadingPopover.removeFromSuperview()
        }
    }
    
    func showError(description: String?) {
        self.showAlert(description: description)
    }
    
    func showConfirmationScreenIfNeeded() {
        if let alertTitle = configDictionary[CAMKeys.passwordAlertTitleText.rawValue],
           let alertDescription = configDictionary[CAMKeys.passwordAlertInfoText.rawValue],
           let _ = configDictionary[CAMKeys.alertButtonText.rawValue] {
            self.showConfirmationScreen(config: configDictionary,
                                        titleKey: .passwordAlertTitleText,
                                        descriptionKey: .passwordAlertInfoText,
                                        buttonKey: .alertButtonText,
                                        action: { [weak self] in
                self?.presenter?.backToPreviousScreen()
            })
            
            let viewAlertEvent = AnalyticsEvents.viewAlert(AlertInfo(title: alertTitle,
                                                                     description: alertDescription,
                                                                     isConfirmation: IsConfirmationAlert.yes(type: .passwordReset)),
                                                           apiError: nil)
            ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: viewAlertEvent)
        } else {
            presenter?.backToPreviousScreen()
        }
    }
}

// MARK: - Table Delegate

extension ResetPasswordViewController: UITableViewDelegate, UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return resetPasswordFields.count
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        if indexPath.row == resetPasswordFields.count - 1 {
            return 48
        }
        return 55
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "AuthCell",
                                                       for: indexPath) as? AuthTableCell else {
                                                        return UITableViewCell()
        }
        cell.textField.setStyle(config: configDictionary, backgroundAsset: .authField, style: .inputFieldFont, placeholder: resetPasswordFields[indexPath.row].hint)
        cell.configureInputField(data: resetPasswordFields[indexPath.row])
        cell.backgroundColor = .clear
        cell.showPopover = { [weak self] in
            let bubbleWidth: CGFloat = 320
            self?.showErrorPopover(config: self?.configDictionary ?? [String: String](),
                                   message: self?.resetPasswordFields[indexPath.row].errorDescription,
                                   bubbleWidth: bubbleWidth,
                                   sourceView: cell)
        }
        
        cell.textChanged = { [weak self] text in
            self?.resetPasswordFields[indexPath.row].state = .none
            self?.resetPasswordFields[indexPath.row].errorDescription = ""
            self?.resetPasswordFields[indexPath.row].text = text
        }
        return cell
    }
}

extension ResetPasswordViewController: UIPopoverPresentationControllerDelegate {
    func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle {
        return .none
    }
}
