//
//  UICheckBox.swift
//  CAMFramework
//
//  Created by Egor Brel on 4/26/19.
//  Copyright © 2019 Egor Brel. All rights reserved.
//

import UIKit

class UICheckBox: UIImageView {

    var isChecked: Bool {
        get {
            return image != nil
        }
        set {
            if isChecked {
                backgroundColor = .black
            } else {
                image = nil
                backgroundColor = .red
            }
        }
    }
    
    public override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    public required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
}
