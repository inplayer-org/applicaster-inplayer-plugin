//
//  CAMLoginPluginProtocol.swift
//  CAMFramework
//
//  Created by Egor Brel on 4/24/19.
//  Copyright © 2019 Egor Brel. All rights reserved.
//

import Foundation
import StoreKit
import ZappPlugins

public enum CAMDefaultAuthScreen {
    case login
    case registration
}

public protocol AnalyticsStorageProtocol {
    
    var trigger: Trigger { get }
    var itemName: String { get }
    var itemType: String { get }
    var purchasesProperties: [String: PurchaseProperties] { get }    
}

public protocol CAMDelegate: AnyObject {
    func getPluginConfig() -> [String: String]
    func isPurchaseNeeded() -> Bool
    func isUserLoggedIn() -> Bool
    func facebookLogin(userData: (email: String, userId: String), completion: @escaping (Result<Void, Error>) -> Void)
    func facebookSignUp(userData: (email: String, userId: String), completion: @escaping (Result<Void, Error>) -> Void)
    func login(authData: [String: String], completion: @escaping (Result<Void, Error>) -> Void)
    func logout(completion: @escaping (Result<Void, Error>) -> Void)
    func signUp(authData: [String: String], completion: @escaping (Result<Void, Error>) -> Void)
    func resetPassword(data: [String: String], completion: @escaping (Result<Void, Error>) -> Void)
    
    func availableProducts(completion: @escaping (Result<[String], Error>) -> Void)
    func itemPurchased(purchasedItem: PurchasedProduct, completion: @escaping (Result<Void, Error>) -> Void)
    func itemsRestored(restoredItems: [PurchasedProduct], completion: @escaping (Result<Void, Error>) -> Void)
    
    func analyticsStorage() -> AnalyticsStorageProtocol
}

public enum ItemState {
    case purchased
    case restored
    case redeemed
}

open class PurchasedProduct {
    public private(set) var transaction: SKPaymentTransaction
    public private(set) var receipt: Data
    private(set) var redeemCode: String?
    private(set) var state: ItemState = .purchased
    
    public var productIdentifier: String {
        return transaction.payment.productIdentifier
    }
    
    init(transaction: SKPaymentTransaction,
         receipt: Data,
         redeemCode: String? = nil,
         state: ItemState) {
        self.transaction = transaction
        self.receipt = receipt
        self.redeemCode = redeemCode
        self.state = state
    }
}
