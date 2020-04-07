import Foundation
import InPlayerSDK

struct InPlayerItemKeys {
    static let accessControlType = "access_control_type"
    static let createdAt = "created_at"
    static let id = "id"
    static let isActive = "is_active"
    static let itemType = "item_type"
    static let merchantId = "merchant_id"
    static let merchantUuid = "merchant_uuid"
    static let metadata = "metadata"
    static let metahash = "metahash"
    static let title = "title"
    static let updatedAt = "updated_at"
    static let content = "content"
}

extension InPlayerItem {
    static func wrapToDictionary(item: InPlayerItem) -> [AnyHashable: Any] {
        var retVal: [AnyHashable: Any] = [:]

        if let accessControlType = item.accessControlType {
            retVal[InPlayerItemKeys.accessControlType] = InPlayerAccessControlType.wrapToDictionary(accessControlType: accessControlType)
        }

        retVal[InPlayerItemKeys.createdAt] = item.createdAt
        retVal[InPlayerItemKeys.id] = item.id
        retVal[InPlayerItemKeys.id] = item.isActive

        if let itemType = item.itemType {
            retVal[InPlayerItemKeys.itemType] = InPlayerItemType.wrapToDictionary(itemType: itemType)
        }

        retVal[InPlayerItemKeys.merchantId] = item.merchantId
        retVal[InPlayerItemKeys.merchantUuid] = item.merchantUuid

        if let metadata = item.metadata {
            retVal[InPlayerItemKeys.metadata] = metadata.map({ InPlayerItemMetadata.wrapToDictionary(itemMetadata: $0) })
        }

        retVal[InPlayerItemKeys.metahash] = item.metahash
        retVal[InPlayerItemKeys.title] = item.title
        retVal[InPlayerItemKeys.updatedAt] = item.updatedAt
        retVal[InPlayerItemKeys.content] = item.content
        return retVal
    }
}
