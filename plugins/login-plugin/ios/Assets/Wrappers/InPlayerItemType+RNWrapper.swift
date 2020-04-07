import Foundation
import InPlayerSDK

struct InPlayerItemTypeKeys {
    static let contentType = "content_type"
    static let descriptionField = "description"
    static let host = "host"
    static let id = "id"
    static let name = "name"
}

extension InPlayerItemType {
    static func wrapToDictionary(itemType: InPlayerItemType) -> [AnyHashable: Any] {
        var retVal: [AnyHashable: Any] = [:]

        retVal[InPlayerItemTypeKeys.contentType] = itemType.contentType
        retVal[InPlayerItemTypeKeys.descriptionField] = itemType.descriptionField
        retVal[InPlayerItemTypeKeys.host] = itemType.host
        retVal[InPlayerItemTypeKeys.id] = itemType.id
        retVal[InPlayerItemTypeKeys.name] = itemType.name

        return retVal
    }
}
