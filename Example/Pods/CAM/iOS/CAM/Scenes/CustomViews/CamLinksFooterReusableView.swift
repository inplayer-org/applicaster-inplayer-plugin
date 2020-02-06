//
//  CamLinksFooterReusableVIew.swift
//  CAM
//
//  Created by Egor Brel on 12/26/19.
//

import UIKit

class CamLinksFooterReusableView: UICollectionReusableView {
 
    @IBOutlet var camLinksView: CamLinksView!

    func setupParameters(camScreen: CamScreen,
                         configDictionary: [String: String]) {
        camLinksView.setupParameters(camScreen: camScreen, configDictionary: configDictionary)
    }
}
