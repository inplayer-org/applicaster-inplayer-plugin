//
//  PlayableItemInfo.swift
//  CAM
//
//  Created by Roman Karpievich on 7/16/19.
//

import Foundation

private enum PlayableItemInfoKeys: String {
    case name = "Content Entity Name"
    case type = "Content Entity Type"
}

struct PlayableItemInfo {
    let name: String
    let type: String
    
    var metadata: [String: String] {
        return [PlayableItemInfoKeys.name.rawValue: self.name,
                PlayableItemInfoKeys.type.rawValue: self.type]
    }
}
