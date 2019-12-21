//
//  ErrorPopoverView.swift
//  CAM
//
//  Created by Egor Brel on 6/14/19.
//

import UIKit

class ErrorPopoverBackgroundView: UIPopoverBackgroundView {
    
    override class func arrowBase() -> CGFloat { return 0 }
    override class func arrowHeight() -> CGFloat { return 0 }
    
    override class func contentViewInsets() -> UIEdgeInsets {
        return UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
    }
    
    var arrOff: CGFloat = 0.0
    var arrDir: UIPopoverArrowDirection = .up
    
    override var arrowDirection: UIPopoverArrowDirection {
        get { return .up }
        set { self.arrDir = newValue }
    }
    
    override var arrowOffset: CGFloat {
        get { return 0.0 }
        set { self.arrOff = newValue }
    }
    
    override class var wantsDefaultContentAppearance: Bool {
        return false
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setup()
    }
    
    private func setup() {
        self.layer.shadowColor = UIColor.clear.cgColor
        self.layer.borderColor = UIColor.clear.cgColor
    }
}
