import Foundation
import InPlayerSDK

struct InPlayerItemAccessKeys {
    static let accountId = "account_id"
    static let countryCode = "country_code"
    static let createdAt = "created_at"
    static let customerId = "customer_id"
    static let customerUuid = "customer_uuid"
    static let expiresAt = "expires_at"
    static let id = "id"
    static let ipAddress = "ip_address"
    static let item = "item"
    static let startsAt = "starts_at"
}

extension InPlayerItemAccess {
    static func wrapToDictionary(itemAccess: InPlayerItemAccess) -> [AnyHashable: Any] {
        var retVal: [AnyHashable: Any] = [:]

        retVal[InPlayerItemAccessKeys.accountId] = itemAccess.accountId
        retVal[InPlayerItemAccessKeys.countryCode] = itemAccess.countryCode
        retVal[InPlayerItemAccessKeys.createdAt] = itemAccess.createdAt
        retVal[InPlayerItemAccessKeys.customerId] = itemAccess.customerId
        retVal[InPlayerItemAccessKeys.customerUuid] = itemAccess.customerUuid
        retVal[InPlayerItemAccessKeys.expiresAt] = itemAccess.expiresAt
        retVal[InPlayerItemAccessKeys.id] = itemAccess.id
        retVal[InPlayerItemAccessKeys.ipAddress] = itemAccess.ipAddress

        if let item = itemAccess.item {
            retVal[InPlayerItemAccessKeys.item] = InPlayerItem.wrapToDictionary(item: item)
        }

        retVal[InPlayerItemAccessKeys.startsAt] = itemAccess.startsAt

        return retVal
    }
}
