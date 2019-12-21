//
//  UIImage+Scale.swift
//  CAM
//
//  Created by Roman Karpievich on 8/29/19.
//

import UIKit

extension UIImage {
    func scaled(to height: CGFloat) -> UIImage {
        let ratio = height / size.height
        let newImageSize = CGSize(width: size.width * ratio,
                                  height: height)
        let imageRenderer = UIGraphicsImageRenderer(size: newImageSize)
        let image = imageRenderer.image { _ in
            let rect = CGRect(origin: .zero, size: newImageSize)
            self.draw(in: rect)
        }
        
        return image
    }
}
