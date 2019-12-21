//
//  UIViewController + Extension.swift
//  CAM
//
//  Created by Egor Brel on 4/29/19.
//

import UIKit

public extension UIViewController {
    class func instantiateVC() -> Self {
        return initFromStoryboard()
    }
    
    private class func initFromStoryboard<T>() -> T {
        let bundle = Bundle(for: T.self as! AnyClass) // swiftlint:disable:this force_cast
        let storyboard = UIStoryboard(name: String(describing: T.self), bundle: bundle)
        return storyboard.instantiateViewController(withIdentifier: String(describing: T.self)) as! T
        // swiftlint:disable:previous force_cast
    }
    
    func showAlert(description: String?) {
        let alert = UIAlertController(title: "", message: description, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))
        self.present(alert, animated: true, completion: nil)
    }
    
    func showConfirmationScreen(config: [String: String],
                                titleKey: CAMKeys,
                                descriptionKey: CAMKeys,
                                buttonKey: CAMKeys,
                                action: @escaping () -> Void) {
        let confirmationPopover = ConfirmationPopover.nibInstance()
        confirmationPopover.frame = self.view.frame
        confirmationPopover.buttonPressedAction = action
        confirmationPopover.confirmationPopoverBackground.setStyle(asset: .alertBackground)
        confirmationPopover.titleLabel.setStyle(config: config, camTextKey: titleKey, style: .confirmationTitleFont)
        confirmationPopover.descriptionLabel.setStyle(config: config,
                                                      camTextKey: descriptionKey,
                                                      style: .confirmationDescriptionFont)
        confirmationPopover.actionButton.setStyle(config: config,
                                                  backgroundAsset: .alertButton,
                                                  camTitleKey: buttonKey,
                                                  style: .confirmationButtonFont)
        self.view.addSubview(confirmationPopover)
    }
    
    func showErrorPopover(config: [String: String], message: String?, bubbleWidth: CGFloat, sourceView: UITableViewCell) {
        let controller = ErrorPopoverViewController.instantiateVC()
        controller.modalPresentationStyle = .popover
        controller.preferredContentSize = CGSize(width: bubbleWidth + 86, height: 90)
        if let popoverPresentationController = controller.popoverPresentationController {
            if let delegate = self as? UIPopoverPresentationControllerDelegate {
                popoverPresentationController.delegate = delegate
            }
            popoverPresentationController.sourceView = sourceView
            popoverPresentationController.permittedArrowDirections = .up
            popoverPresentationController.popoverBackgroundViewClass = ErrorPopoverBackgroundView.self
            popoverPresentationController.sourceRect = CGRect(x: sourceView.bounds.width / 2, y: 40, width: 0, height: 0)
            present(controller, animated: true, completion: {
                controller.messageLabel.setStyle(config: config, style: .inputFieldFont)
                controller.messageLabel.text = message
                controller.bubbleWidthConstraint.constant = bubbleWidth
                controller.view.layoutIfNeeded()
            })
        }
    }
    
    func addChildViewController(_ controller: UIViewController) {
        self.addChild(controller)
        controller.view.frame = self.view.frame
        view.addSubview(controller.view)
        controller.didMove(toParent: self)
    }
}
