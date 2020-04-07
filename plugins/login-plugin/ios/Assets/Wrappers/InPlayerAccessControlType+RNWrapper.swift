import Foundation
import InPlayerSDK

struct InPlayerAccessControlTypeKeys {
    static let id = "id"
    static let auth = "auth"
    static let name = "name"
}

extension InPlayerAccessControlType {
    static func wrapToDictionary(accessControlType: InPlayerAccessControlType) -> [AnyHashable: Any] {
        var retVal: [AnyHashable: Any] = [:]

        retVal[InPlayerAccessControlTypeKeys.id] = accessControlType.id
        retVal[InPlayerAccessControlTypeKeys.auth] = accessControlType.auth
        retVal[InPlayerAccessControlTypeKeys.name] = accessControlType.name

        return retVal
    }
}
