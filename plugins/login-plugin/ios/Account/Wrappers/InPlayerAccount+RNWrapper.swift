
import Foundation
import InPlayerSDK

struct InPlayerAccountKeys {
    static let completed = "completed"
    static let createdAt = "created_at"
    static let email = "email"
    static let fullName = "full_name"
    static let username = "username"
    static let id = "id"
    static let referrer = "referrer"
    static let roles = "roles"
    static let updatedAt = "updated_at"
    static let uuid = "uuid"
    static let merchantId = "merchant_id"
    static let merchantUUID = "merchant_uuid"
    static let metadata = "metadata"
}

extension InPlayerAccount {
    static func wrapToDictionary(account: InPlayerAccount) -> [AnyHashable: Any] {
        var retVal: [AnyHashable: Any] = [:]

        retVal[InPlayerAccountKeys.completed] = account.completed
        retVal[InPlayerAccountKeys.createdAt] = account.createdAt
        retVal[InPlayerAccountKeys.email] = account.email
        retVal[InPlayerAccountKeys.fullName] = account.fullName
        retVal[InPlayerAccountKeys.username] = account.username
        retVal[InPlayerAccountKeys.id] = account.id
        retVal[InPlayerAccountKeys.referrer] = account.referrer
        retVal[InPlayerAccountKeys.roles] = account.roles?.map({ $0.rawValue })
        retVal[InPlayerAccountKeys.updatedAt] = account.updatedAt
        retVal[InPlayerAccountKeys.uuid] = account.uuid
        retVal[InPlayerAccountKeys.merchantId] = account.merchantId
        retVal[InPlayerAccountKeys.merchantUUID] = account.merchantUUID
        retVal[InPlayerAccountKeys.metadata] = account.metadata

        return retVal
    }
}
