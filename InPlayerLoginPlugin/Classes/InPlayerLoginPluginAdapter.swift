import ZappPlugins
import CAM
import InPlayerSDK

@objc public class InPlayerLoginPluginAdapter: NSObject, ZPLoginProviderUserDataProtocol, ZPAppLoadingHookProtocol, ZPScreenHookAdapterProtocol, ZPPluggableScreenProtocol {
    
    private let analytics = AnalyticsStorage()
    
    private var flow: CAMFlow = .authAndStorefront
    
    private var pluginConfiguration: [String: Any] = [:]
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
        
        if let authFieldsURLString = pluginConfiguration[CAMKeys.authFields.rawValue] as? String,
            let authFieldsURL = URL(string: authFieldsURLString),
            let authFieldsData = try? Data(contentsOf: authFieldsURL),
            let authFieldsStringData = String(data: authFieldsData, encoding: .utf8) {
            result[CAMKeys.authFields.rawValue] = authFieldsStringData
        }

        return result
    }()
    
    // MARK: - ZPAdapterProtocol
    
    public var configurationJSON: NSDictionary?

    public required override init() {
        super.init()
        
        assert(false, "Unexpected call of initialiizer")
    }
    
    /**
     This constructor is called before trigger on app launch event. Configuration is retrieved here.
     You have to replace 'YourPluginID' with ID of your plugin.
     */
    
    public required init(configurationJSON: NSDictionary?) {
        super.init()
        
        self.configurationJSON = configurationJSON
        let pluginID = "YourPluginID"
        self.pluginConfiguration = ZAAppConnector.sharedInstance().genericDelegate.screenModelForPluginID(pluginID: pluginID, dataSource: nil)?.general ?? [:]
    }
    
    // MARK: - ZPUIBuilderPluginsProtocol
    
    /**
     This constructor is called before hook. Configuration is retrieved here.. Also we can get and save ZPPlayable item here.
     */
    
    public required init?(pluginModel: ZPPluginModel, screenModel: ZLScreenModel, dataSourceModel: NSObject?) {
        super.init()
        self.pluginConfiguration = screenModel.general
        
        if let playableItems = dataSourceModel as? [ZPPlayable],
            let playableItem = playableItems.first {
            analytics.updateProperties(from: playableItem)
        }
    }
    
    // MARK: - ZPScreenHookAdapterProtocol
    
    public var isFlowBlocker: Bool {
        return true
    }
    
    public required init?(pluginModel: ZPPluginModel, dataSourceModel: NSObject?) {
        super.init()
        
        assert(false, "Unexpected call of initialiizer")
    }
    
    public func requestScreenPluginPresentation(completion: @escaping (Bool) -> Void) {
        completion(false)
    }
    
    /**
     The method triggers CAM workflow on hook.
     */
    
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
    
    // MARK: - ZPAppLoadingHookProtocol
    
    public func executeAfterAppRootPresentation(displayViewController: UIViewController?,
                                                completion: (() -> Swift.Void)?) {

        executeTriggerOnAppLaunchFlow(displayViewController: displayViewController, completion: completion)
    }
    
    /**
     The method triggers CAM workflow after app launch.
     */
    
    private func executeTriggerOnAppLaunchFlow(displayViewController: UIViewController?,
                                               completion: (() -> Swift.Void)?) {
        analytics.trigger = .appLaunch
        if flow != .no {
            guard let controller = displayViewController else {
                completion?()
                return
            }
            let contentAccessManager = ContentAccessManager(rootViewController: controller,
                                                            camDelegate: self,
                                                            camFlow: flow,
                                                            completion: { _ in completion?() })
            contentAccessManager.startFlow()
        } else {
            completion?()
        }
    }
    
    // MARK: - ZPLoginProviderUserDataProtocol
 
    public func isUserComply(policies: [String: NSObject]) -> Bool {
        return false
    }
    
    public func isUserComply(policies: [String: NSObject], completion: @escaping (Bool) -> Void) {
        completion(false)
    }
    
    // MARK: - ZPLoginProviderProtocol
    
    /*
    Create and display logic related to CAM.
    */
    
    public func login(_ additionalParameters: [String: Any]?,
                      completion: @escaping ((ZPLoginOperationStatus) -> Void)) {
    
        guard let controller = UIViewController.topmostViewController() else {
            assert(false, "No topmost controller")
            completion(.failed)
            return
        }
        
        if let _ = additionalParameters?["UserAccountTrigger"] as? Bool {
            analytics.trigger = .userAccountComponent
        }
        
        let contentAccessManager = ContentAccessManager(rootViewController: controller,
                                                        camDelegate: self,
                                                        camFlow: self.flow) { (isCompleted) in
            (isCompleted == true) ? completion(.completedSuccessfully) : completion(.failed)
        }
        contentAccessManager.startFlow()
    }
    
    public func logout(_ completion: @escaping ((ZPLoginOperationStatus) -> Void)) {
        ZAAppConnector.sharedInstance().identityDelegate.updateAuthorizationTokens(withAuthorizationProviders: [])
        
        completion(.completedSuccessfully)
    }
    
    public func isAuthenticated() -> Bool {
        return false
    }
    
    public func isPerformingAuthorizationFlow() -> Bool {
        return false

    }
    
    public func getUserToken() -> String {
        return ""
    }

    // MARK: - ZPPluggableScreenProtocol
    
    public weak var screenPluginDelegate: ZPPlugableScreenDelegate?
    
    public func createScreen() -> UIViewController {
        return UIViewController()
    }
}

// MARK: - CAMDelegate

extension InPlayerLoginPluginAdapter: CAMDelegate {
   
    /**
     Default implementation. In general there are no reasons to change it.
     */
    
    public func getPluginConfig() -> [String: String] {
        return camConfiguration
    }
    
    public func isPurchaseNeeded() -> Bool {
        return true
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
    
    /**
     Auth data contains user input in Login screen.
     Possible keys are described in configration json of plugin.
     [For more information, see](https://github.com/applicaster/applicaster-cam-framework/wiki/Authentication-Fields-Configuration)
     */
    
    public func login(authData: [String: String], completion: @escaping (Result<Void, Error>) -> Void) {

    }
    
    /**
     Use this method to logout
    */
    public func logout(completion: @escaping (Result<Void, Error>) -> Void) {
           
    }
    /**
     Auth data contains user input in Sign-Up screen.
     Possible keys are described in configration json of plugin.
     [For more information, see](https://github.com/applicaster/applicaster-cam-framework/wiki/Authentication-Fields-Configuration)
     */
    
    public func signUp(authData: [String: String], completion: @escaping (Result<Void, Error>) -> Void) {

    }
    
    /**
     Auth data contains user input in Reset Password screen.
     Possible keys are described in configration json of plugin.
     [For more information, see](https://github.com/applicaster/applicaster-cam-framework/wiki/Authentication-Fields-Configuration)
     */
    
    public func resetPassword(data: [String: String], completion: @escaping (Result<Void, Error>) -> Void) {
        
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

