//
//  CAMDelegate+PlayableItemInfo.swift
//  CAM
//
//  Created by Roman Karpievich on 11/18/19.
//

import Foundation

extension CAMDelegate {
    var playableItemInfo: PlayableItemInfo {
        return PlayableItemInfo(name: analyticsStorage().itemName,
                                type: analyticsStorage().itemType)
        
    }
}
