//
//  PurchaseProperties.swift
//  CAM
//
//  Created by Roman Karpievich on 7/16/19.
//

import Foundation
import StoreKit

private enum PurchaseType: String {
    case subscription = "Subscription"
    case consumable = "Consumable"
    
    var key: String {
        return "Purchase Type"
    }
}

public enum PurchaseEntityType: String {
    case vod = "VOD Item"
    case category = "Category"
    
    static var key: String {
        return "Purchase Entity Type"
    }
}

private enum ProductPropertiesKeys: String {
    case subscriber = "Subscriber"
    case productName = "Product Name"
    case price = "Price"
    case transactionID = "Transaction ID"
    case productID = "Product ID"
    case subscriptionDuration = "Subscription Duration"
    case purchaseType = "Purchase Type"
    case trialPeriod = "Trial Period"
}

public struct PurchaseProperties {
    
    private var isSubscriber: Bool
    public var productName: String?
    public var price: String?
    public var transactionID: String?
    private var productID: String
    public var isSubscription: Bool?
    public var subscriptionDuration: String?
    public var trialPeriod: String?
    public var purchaseEntityType: PurchaseEntityType?
    
    static var key: String {
        return "Purchase Product Properties"
    }
    
    var metadata: [String: String] {
        let noneProvided = "None provided"
        
        var result: [String: String] = [ProductPropertiesKeys.productID.rawValue: productID]
        result[ProductPropertiesKeys.subscriber.rawValue] = isSubscriber ? "Yes" : "No"
        result[ProductPropertiesKeys.productName.rawValue] = productName ?? noneProvided
        result[ProductPropertiesKeys.price.rawValue] = price ?? noneProvided
        result[ProductPropertiesKeys.transactionID.rawValue] = transactionID ?? noneProvided
        
        var purchaseType: PurchaseType
        
        if subscriptionDuration != nil {
            purchaseType = .subscription
        } else {
            purchaseType = .consumable
        }
        
        result[purchaseType.key] = purchaseType.rawValue
        result[ProductPropertiesKeys.subscriptionDuration.rawValue] = subscriptionDuration?.capitalized ?? noneProvided
        result[PurchaseEntityType.key] = purchaseEntityType?.rawValue ?? noneProvided
        
        if let trial = trialPeriod {
            result[ProductPropertiesKeys.trialPeriod.rawValue] = trial + " Days"
        } else {
            result[ProductPropertiesKeys.trialPeriod.rawValue] = noneProvided
        }
        
        return result
    }
    
    public init(productIdentifier: String, isSubscriber: Bool) {
        self.productID = productIdentifier
        self.isSubscriber = isSubscriber
    }
    
    mutating func update(with skProduct: SKProduct) {
        self.productName = skProduct.localizedTitle
        self.price = skProduct.localizedPrice
        self.productID = skProduct.productIdentifier
    }
    
}
