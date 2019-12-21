//
//  UIColor + Hex.swift
//  CAM
//
//  Created by Egor Brel on 5/21/19.
//

import UIKit

extension UIColor {
    convenience init?(hexRGBA: String?) {
        guard let rgba = hexRGBA, let val = Int(rgba.replacingOccurrences(of: "#", with: ""), radix: 16) else {
            return nil
        }
        self.init(red: CGFloat((val >> 24) & 0xff) / 255.0,
                  green: CGFloat((val >> 16) & 0xff) / 255.0,
                  blue: CGFloat((val >> 8) & 0xff) / 255.0,
                  alpha: CGFloat(val & 0xff) / 255.0)
    }
}
