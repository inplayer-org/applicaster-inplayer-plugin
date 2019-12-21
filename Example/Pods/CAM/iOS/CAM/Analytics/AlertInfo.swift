//
//  AlertInfo.swift
//  CAM
//
//  Created by Roman Karpievich on 7/16/19.
//

import Foundation

enum ConfirmationAlertType: String {
    case purchase = "Purchase"
    case restorePurchase = "Restore Purchase"
    case passwordReset = "Password Reset"
    
    var key: String {
        return "Confirmation Cause"
    }
}

enum IsConfirmationAlert {
    case yes(type: ConfirmationAlertType)
    case no
    
    var key: String {
        return "Confirmation Alert"
    }
    
    var metadata: [String: String] {
        switch self {
        case .yes(let type):
            return [key: "Yes",
                    type.key: type.rawValue]
        case .no:
            return [key: "No"]
        }
    }
}

private enum AlertInfoKeys: String {
    case title = "Alert Title"
    case description = "Alert Description"
}

struct AlertInfo {
    let title: String
    let description: String
    let isConfirmation: IsConfirmationAlert
    
    var metadata: [String: String] {
        return isConfirmation.metadata.merge([AlertInfoKeys.title.rawValue: self.title,
                                              AlertInfoKeys.description.rawValue: self.description])
    }
}
