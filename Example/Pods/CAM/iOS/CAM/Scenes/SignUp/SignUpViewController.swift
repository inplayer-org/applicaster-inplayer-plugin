//
//  SignUpViewController.swift
//  CAM
//
//  Created by Egor Brel on 4/30/19.
//

import UIKit

class SignUpViewController: UIViewController {
    let cellHeight: CGFloat = 48.0
    let cellSpacing: CGFloat = 7.0
    
    var loadingPopover = LoadingPopover.nibInstance()
    var authFields = [AuthField]()
    
    @IBOutlet var backgroundImageView: UIImageView!
    
    @IBOutlet var backButton: UIButton!
    @IBOutlet var closeButton: UIButton!
    
    @IBOutlet var logoImageView: UIImageView!
    @IBOutlet var titleLabel: UILabel!
    
    @IBOutlet var authFieldsTable: UITableView!
    @IBOutlet var signUpButton: UIButton!
    
    @IBOutlet var socialNetworksContainer: UIView!
    
    @IBOutlet var leftSeparatorView: UIImageView!
    @IBOutlet var rightSeparatorView: UIImageView!
    @IBOutlet var alternateLabel: UILabel!
    @IBOutlet var socialNetworksLabel: UILabel!
    @IBOutlet var stackView: UIStackView!
    
    @IBOutlet var loginContainer: UIView!
    @IBOutlet var loginButton: UIButton!
  
    
    @IBOutlet var camLinksContainer: CamLinksView!
    @IBOutlet var camLinksHeightConstraint: NSLayoutConstraint!
    @IBOutlet var authFieldsTableHeightConstraint: NSLayoutConstraint!
    @IBOutlet var socialNetworksContainerTopConstraint: NSLayoutConstraint!
    @IBOutlet var inputContainerYConstraint: NSLayoutConstraint!
    @IBOutlet var inputContainerHeightConstraint: NSLayoutConstraint!
    
    var configDictionary: [String: String] {
        return presenter?.camDelegate.getPluginConfig() ?? [String: String]()
    }
    var presenter: SignUpPresenter?
    
    var isCustomLinksVisible: Bool {
        let firstLink = CamScreen.signUp.firstLink
        let secondLink = CamScreen.signUp.secondLink
        var isFirstLinkVisible = false
        var isSecondLinkVisible = false
        
        if let link = configDictionary[firstLink.link.rawValue], !link.isEmpty,
           let text = configDictionary[firstLink.text.rawValue], !text.isEmpty {
            isFirstLinkVisible = true
        }
        
        if let link = configDictionary[secondLink.link.rawValue], !link.isEmpty,
           let text = configDictionary[secondLink.text.rawValue], !text.isEmpty {
            isSecondLinkVisible = true
        }
        return isFirstLinkVisible || isSecondLinkVisible
    }
    
    var visibleAuthFieldsCount: Int {
        let centerFreeSpace = loginContainer.frame.minY - logoImageView.frame.maxY
        let topSpace: CGFloat = 50.0
        var bottomSpace = socialNetworksContainer.isHidden ? 0 : socialNetworksContainer.frame.height + 20 // 20 - min spacing
        bottomSpace = bottomSpace == 0 ? 50 : bottomSpace
        let inputComponentMaxHeight = centerFreeSpace - topSpace - bottomSpace
        let tableMaxHeight = inputComponentMaxHeight - 13 - signUpButton.bounds.height
        var maxCount = Int((tableMaxHeight - cellSpacing) / (cellHeight + cellSpacing))
        let fieldsCount = authFields.count
        if UIDevice.current.userInterfaceIdiom == .phone {
            maxCount = maxCount > 4 ? 4 : maxCount
        } else {
            maxCount = maxCount > 6 ? 6 : maxCount
        }
        return maxCount > fieldsCount ? fieldsCount : maxCount
    }
    
    var authFieldsTableHeight: CGFloat {
        let height = CGFloat(visibleAuthFieldsCount) * cellHeight + CGFloat(visibleAuthFieldsCount - 1) * cellSpacing
        return height
    }
    
     // MARK: - Flow & UI Setup
    
    override func viewDidLoad() {
        super.viewDidLoad()
        subscribeKeyboardNotifications()
        setupUI()
        presenter?.viewDidLoad()
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        loadingPopover.frame = self.view.bounds
        setupConstraints()
        authFieldsTable.isScrollEnabled = authFieldsTable.contentSize.height > authFieldsTable.frame.height
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        AnalyticsEvents.userFlow.append("Sign Up")
    }
    
    func setupUI() {
        self.navigationController?.isNavigationBarHidden = true
        if let isHidden = presenter?.isRoot {
            backButton.isHidden = isHidden
        }
        closeButton.isHidden = presenter?.camDelegate.analyticsStorage().trigger == .appLaunch
        loginButton.titleLabel?.numberOfLines = 0
        loginButton.titleLabel?.textAlignment = .center
        loginButton.isUserInteractionEnabled = (configDictionary[CAMKeys.singUpLoginActionText.rawValue] ?? "").isEmpty ? false : true
        socialNetworksContainer.isHidden = !(configDictionary[CAMKeys.isAlternativeAuthenticationEnabled.rawValue]?.bool ?? false)
        authFieldsTable.backgroundView = UIView()
        authFieldsTable.allowsSelection = false
        setupCamLinks()
        setupSocialNetworksContainer()
        configureElements()
    }
    
