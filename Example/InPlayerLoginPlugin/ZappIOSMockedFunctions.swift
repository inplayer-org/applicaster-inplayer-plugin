import Foundation
import ZappPlugins

//MARK: - ZAAppDelegateConnectorAnalyticsProtocol
extension ViewController: ZAAppDelegateConnectorAnalyticsProtocol {
    func trackEvent(name: String, parameters: Dictionary<String, Any>) {
        
    }
    
    func trackEvent(name: String, parameters: Dictionary<String, Any>, model: Any?) {
        
    }
    
    func trackEvent(name: String?, action: String?, label: String?, value: Int) {
        
    }
    
    func trackScreenView(screenTitle: String, parameters: Dictionary<String, Any>) {
        
    }
    
    func trackEvent(name: String, parameters: Dictionary<String, Any>?, timed: Bool) {
        
    }
    
    func endTimedEvent(_ eventName: String, parameters: [String : Any]?) {
        
    }
    
    func startManager(withAccountId accountId: String?) {
        
    }
    
    func updateUserProfile(fbParamteters: [String : Any]?) {
        
    }
    
    func setEventUserGenericProperties(_ userGenericProperties: [String : Any]?) {
        
    }
    
    func setEventDefaultProperties(_ parameters: [String : Any]?) {
        
    }
    
    func setUserProfileProperties(_ parameters: [AnyHashable : Any]?) {
        
    }
    
    func isAnalyticsEnabled() -> Bool {
        return true
    }
    
    func setAnalyticsEnabled(_ value: Bool) {
        
    }
    
    func trackScreenView(withModelTitle modelTitle: String?) {
        
    }
}

//MARK: - ZAAppDelegateConnectorPluginsProtocol
extension ViewController: ZAAppDelegateConnectorPluginsProtocol {
    var analyticsPluginsManager: ZPAnalyticsPluginsManagerProtocol? {
        return nil
    }
    
    var generalPluginsManager: ZPGeneralPluginsManagerProtocol? {
        return nil
    }
    
    var broadcasterPickerPluginsManager: ZPBroadcasterPickerPluginsManagerProtocol? {
        return nil
    }
    
    var crashlogPluginsManager: ZPCrashlogPluginsManagerProtocol? {
        return nil
    }
    
    var loginPluginsManager: ZPLoginPluginsManagerProtocol? {
        return nil
    }
    
    var pushNotificationsPluginsManager: ZPPushNotificationsPluginsManagerProtocol? {
        return nil
    }
}

//MARK: - ZAAppDelegateConnectorIdentityProtocol
extension ViewController: ZAAppDelegateConnectorIdentityProtocol {
    func getDeviceId() -> String? {
        return nil
    }
    
    func authorizationTokens() -> [String : AnyObject]? {
        return nil
    }
    
    func updateAuthorizationTokens(withAuthorizationProviders authorizationProviders: [Any]?) {
        
    }
    
    func isLoginPluginAuthenticated() -> Bool {
        return false
    }
    
    func getLoginPluginToken() -> String {
        return ""
    }
    
    func getLoginPluginName() -> String {
        return ""
    }
    
    func login(_ additionalParameters: [String : Any]?, completion: @escaping (Bool) -> Void) {
        
    }
    
    func logout(completion: @escaping (Bool) -> Void) {
        
    }
    
    
}

//MARK: - ZAAppDelegateConnectorGenericProtocol
extension ViewController: ZAAppDelegateConnectorGenericProtocol {
    func currentBroadcasterExtensions() -> Dictionary<String, AnyObject> {
        return [:]
    }
    
    func accountExtensionsDictionary() -> Dictionary<String, AnyObject> {
        return [:]
    }
    
    func viewController(fromNavigationItem navigationItem: Any) -> UIViewController? {
        return nil
    }
    
    func navBarUIBuilderApiEnabled() -> Bool {
        return false
    }
    
