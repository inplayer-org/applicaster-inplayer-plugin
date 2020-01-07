import UIKit

extension UIViewController {
    class func topmostViewController() -> UIViewController? {
        guard let window = UIApplication.shared.delegate?.window ,
            let rootViewController = window?.rootViewController else {
            return nil
        }
        
        var top: UIViewController = rootViewController
        while let newTop = top.presentedViewController {
            top = newTop
        }
        
        return top
    }
}