    func setupSocialNetworksContainer() {
        let facebookButton = UIButton()
        facebookButton.setStyle(iconAsset: .facebook)
        facebookButton.translatesAutoresizingMaskIntoConstraints = false
        facebookButton.heightAnchor.constraint(equalToConstant: 36).isActive = true
        facebookButton.widthAnchor.constraint(equalToConstant: 36).isActive = true
        facebookButton.addTarget(self, action: #selector(facebookSignUp), for: .touchUpInside)
        
        stackView.axis = .horizontal
        stackView.distribution = .equalCentering
        stackView.alignment = .center
        stackView.spacing = 20
        stackView.addArrangedSubview(facebookButton)
    }
    
    func setupCamLinks() {
        camLinksContainer.openLinkErrorAction = { [unowned self] in
            self.showAlert(description: self.configDictionary[CAMKeys.defaultAlertText.rawValue])
        }
        camLinksContainer.setupParameters(camScreen: .signUp, configDictionary: configDictionary)
    }
    
    func setupConstraints() {
        camLinksHeightConstraint.constant = isCustomLinksVisible ? 39 : 0
        let inputContainerHeight = authFieldsTableHeight + signUpButton.frame.height + 13
        authFieldsTableHeightConstraint.constant = authFieldsTableHeight
        inputContainerHeightConstraint.constant = inputContainerHeight
        let inputContainerMinY = (self.view.frame.height - inputContainerHeight) / 2 - 50 // 50 - space from center
        let inputContainerMaxY = inputContainerMinY + inputContainerHeight
        if !socialNetworksContainer.isHidden {
            socialNetworksContainerTopConstraint.constant = (loginContainer.frame.minY - inputContainerMaxY - 100) / 2
        } else {
            self.inputContainerYConstraint.constant = 0
        }
        self.view.layoutIfNeeded()
    }
    
    func configureElements() {
        backgroundImageView.setStyle(asset: .background)
        backButton.setStyle(iconAsset: .backButton)
        closeButton.setStyle(iconAsset: .closeButton)
        logoImageView.setStyle(asset: .headerLogo)
        titleLabel.setStyle(config: configDictionary, camTextKey: .signUpScreenTitleText, style: .screenTitleFont)
        signUpButton.setStyle(config: configDictionary,
                              backgroundAsset: .actionButton,
                              camTitleKey: .signUpButtonText,
                              style: .actionButtonFont)
        leftSeparatorView.setStyle(asset: .leftSeparator)
        rightSeparatorView.setStyle(asset: .rightSeparator)
        alternateLabel.setStyle(config: configDictionary, camTextKey: .separatorText, style: .separatorFont)
        socialNetworksLabel.setStyle(config: configDictionary, camTextKey: .alternativeAuthenticationPromtText, style: .alternativeAuthenticationFont)
        loginButton.setAttributedStyle(config: configDictionary, attributedTitle: [(style: .promptFont,
                                                                                    string: configDictionary[CAMKeys.singUpLoginPromtText.rawValue] ?? "",
                                                                                    additionalAttributes: nil),
                                                                                   (style: .linkFont,
                                                                                    string: "\n\(configDictionary[CAMKeys.singUpLoginActionText.rawValue] ?? "")",
                                                                                    additionalAttributes: nil)])
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
    
    @IBAction func backToPreviousScreen(_ sender: UIButton) {
        presenter?.backToPreviousScreen()
    }
    
    @IBAction func close(_ sender: UIButton) {
        presenter?.close()
    }
    
    @IBAction func signUp(_ sender: UIButton) {
        hideKeyboard()
        presenter?.signUp(data: authFields)
    }
    
    @IBAction func showLoginScreen(_ sender: Any) {
        presenter?.showLoginScreen()
    }
    
    @objc func facebookSignUp() {
        presenter?.showFacebookAuthScreen()
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}

// MARK: - Table Delegate
extension SignUpViewController: UITableViewDelegate, UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return authFields.count
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        if indexPath.row == authFields.count - 1 {
            return 48
        }
        return 55
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "AuthCell",
                                                       for: indexPath) as? AuthTableCell else {
                                                        return UITableViewCell()
        }
        cell.textField.setStyle(config: configDictionary, backgroundAsset: .authField, style: .inputFieldFont, placeholder: authFields[indexPath.row].hint) 
        cell.configureInputField(data: authFields[indexPath.row])
        cell.backgroundColor = .clear
        cell.showPopover = { [weak self] in
            let bubbleWidth: CGFloat = UIDevice.current.userInterfaceIdiom == .pad ? 390 : 320
            self?.showErrorPopover(config: self?.configDictionary ?? [String: String](),
                                   message: self?.authFields[indexPath.row].errorDescription,
                                   bubbleWidth: bubbleWidth,
                                   sourceView: cell)
        }
        
        cell.textChanged = { [weak self] text in
            self?.authFields[indexPath.row].state = .none
            self?.authFields[indexPath.row].errorDescription = ""
            self?.authFields[indexPath.row].text = text
        }
        return cell
    }
}

extension SignUpViewController: SignUpViewProtocol {
    
    // MARK: - SignUpViewProtocol
    
    func updateTable(fields: [AuthField]) {
        authFields = fields
        authFieldsTable.reloadData()
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
}

extension SignUpViewController: UIPopoverPresentationControllerDelegate {
    func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle {
        return .none
    }
}