    func reactNativeSingleBundleEnabled() -> Bool {
        return false
    }
    
    func rootUIBuilderApiEnabled() -> Bool {
         return false
    }
    
    func accountID() -> String? {
        return nil
    }
    
    func isDebug() -> Bool {
        return false
    }
    
    func isRTL() -> Bool {
        return false
    }
    
    func splashHelperGetLocalBackgroundVideoNameForScreenSize(baseFileName: String) -> String {
        return ""
    }
    
    func createVideoBackgroundViewInstance() -> ZPVideoBackgroundViewProtocol {
        return NSObject() as! ZPVideoBackgroundViewProtocol
    }
    
    func loadCollection(forUiTag uiTag: String, completion: @escaping ([NSObject]) -> Void) {
        
    }
    
    func loadCollectionItems(forUiTag uiTag: String, completion: @escaping (ZPCollectionProtocol?) -> Void) {
        
    }
    
    func datasourceModelDictionary(withModel model: NSObject?) -> NSDictionary? {
        return nil
    }
    
    func closeViewControllerCreatedFromNavigationBar(viewController: UIViewController?) -> Bool {
        return false
    }
    
    func getBroadcaster(byID: String) -> ZPBroadcasterProtocol? {
        return nil
    }
    
    func getBroadcasters() -> [ZPBroadcasterProtocol]? {
        return nil
    }
    
    func getCurrentBroadcaster() -> ZPBroadcasterProtocol? {
        return nil
    }
    
    func sendLoggerError(message: String) {
        
    }
    
    func sendLoggerDebug(message: String) {
        
    }
    
    func sendLoggerInfo(message: String) {
        
    }
    
    func hookManager() -> ZPScreenHookManagerProtocol {
        return NSObject() as! ZPScreenHookManagerProtocol
    }
    
    func screenModel(for screenID: String?) -> ZLScreenModel? {
        return nil
    }
    
    func screenModelForLegacyScreenID(_ screenID: String?) -> ZLScreenModel? {
        return nil
    }
    
    func extensionDictForModel(withModel model: NSObject?) -> NSDictionary? {
        return nil
    }
    
    func valueFromExtensionDictForModel(withModel model: NSObject?, for key: String) -> Any? {
        return nil
    }
    
    func hasScreenModelForOfflineHome() -> Bool {
        return false
    }
    
    func setAutomationAccessibilityIdentifier(forView view: UIView?, identifier: String?) {
        
    }
    
    func viewControllerByScreenName(screenName: String, title: String?, dataSourceModel: NSObject?) -> UIViewController? {
        return nil
    }
    
    func updateViewControllerFeedUrl(vc: UIViewController, feedUrl: String) -> Bool {
        return false
    }
    
    func getBundleIdentifier() -> String {
        return ""
    }
    
    func pluginsURLPath() -> URL? {
        return nil
    }
    
    
}

//MARK: - ZAAppDelegateConnectorLayoutsStylesProtocol
extension ViewController: ZAAppDelegateConnectorLayoutsStylesProtocol {
    func stylesBundle() -> Bundle! {
        return Bundle.main
    }
    
    func zappLayoutsStylesBundle() -> Bundle! {
         return Bundle.main
    }
    
    func zappLayoutsStylesMappingDict() -> [AnyHashable : Any]! {
        return [AnyHashable : Any]()
    }
    
    func isZappLayoutsEnabled() -> Bool {
        return false
    }
    
    func zappLayoutViewController() -> AnyClass! {
        return NSObject() as! AnyClass
    }
    
    func defaultStatusBarStyle() -> UIStatusBarStyle {
        return .default
    }
    
    
}

//MARK: - ZAAppDelegateConnectorURLProtocol
extension ViewController: ZAAppDelegateConnectorURLProtocol {
    func appUrlSchemePrefix() -> String? {
        return nil
    }
    
    func fileUrl(withName fileName: String?, extension: String?) -> URL? {
        return nil
    }
}
