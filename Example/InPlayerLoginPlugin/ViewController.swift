import UIKit
import InPlayerSDK
import InPlayerLoginPlugin
import ZappPlugins

class ViewController: UIViewController {
    
    private var loginPlugin: InPlayer.LoginPlugin?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        ZAAppConnector.sharedInstance().genericDelegate = self
        ZAAppConnector.sharedInstance().analyticsDelegate = self
        ZAAppConnector.sharedInstance().identityDelegate = self
        ZAAppConnector.sharedInstance().pluginsDelegate = self
        ZAAppConnector.sharedInstance().layoutsStylesDelegate = self
        ZAAppConnector.sharedInstance().urlDelegate = self
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    @IBAction func login(_ sender: Any) {
        if loginPlugin == nil {
            loginPlugin = InPlayer.LoginPlugin(configurationJSON: nil)
        }

        loginPlugin?.login(nil, completion: { result in
            
        })
    }
    
    @IBAction func logout(_ sender: Any) {
        if loginPlugin == nil {
            loginPlugin = InPlayer.LoginPlugin(configurationJSON: nil)
        }
        
        let completion: (ZPLoginOperationStatus) -> Void = { _ in
            
        }
        loginPlugin?.logout(completion)
    }
    
    
    //Mocked function for retrieve ZLScreenModel
    func screenModelForPluginID(pluginID: String?, dataSource: NSObject?) -> ZLScreenModel? {
        var model: ZLScreenModel? = nil
        
        if let path = Bundle.main.path(forResource: "mock_config", ofType: "json") {
            do {
                  let data = try Data(contentsOf: URL(fileURLWithPath: path), options: .mappedIfSafe)
                  let jsonResult = try JSONSerialization.jsonObject(with: data, options: .mutableLeaves)
                  if let jsonResult = jsonResult as? [String: Any] {
                    model = ZLScreenModel(object: jsonResult)
                  }
              } catch {
                   fatalError()
              }
        }
        return model
    }
}
