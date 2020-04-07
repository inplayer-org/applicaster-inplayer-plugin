import Foundation
import InPlayerSDK

struct InPlayerItemMetadataKeys {
    static let id = "id"
    static let name = "name"
    static let value = "value"
}

extension InPlayerItemMetadata {
    static func wrapToDictionary(itemMetadata: InPlayerItemMetadata) -> [AnyHashable: Any] {
        var retVal: [AnyHashable: Any] = [:]

        retVal[InPlayerItemMetadataKeys.id] = itemMetadata.id
        retVal[InPlayerItemMetadataKeys.name] = itemMetadata.name
        retVal[InPlayerItemMetadataKeys.value] = itemMetadata.value
        
        return retVal
    }
}
