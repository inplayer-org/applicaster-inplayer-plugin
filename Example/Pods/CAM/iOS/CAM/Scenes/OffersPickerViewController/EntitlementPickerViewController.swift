//
//  OffersPickerViewControllerPhone.swift
//  CAMFramework
//
//  Created by Egor Brel on 5/2/19.
//  Copyright © 2019 Egor Brel. All rights reserved.
//

import UIKit

struct OffersViewModel {
    let title: String
    let restoreHint: String
    let restoreButtonText: String
    let legalDetails: String
}

class EntitlementPickerViewController: UIViewController {
    var loadingPopover = LoadingPopover.nibInstance()
    @IBOutlet private var backgroundImageView: UIImageView!
    @IBOutlet private var logoImageView: UIImageView!
    @IBOutlet private var closeButton: UIButton!
    @IBOutlet private var titleLabel: UILabel!
    
    @IBOutlet private var entitlementCollectionView: UICollectionView!
    @IBOutlet private var restoreText: UITextView!
    
    @IBOutlet weak var camLinksContainer: CamLinksView!
    @IBOutlet private var helpInfoContainer: UIView!
    @IBOutlet private var helpInfoTextView: UITextView!
    private var gradientLayer: CAGradientLayer!
    
    var presenter: EntitlementPickerPresenter?
    var currentItemIndex = 0 // Used for store center cell for ipad
    var itemSpacing: CGFloat = 20
    
    var configDictionary: [String: String] {
        return presenter?.camDelegate.getPluginConfig() ?? [String: String]()
    }
    
