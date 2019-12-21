//
//  EntitlementsPickerPresenter.swift
//  CAMFramework
//
//  Created by Egor Brel on 5/3/19.
//  Copyright © 2019 Egor Brel. All rights reserved.
//

import Foundation
import ApplicasterIAP
import StoreKit
import ZappPlugins

private enum IAPEvent {
    case purchase
    case restore
    
    var analyticsEvent: ConfirmationAlertType {
        switch self {
        case .purchase:
            return .purchase
        case .restore:
            return .restorePurchase
        }
    }
}

class EntitlementPickerPresenter {
    
    unowned var view: EntitlementPickerViewController
    unowned var coordinatorDelegate: BillingCoordinatorProtocol
    unowned var camDelegate: CAMDelegate
    
    var availableProducts: [SKProduct] = []
    
    init(view: EntitlementPickerViewController,
         coordinatorDelegate: BillingCoordinatorProtocol,
         camDelegate: CAMDelegate) {
        self.view = view
        self.coordinatorDelegate = coordinatorDelegate
        self.camDelegate = camDelegate
    }
    
    // MARK: - Public methods
    
    func viewDidLoad() {
        let screenTitle = camDelegate.getPluginConfig()[CAMKeys.paymentScreenTitle.rawValue] ?? ""
        let restoreHint = camDelegate.getPluginConfig()[CAMKeys.restoreHint.rawValue] ?? ""
        let restoreButtonText = camDelegate.getPluginConfig()[CAMKeys.restoreButtonText.rawValue] ?? ""
        let legalDetailsText = camDelegate.getPluginConfig()[CAMKeys.legalDetailsText.rawValue] ?? ""
        let viewModel = OffersViewModel(title: screenTitle,
                                        restoreHint: restoreHint,
                                        restoreButtonText: restoreButtonText,
                                        legalDetails: legalDetailsText)
        self.view.showLoadingScreen(true)
        self.view.viewModel = viewModel
        camDelegate.availableProducts(completion: { [weak self] (result) in
            guard let self = self else { return }
            
            switch result {
            case .success(let productStoreIDs):
                BillingHelper.sharedInstance.products(Set<String>(productStoreIDs), completion: { (result) in
                    self.view.showLoadingScreen(false)
                    switch result {
                    case .success(let result):
                        self.availableProducts = result.products
                        self.showOffers()
                    case .failure:
                        self.showOffers()
                    }
                })
            case .failure(let error):
                AnalyticsEvents.userFlow.append("Failed Attempt")
                self.view.showAlert(description: error.localizedDescription)
                self.view.showLoadingScreen(false)
            }
        })
    }
    
    func close() {
        coordinatorDelegate.finishBillingFlow(isUserHasAccess: false)
    }
    
