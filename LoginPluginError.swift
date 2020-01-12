import Foundation
import InPlayerSDK

public extension InPlayer {
    enum LoginPluginError: Error, LocalizedError {
        case requiredFieldsNotFilled
        
        public var errorDescription: String? {
            switch self {
            case .requiredFieldsNotFilled:
                return "Some of the required fields are not filled"
            }
        }
    }
}
