//
//  UIKit+Nib.swift
//  CAMFramework
//
//  Created by Egor Brel on 4/25/19.
//  Copyright © 2019 Egor Brel. All rights reserved.
//

import UIKit

extension UIView {
    
    class func nibInstance() -> Self {
        return initFromNib()
    }
    
    private class func initFromNib<T>() -> T {
        let bundle = Bundle(for: T.self as! AnyClass) // swiftlint:disable:this force_cast
        return bundle.loadNibNamed(String(describing: self),
                                   owner: nil,
                                   options: nil)?[0] as! T // swiftlint:disable:this force_cast
    }
}
