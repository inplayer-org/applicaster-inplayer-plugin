//
//  String + Bool .swift
//  CAM
//
//  Created by Egor Brel on 5/21/19.
//

import Foundation

extension String {
    var bool: Bool {
        switch self.lowercased() {
        case "true":
            return true
        case "false":
            return false
        default:
            return false
        }
    }
    
    func isEmailValid() -> Bool {
        let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        let predicate = NSPredicate(format: "SELF MATCHES %@", emailRegex)
        guard predicate.evaluate(with: self) else {
            return false
        }
        
        return true
    }
}
