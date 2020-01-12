import Foundation
import InPlayerSDK
import ZappPlugins
import CAM

public extension InPlayer {
    
    class LoginPlugin: NSObject, ZPLoginProviderUserDataProtocol, ZPAppLoadingHookProtocol, ZPScreenHookAdapterProtocol, ZPPluggableScreenProtocol {
        
        private var pluginConfiguration: [String: Any] = [:]
        private let analytics = AnalyticsStorage()
        
        public var configurationJSON: NSDictionary?
        
        lazy private var camConfiguration: [String: String] = {
            var result: [String: String] = [:]
            
            for (key, value) in pluginConfiguration {
                switch value {
                case let string as String:
                    result[key] = string
                case let bool as Bool:
                    result[key] = bool.description
                default:
                    break
                }
            }
            
            #warning("Uncomment this. In real app authFields will be url pointing at json file that you need to download. Currently it is mocked in mock_config.json")
            //        if let authFieldsURLString = pluginConfiguration[CAMKeys.authFields.rawValue] as? String,
            //            let authFieldsURL = URL(string: authFieldsURLString),
            //            let authFieldsData = try? Data(contentsOf: authFieldsURL),
            //            let authFieldsStringData = String(data: authFieldsData, encoding: .utf8) {
            //            result[CAMKeys.authFields.rawValue] = authFieldsStringData
            //        }
            
            return result
        }()
        
        //MARK: - ZPLoginProviderUserDataProtocol methods
        
        public required override init() {
            super.init()
            
            assert(false, "Unexpected call of initialiizer")
        }
        
        /// This constructor is called before trigger on app launch event. Configuration is retrieved here.
        public required init(configurationJSON: NSDictionary?) {
            self.configurationJSON = configurationJSON
            let pluginID = "InPlayerLoginPlugin"
            self.pluginConfiguration = ZAAppConnector.sharedInstance().genericDelegate.screenModelForPluginID(pluginID: pluginID, dataSource: nil)?.general ?? [:]
            
            ///Initialize InPlayer SDK
            guard let clientId = pluginConfiguration[ConfigurationKeys.clientId] as? String,
                let referrer = pluginConfiguration[ConfigurationKeys.referrer] as? String,
                let environmentRaw = pluginConfiguration[ConfigurationKeys.clientId] as? String else {
                    assert(false, "Couldn't initialize InPlayer SDK.Missing InPlayer configuration info. ")
                    return
            }
            #warning("Set referrer")
            let environment = InPlayerEnvironmentType(rawValue: environmentRaw) ?? .staging
            let configuration = InPlayer.Configuration(clientId: clientId, referrer: nil, environment: environment)
            InPlayer.initialize(configuration: configuration)
        }
        
        public func login(_ additionalParameters: [String : Any]?, completion: @escaping ((ZPLoginOperationStatus) -> Void)) {
            start(flow: .authAndStorefront, additionalParams: additionalParameters, completion: completion)
        }
        
        public func logout(_ completion: @escaping ((ZPLoginOperationStatus) -> Void)) {
            start(flow: .logout, additionalParams: nil, completion: completion)
        }
        
        public func isAuthenticated() -> Bool {
            return InPlayer.Account.isAuthenticated()
        }
        
        public func isPerformingAuthorizationFlow() -> Bool {
            return false
        }
        
        public func getUserToken() -> String {
            return InPlayer.Account.getCredentials()?.accessToken ?? ""
        }
        
        //MARK: - ZPAppLoadingHookProtocol
        
        public func executeAfterAppRootPresentation(displayViewController: UIViewController?,
                                                    completion: (() -> Swift.Void)?) {
            
            executeTriggerOnAppLaunchFlow(displayViewController: displayViewController, completion: completion)
        }
        
        // MARK: - ZPScreenHookAdapterProtocol
        
        public required init?(pluginModel: ZPPluginModel, dataSourceModel: NSObject?) {
            super.init()
            
            assert(false, "Unexpected call of initialiizer")
        }
        
        public required init?(pluginModel: ZPPluginModel, screenModel: ZLScreenModel, dataSourceModel: NSObject?) {
            super.init()
            self.pluginConfiguration = screenModel.general
            
            if let playableItems = dataSourceModel as? [ZPPlayable],
                let playableItem = playableItems.first {
                analytics.updateProperties(from: playableItem)
            }
        }
        
        public var isFlowBlocker: Bool {
            return true
        }
        
        public func requestScreenPluginPresentation(completion: @escaping (Bool) -> Void) {
            completion(false)
        }
        
        ///Triggers CAM workflow on hook
        public func executeHook(presentationIndex: NSInteger,
                                dataDict: [String: Any]?,
                                taskFinishedWithCompletion: @escaping (Bool, NSError?, [String: Any]?) -> Void) {
            analytics.trigger = .tapCell
            login(nil) { (operationStatus) in
                switch operationStatus {
                case .completedSuccessfully:
                    taskFinishedWithCompletion(true, nil, nil)
                case .failed, .cancelled:
                    taskFinishedWithCompletion(false, nil, nil)
                }
            }
        }
        
        // MARK: - ZPPluggableScreenProtocol
        
        public weak var screenPluginDelegate: ZPPlugableScreenDelegate?
        
        public func createScreen() -> UIViewController {
            return UIViewController()
        }
        
