//
//  EntitlementCollectionViewCell.swift
//  CAMFramework
//
//  Created by Egor Brel on 5/3/19.
//  Copyright © 2019 Egor Brel. All rights reserved.
//

import UIKit

final class OfferViewModel {
    let config: [String: String]
    let title: String
    let description: String
    let purchaseButtonText: String
    let buyAction: () -> Void
    let redeemAction: () -> Void
    
    init(config: [String: String],
         title: String,
         description: String,
         purchaseButtonText: String,
         buyAction: @escaping () -> Void,
         redeemAction: @escaping () -> Void) {
        self.config = config
        self.title = title
        self.description = description
        self.purchaseButtonText = purchaseButtonText
        self.buyAction = buyAction
        self.redeemAction = redeemAction
    }
}

class EntitlementCollectionViewCell: UICollectionViewCell {
    @IBOutlet private var titleLabel: UILabel!
    @IBOutlet private var infoLabel: UILabel!
    @IBOutlet private var purchaseButton: UIButton!
    
    private var buyAction: () -> Void = {}
    private var redeemAction: () -> Void = {}
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        
        let backgroundImageView = UIImageView(frame: .zero)
        backgroundImageView.setStyle(asset: .purchaseBackground)
        backgroundImageView.frame = self.frame
        
        self.backgroundView = backgroundImageView
    }
    
    public func configure(from viewModel: OfferViewModel) {
        self.titleLabel.text = viewModel.title
        self.infoLabel.text = viewModel.description
        self.buyAction = viewModel.buyAction
        self.redeemAction = viewModel.redeemAction
        
        self.purchaseButton.setStyle(config: viewModel.config,
                                     backgroundAsset: .purchaseButton,
                                     title: viewModel.purchaseButtonText,
                                     style: CAMStyles.actionButtonFont)
        self.titleLabel.setStyle(config: viewModel.config, style: .paymentOptionTitleFont)
        self.infoLabel.setStyle(config: viewModel.config, style: .paymentOptionDescriptionFont)
    }

    @IBAction private func purchaseItem(_ sender: UIButton) {
        buyAction()
    }
    
    @IBAction private func purchaseWithRedeemCode(_ sender: UIButton) {
        redeemAction()
    }
}
