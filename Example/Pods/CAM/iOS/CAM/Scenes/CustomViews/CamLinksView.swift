//
//  CamLinksView.swift
//  CAM
//
//  Created by Egor Brel on 12/26/19.
//

import UIKit
import ZappPlugins

class CamLinksView: UIView {
    @IBOutlet var camLinksStackView: UIStackView!
    var openLinkErrorAction: (() -> Void)?
    private var camScreen: CamScreen!
    private var configDictionary = [String: String]()
    private let firstLinkButton = UIButton()
    private let secondLinkButton = UIButton()
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)

        guard let view = loadViewFromNib() else { return }
        view.frame = self.bounds
        self.addSubview(view)
    }

    private func loadViewFromNib() -> UIView? {
        let bundle = Bundle(for: type(of: self))
        let nib = UINib(nibName: "CamLinksView", bundle: bundle)
        return nib.instantiate(withOwner: self, options: nil).first as? UIView
    }
    
    public func setupParameters(camScreen: CamScreen,
                                configDictionary: [String: String]) {
        if self.camScreen != camScreen {
            self.camScreen = camScreen
            self.configDictionary = configDictionary
            configureStackView()
        }
    }
    
    private func configureStackView() {
        if let link = configDictionary[camScreen.firstLink.link.rawValue], !link.isEmpty,
           let linkText = configDictionary[camScreen.firstLink.text.rawValue], !linkText.isEmpty {
            firstLinkButton.addTarget(self, action: #selector(showCustomLink(sender:)), for: .touchUpInside)
            firstLinkButton.titleLabel?.lineBreakMode = .byTruncatingTail
            firstLinkButton.setStyle(config: configDictionary, camTitleKey: camScreen.firstLink.text, style: .customlinkFont)
            camLinksStackView.addArrangedSubview(firstLinkButton)
        }
        
        if let link = configDictionary[camScreen.secondLink.link.rawValue], !link.isEmpty,
           let linkText = configDictionary[camScreen.secondLink.text.rawValue], !linkText.isEmpty {
            secondLinkButton.addTarget(self, action: #selector(showCustomLink(sender:)), for: .touchUpInside)
            secondLinkButton.titleLabel?.lineBreakMode = .byTruncatingTail
            secondLinkButton.setStyle(config: configDictionary, camTitleKey: camScreen.secondLink.text, style: .customlinkFont)
            camLinksStackView.addArrangedSubview(secondLinkButton)
        }
        
        if camLinksStackView.subviews.count == 2 {
            (camLinksStackView.subviews[0] as? UIButton)?.contentHorizontalAlignment = .right
            (camLinksStackView.subviews[1] as? UIButton)?.contentHorizontalAlignment = .left
        }
    }
    
    @objc private func showCustomLink(sender: UIButton) {
        let linkKey = sender == firstLinkButton ? camScreen.firstLink : camScreen.secondLink
        let tapLinkEvent = AnalyticsEvents.tapCustomLink(link: configDictionary[linkKey.link.rawValue] ?? "",
                                                         text: configDictionary[linkKey.text.rawValue] ?? "",
                                                         screenName: camScreen.rawValue)
        ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: tapLinkEvent)
        guard let link = configDictionary[linkKey.link.rawValue],
              let customURL = URL(string: link),
              UIApplication.shared.canOpenURL(customURL) else {
            openLinkErrorAction?()
            return
        }
        UIApplication.shared.open(customURL)
    }
}