    var isCustomLinksVisible: Bool {
        let firstLink = CamScreen.storefront.firstLink
        let secondLink = CamScreen.storefront.secondLink
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
    
    var itemSize: CGSize {
        if UIDevice.current.userInterfaceIdiom == .pad {
            return CGSize(width: 300, height: 238)
        } else {
            return CGSize(width: 300, height: 182)
        }
    }
    
    var pageWidth: CGFloat {
        return CGFloat(itemSize.width + itemSpacing)
    }
    
    private var offerViewModels: [OfferViewModel] = [] {
        didSet {
            if UIDevice.current.userInterfaceIdiom == .phone {
                camLinksContainer.isHidden = !(isCustomLinksVisible && self.offerViewModels.count <= 1)
            }
        }
    }
    
    var viewModel: OffersViewModel? {
        didSet {
            titleLabel.text = viewModel?.title
            setupRestoreText()
            helpInfoTextView.setStyle(config: configDictionary, style: .legalDetailsFont)
            helpInfoTextView.text = viewModel?.legalDetails
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupCamLinks()
        setupCollectionView()
        presenter?.viewDidLoad()
        
        backgroundImageView.setStyle(asset: .background)
        closeButton.setStyle(iconAsset: .closeButton)
        logoImageView.setStyle(asset: .headerLogo)
        helpInfoContainer.setStyle(config: configDictionary, backgroundColor: .legalDetailsBackgroundColor)
        titleLabel.setStyle(config: configDictionary, style: CAMStyles.screenTitleFont)

        setupGradient()
        
        closeButton.isHidden = presenter?.camDelegate.analyticsStorage().trigger == .appLaunch
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        AnalyticsEvents.userFlow.append("Purchase")
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        loadingPopover.frame = self.view.bounds
        self.gradientLayer.frame = self.helpInfoTextView.bounds
        
        helpInfoTextView.contentOffset = .zero
    }
    
    func setupCollectionView() {
        let customLayout = CustomFlowLayout()
        customLayout.itemSize = itemSize
        customLayout.minimumLineSpacing = 20
        customLayout.scrollDirection = UIDevice.current.userInterfaceIdiom == .pad ? .horizontal : .vertical
        entitlementCollectionView.collectionViewLayout = customLayout
    }
    
    @IBAction func close(_ sender: Any) {
        presenter?.close()
    }
    
    @IBAction func restore(_ sender: Any) {
        AnalyticsEvents.userFlow.append("Restore Purchase")
        presenter?.restore()
    }
    
    public func showOffers(_ offers: [OfferViewModel]) {
        self.offerViewModels = offers
        self.entitlementCollectionView.reloadData()
    }
    
    func showLoadingScreen(_ show: Bool) {
        if show {
            self.view.addSubview(loadingPopover)
        } else {
            loadingPopover.removeFromSuperview()
        }
    }
    
    // MARK: - Private methods
    
    private func setupCamLinks() {
        camLinksContainer.isHidden = !isCustomLinksVisible && self.offerViewModels.count > 1
        if UIDevice.current.userInterfaceIdiom == .pad {
            camLinksContainer.isHidden = !isCustomLinksVisible
        }
        camLinksContainer.openLinkErrorAction = { [unowned self] in
            self.showAlert(description: self.configDictionary[CAMKeys.defaultAlertText.rawValue])
        }
        camLinksContainer.setupParameters(camScreen: .storefront, configDictionary: configDictionary)
    }
    
    private func setupGradient() {
        self.gradientLayer = CAGradientLayer()
        self.gradientLayer.colors = [UIColor.black.cgColor,
                                     UIColor.black.cgColor,
                                     UIColor.clear.cgColor]
        self.gradientLayer.locations = [0.0, 0.3, 1.0]
        
        self.helpInfoTextView.layer.mask = self.gradientLayer
    }
    
    private func setupRestoreText() {
        let config = configDictionary
        
        let restoreMessageText = NSAttributedString(string: viewModel!.restoreHint,
                                                    attributes: [.font: UIConfigurator.font(from: config,
                                                                                            for: .promptFont),
                                                                 .foregroundColor: UIConfigurator.color(from: config,
                                                                                                        for: .promptFont)])
        
        let restoreLink = NSAttributedString(string: viewModel!.restoreButtonText,
                                             attributes: [.font: UIConfigurator.font(from: config,
                                                                                     for: .linkFont),
                                                          .foregroundColor: UIConfigurator.color(from: config,
                                                                                                 for: .linkFont)])
        let paragraph = NSMutableParagraphStyle()
        paragraph.alignment = .center
        
        let restoreText = NSMutableAttributedString()
        restoreText.append(restoreMessageText)
        restoreText.append(restoreLink)
        restoreText.addAttribute(.paragraphStyle,
                                 value: paragraph,
                                 range: NSRange(location: 0, length: restoreText.length))
        
        self.restoreText.attributedText = restoreText
    }
    
    @IBAction private func restoreTextTapped(_ sender: UITapGestureRecognizer) {
        if let textView = sender.view as? UITextView {
            var location = sender.location(in: textView)
            location.x -= textView.textContainerInset.left
            location.y -= textView.textContainerInset.top
            
            let tappedCharacterIndex = textView.layoutManager.characterIndex(for: location,
                                                                             in: textView.textContainer,
                                                                             fractionOfDistanceBetweenInsertionPoints: nil)
            
            let linkRange = (textView.text as NSString).range(of: viewModel!.restoreButtonText)
            if linkRange.contains(tappedCharacterIndex) {
                presenter?.restore()
            }
        }
    }
    
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        if scrollView === helpInfoTextView {
            CATransaction.begin()
            CATransaction.setValue(kCFBooleanTrue, forKey: kCATransactionDisableActions)
            self.gradientLayer.frame = self.helpInfoTextView.bounds
            CATransaction.commit()
        }
    }
}

extension EntitlementPickerViewController: UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return self.offerViewModels.count
    }
    
    func collectionView(_ collectionView: UICollectionView,
                        cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "EntitlementCollectionViewCell",
                                                            for: indexPath) as? EntitlementCollectionViewCell else {
            fatalError()
        }
        
        let cellViewModel = self.offerViewModels[indexPath.row]
        cell.configure(from: cellViewModel)
        
        return cell
    }
    
    private func indexOfMajorCell() -> Int {
        let proportionalOffset = entitlementCollectionView.contentOffset.x / pageWidth
        return Int(round(proportionalOffset))
    }
    
    func scrollViewWillEndDragging(_ scrollView: UIScrollView,
                                   withVelocity velocity: CGPoint,
                                   targetContentOffset: UnsafeMutablePointer<CGPoint>) {
        if UIDevice.current.userInterfaceIdiom == .pad {
            let majorCell = indexOfMajorCell()
            let delta = abs(majorCell - currentItemIndex)
            if velocity.x == 0 {
                currentItemIndex = majorCell
            } else {
                if delta > 1 {
                    currentItemIndex = majorCell
                } else {
                    currentItemIndex = velocity.x > 0 ? currentItemIndex + 1 : currentItemIndex - 1
                }
            }
            if currentItemIndex < 0 {
                currentItemIndex = 0
            }
            if currentItemIndex >= self.offerViewModels.count {
                currentItemIndex = self.offerViewModels.count - 1
            }
            let point = CGPoint(x: CGFloat(currentItemIndex) * pageWidth, y: targetContentOffset.pointee.y)
            targetContentOffset.pointee = point
        }
    }
    
    func collectionView(_ collectionView: UICollectionView,
                        targetContentOffsetForProposedContentOffset proposedContentOffset: CGPoint) -> CGPoint {
        return UIDevice.current.userInterfaceIdiom == .pad
            ? CGPoint(x: CGFloat(currentItemIndex) * pageWidth, y: 0)
            : proposedContentOffset
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, referenceSizeForFooterInSection section: Int) -> CGSize {
        if UIDevice.current.userInterfaceIdiom == .phone &&
           self.offerViewModels.count > 1 &&
           isCustomLinksVisible {
            return CGSize(width: collectionView.bounds.width, height: 39)
        }
        return .zero
    }
    
    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
        switch kind {
        case UICollectionView.elementKindSectionFooter:
            guard let camLinksFooter = collectionView.dequeueReusableSupplementaryView(ofKind: kind, withReuseIdentifier: "CamLinksFooter", for: indexPath)
                as? CamLinksFooterReusableView else {
                return UICollectionReusableView()
            }
            camLinksFooter.camLinksView.openLinkErrorAction = { [unowned self] in
                self.showAlert(description: self.configDictionary[CAMKeys.defaultAlertText.rawValue])
            }
            camLinksFooter.setupParameters(camScreen: .storefront, configDictionary: configDictionary)
            return camLinksFooter
        default:
            return UICollectionReusableView()
        }
    }
}
