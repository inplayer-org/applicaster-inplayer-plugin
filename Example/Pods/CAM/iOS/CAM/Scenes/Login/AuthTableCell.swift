//
//  LoginAuthTableCell.swift
//  CAM
//
//  Created by Egor Brel on 5/14/19.
//

import UIKit

class AuthTableCell: UITableViewCell, UITextFieldDelegate {

    @IBOutlet var textField: UITextField!
    var textChanged: ((String?) -> Void)?
    var showPopover: (() -> Void)?
    
    override func awakeFromNib() {
        super.awakeFromNib()
        textField.addTarget(self, action: #selector(textFieldDidChange), for: .editingChanged)
        textField.delegate = self
        textField.rightViewMode = .always
    }
    
    func configureInputField(data: AuthField) {
        textField.text = data.text
        
        switch data.state {
        case .error:
            let rightViewButton = UIButton()
            rightViewButton.frame = CGRect(x: 0, y: 0, width: 20, height: 20)
            rightViewButton.setStyle(iconAsset: .validationFailed)
            rightViewButton.addTarget(self, action: #selector(showPopoverOnTable), for: .touchUpInside)
            textField.rightView = rightViewButton
        default:
            textField.rightView = nil
        }
        
        switch data.type {
        case .text, .unknown, .email:
            textField.keyboardType = .default
        case .number:
            textField.keyboardType = .numberPad
        case .password:
            textField.keyboardType = .default
            if #available(iOS 12.0, *) {
                textField.textContentType = .oneTimeCode
            }
            textField.isSecureTextEntry = true
        }
    }
    
    @objc func showPopoverOnTable() {
        showPopover?()
    }
    
    @objc func textFieldDidChange() {
        textField.rightView = nil
        textChanged?(textField.text)
    }
    
    func textField(_ textField: UITextField,
                   shouldChangeCharactersIn range: NSRange,
                   replacementString string: String) -> Bool {
        textChanged?(textField.text)
        return true
    }

    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        return textField.resignFirstResponder()
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
    }

}