    func restore() {
        let playableInfo = camDelegate.playableItemInfo
        let tapRestoreEvent = AnalyticsEvents.tapRestorePurchaseLink(playableInfo)
        ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: tapRestoreEvent)
        self.view.showLoadingScreen(true)
        BillingHelper.sharedInstance.restore { (result) in
            switch result {
            case .success(let response):
                guard let receipt = BillingHelper.sharedInstance.localReceiptData() else {
                    return
                }
                
                let resultArray = response.compactMap {(transaction) -> PurchasedProduct? in
                    var restoredTransaction = transaction
                    if let originalTransaction = transaction.original,
                        transaction.transactionState == .restored {
                        restoredTransaction = originalTransaction
                    }
                    
                    let item = PurchasedProduct(transaction: restoredTransaction,
                                                receipt: receipt,
                                                state: .restored)
                    return item
                }
                
                if resultArray.isEmpty == true {
                    let alertDescription = self.camDelegate.getPluginConfig()[CAMKeys.restoreNoPurchaseAlertText.rawValue]
                    self.view.showAlert(description: alertDescription)
                    self.view.showLoadingScreen(false)
                }
                self.camDelegate.itemsRestored(restoredItems: resultArray, completion: { [weak self] (result) in
                    guard let self = self else { return }
                    self.view.showLoadingScreen(false)
                    switch result {
                    case .success:
                        if self.camDelegate.isPurchaseNeeded() == false {
                            self.showConfirmationScreen(for: .restore)
                        } else {
                            let alertDescription = self.camDelegate.getPluginConfig()[CAMKeys.restoreNonMatchingAlertText.rawValue]
                            self.view.showAlert(description: alertDescription)
                        }
                        
                        let productsProperties = resultArray.map({ self.createProductProperties(for: $0.productIdentifier) })
                        let successfulRestoreEvent = AnalyticsEvents.completeRestorePurchase(playableInfo,
                                                                                             productsProperties)
                        ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: successfulRestoreEvent  )
                    case .failure(let error):
                        AnalyticsEvents.userFlow.append("Failed Attempt")
                        self.view.showAlert(description: error.localizedDescription)
                        self.sendAnalyticsEvent(for: error)
                        let restoreFailureEvent = AnalyticsEvents.storeRestorePurchaseError(error,
                                                                                            self.camDelegate.playableItemInfo,
                                                                                            nil)
                        ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: restoreFailureEvent)
                    }
                })
            case .failure(let error):
                AnalyticsEvents.userFlow.append("Failed Attempt")
                self.view.showLoadingScreen(false)
                print(error.localizedDescription)
            }
        }
    }
    
    // MARK: - Private methods
    
    private func showOffers() {
        let playableInfo = camDelegate.playableItemInfo
        
        let viewModels = availableProducts.map({ (skProduct) -> OfferViewModel in
            var voucherProperties = camDelegate.analyticsStorage().purchasesProperties[skProduct.productIdentifier]
            voucherProperties?.update(with: skProduct)
            
            let buyAction = {
                let buyEvent = AnalyticsEvents.tapPurchaseButton(playableInfo,
                                                                 voucherProperties)
                ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: buyEvent)
                
                self.view.showLoadingScreen(true)
                BillingHelper.sharedInstance.purchase(skProduct, completion: { [weak self] (result) in
                    let purchaseResultEvent: AnalyticsEvents
                    switch result {
                    case .success(let purchase):
                        voucherProperties?.transactionID = purchase.transaction?.transactionIdentifier
                        purchaseResultEvent = AnalyticsEvents.completePurchase(playableInfo,
                                                                               voucherProperties)
                        
                        let pluginName = ZPPluginManager.pluginModel(.Login)?.pluginName ?? ""
                        var properties = ["Authentication Provider": pluginName]
                        let userGenericProperties = ZAAppConnector.sharedInstance().pluginsDelegate?.analyticsPluginsManager?.userGenericProperties()
                        
                        if let userGenericProperties = userGenericProperties,
                            userGenericProperties["Logged in"] == nil {
                            properties["Logged In"] = "No"
                        }
                        if let productName = voucherProperties?.productName {
                            properties["Purchase Product Name"] = productName
                        }
                    ZAAppConnector.sharedInstance().pluginsDelegate?.analyticsPluginsManager?.setEventUserGenericProperties(properties)
                        
                        self?.purchaseAction(purchase: purchase)
                    case .failure(let error):
                        if let skError = error as? SKError, skError.code == .paymentCancelled {
                            purchaseResultEvent = AnalyticsEvents.cancelPurchase(playableInfo,
                                                                                 voucherProperties)
                        } else {
                            purchaseResultEvent = AnalyticsEvents.storePurchaseError(error,
                                                                                     playableInfo,
                                                                                     voucherProperties)
                        }
                        self?.view.showLoadingScreen(false)
                    }
                    
                    ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: purchaseResultEvent)
                })
            }
            
            let redeemAction: () -> Void = { [weak self] in
                self?.coordinatorDelegate.showRedeemCodeScreen()
            }
            
            let configText = camDelegate.getPluginConfig()[CAMKeys.purchaseButtonText.rawValue] ?? ""
            let price = skProduct.localizedPrice ?? ""
            let purchaseButtonText = configText + " " + price
            
            return OfferViewModel(config: camDelegate.getPluginConfig(),
                                  title: skProduct.localizedTitle,
                                  description: skProduct.localizedDescription,
                                  purchaseButtonText: purchaseButtonText,
                                  buyAction: buyAction,
                                  redeemAction: redeemAction)
        })
        
        self.view.showOffers(viewModels)
    }
    
    private func purchaseAction(purchase: Purchase) {
        guard let receipt = BillingHelper.sharedInstance.localReceiptData(),
            let transaction = purchase.transaction else {
            return
        }
        let purchasedItem = PurchasedProduct(transaction: transaction,
                                             receipt: receipt,
                                             state: .purchased)
        self.camDelegate.itemPurchased(purchasedItem: purchasedItem, completion: { [weak self] (result) in
            self?.view.showLoadingScreen(false)
            switch result {
            case .success:
                self?.showConfirmationScreen(for: .purchase)
            case .failure(let error):
                self?.view.showAlert(description: error.localizedDescription)
                self?.sendAnalyticsEvent(for: error)
            }
        })
    }
    
    private func showConfirmationScreen(for event: IAPEvent) {
        let configDictionary = camDelegate.getPluginConfig()
        let alertTitleKey = self.alertTitleKey(for: event)
        let alertDescriptionKey = self.alertDescriptionKey(for: event)
        
        guard let alertTitle = configDictionary[alertTitleKey.rawValue],
            let alertDescription = configDictionary[alertDescriptionKey.rawValue],
            let _ = configDictionary[CAMKeys.alertButtonText.rawValue] else {
                self.coordinatorDelegate.finishBillingFlow(isUserHasAccess: true)
                return
        }
        
        let viewAlertEvent = AnalyticsEvents.viewAlert(AlertInfo(title: alertTitle,
                                                                 description: alertDescription,
                                                                 isConfirmation: IsConfirmationAlert.yes(type: event.analyticsEvent)),
                                                       apiError: nil)
        ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: viewAlertEvent)
        
        self.view.showConfirmationScreen(config: configDictionary,
                                          titleKey: alertTitleKey,
                                          descriptionKey: alertDescriptionKey,
                                          buttonKey: .alertButtonText, action: {
                                            self.coordinatorDelegate.finishBillingFlow(isUserHasAccess: true)
        })
    }
    
    private func alertTitleKey(for event: IAPEvent) -> CAMKeys {
        switch event {
        case .purchase:
            return CAMKeys.paymentAlertTitle
        case .restore:
            return CAMKeys.restoreAlertTitle
        }
    }
    
    private func alertDescriptionKey(for event: IAPEvent) -> CAMKeys {
        switch event {
        case .purchase:
            return CAMKeys.paymentAlertInfo
        case .restore:
            return CAMKeys.restoreAlertDescription
        }
    }
    
    private func sendAnalyticsEvent(for error: Error) {
        let viewAlertEvent = AnalyticsEvents.makeViewAlert(from: error)
        ZAAppConnector.sharedInstance().analyticsDelegate.trackEvent(event: viewAlertEvent)
    }
    
    private func createProductProperties(for productIdentifier: String) -> PurchaseProperties? {
        guard var purchaseProperties = camDelegate.analyticsStorage().purchasesProperties[productIdentifier] else {
            return nil
        }
        
        if let skProduct = self.availableProducts.first(where: { $0.productIdentifier == productIdentifier }) {
            purchaseProperties.update(with: skProduct)
        }
        
        return purchaseProperties
    }
}