        //MARK: - Helper Methods
        
        ///Triggers CAM workflow after app launch
        private func executeTriggerOnAppLaunchFlow(displayViewController: UIViewController?,
                                                   completion: (() -> Swift.Void)?) {
            analytics.trigger = .appLaunch
            
            guard let controller = displayViewController else {
                completion?()
                return
            }
            
            let contentAccessManager = ContentAccessManager(rootViewController: controller,
                                                            camDelegate: self,
                                                            camFlow: .authAndStorefront,
                                                            completion: { _ in completion?() })
            contentAccessManager.startFlow()
        }
        
        private func start(flow: CAMFlow, additionalParams: [String: Any]?, completion: @escaping ((ZPLoginOperationStatus) -> Void)) {
            guard let controller = UIViewController.topmostViewController() else {
                assert(false, "No topmost controller")
                completion(.failed)
                return
            }
            
            if let _ = additionalParams?["UserAccountTrigger"] as? Bool {
                analytics.trigger = .userAccountComponent
            }
            
            let contentAccessManager = ContentAccessManager(rootViewController: controller,
                                                            camDelegate: self,
                                                            camFlow: flow) { (isCompleted) in
                                                                (isCompleted == true) ? completion(.completedSuccessfully) : completion(.failed)
            }
            contentAccessManager.startFlow()
        }
    }
}

//MARK: - CAMDelegate
extension InPlayer.LoginPlugin: CAMDelegate {
    
    public func getPluginConfig() -> [String: String] {
        return camConfiguration
    }
    
    public func isPurchaseNeeded() -> Bool {
        return false //true
    }
    
    public func isUserLoggedIn() -> Bool {
        return isAuthenticated()
    }
    
    public func facebookLogin(userData: (email: String, userId: String),
                              completion: @escaping (Result<Void, Error>) -> Void) {
        
    }
    
    public func facebookSignUp(userData: (email: String, userId: String),
                               completion: @escaping (Result<Void, Error>) -> Void) {
        
    }
    
    public func login(authData: [String: String], completion: @escaping (Result<Void, Error>) -> Void) {
        guard let email = authData[ConfigurationKeys.AuthFields.email],
            let password = authData[ConfigurationKeys.AuthFields.password] else {
            completion(.failure(InPlayer.LoginPluginError.requiredFieldsNotFilled))
            return
        }
        
        InPlayer.Account.authenticate(username: email, password: password, success: { (authorization) in
            completion(.success)
        }) { (error) in
            completion(.failure(error))
        }
    }
    
    public func logout(completion: @escaping (Result<Void, Error>) -> Void) {
        InPlayer.Account.signOut(success: {
            completion(.success)
        }) { (error) in
            completion(.failure(error))
        }
    }
  
    public func signUp(authData: [String: String], completion: @escaping (Result<Void, Error>) -> Void) {
        guard let email = authData[ConfigurationKeys.AuthFields.email],
            let password = authData[ConfigurationKeys.AuthFields.password],
            let confirmPassword = authData[ConfigurationKeys.AuthFields.confirmPassword],
            let fullName = authData[ConfigurationKeys.AuthFields.fullName] else {
                completion(.failure(InPlayer.LoginPluginError.requiredFieldsNotFilled))
            return
        }
        
        let requiredFields = [ConfigurationKeys.AuthFields.email,
                              ConfigurationKeys.AuthFields.password,
                              ConfigurationKeys.AuthFields.confirmPassword,
                              ConfigurationKeys.AuthFields.fullName]
        let additionalFields = authData.filter {!requiredFields.contains($0.key)}
        
        InPlayer.Account.signUp(fullName: fullName, email: email, password: password, passwordConfirmation: confirmPassword, metadata: additionalFields, success: { (authorization) in
            completion(.success)
        }) { (error) in
            completion(.failure(error))
        }
    }
    
    public func resetPassword(data: [String: String], completion: @escaping (Result<Void, Error>) -> Void) {
        guard let email = data[ConfigurationKeys.AuthFields.email] else {
            completion(.failure(InPlayer.LoginPluginError.requiredFieldsNotFilled))
            return
        }
        InPlayer.Account.requestNewPassword(email: email, success: {
            completion(.success)
        }) { (error) in
            completion(.failure(error))
        }
    }
    
    /**
     This method is used by CAM to show available products on storefront screen.
     General flow looks like:
     1. You get list of apple product ids (hard-coded, API call, whatever).
     2. Call completion closure with these ids.
     3. CAM will retrieve all necessary data from App Store and will show available items.
     */
    
    public func availableProducts(completion: @escaping (Result<[String], Error>) -> Void) {
        
    }
    
    /**
     Called right after purchase was done. Here you should call API of your server to register purchase.
     */
    
    public func itemPurchased(purchasedItem: PurchasedProduct, completion: @escaping (Result<Void, Error>) -> Void) {
        
    }
    
    /**
     Called after restored purchases were retrieved from the App Store. Here you should call API of your server to register purchases.
     */
    
    public func itemsRestored(restoredItems: [PurchasedProduct],
                              completion: @escaping (Result<Void, Error>) -> Void) {
        
    }
    
    /**
     Some analytics can be collected only from plugin itself.
     */
    
    public func analyticsStorage() -> AnalyticsStorageProtocol {
        return analytics
    }
}
