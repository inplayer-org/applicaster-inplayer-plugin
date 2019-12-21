//
//  CustomizableFields.swift
//  CAM
//
//  Created by Egor Brel on 5/10/19.
//

import UIKit
import ZappPlugins

class UIConfigurator {
    
    static func color(from config: [String: String],
                      for style: CAMStyles) -> UIColor {
        let baseKey = style.rawValue
        let colorKey = baseKey + "_color"
        let colorValue = config[colorKey] ?? ""
        return UIColor(argbHexString: colorValue) ?? .black
    }
    
    static func font(from config: [String: String],
                     for style: CAMStyles) -> UIFont {
        let baseKey = style.rawValue
        let sizeKey =  baseKey + (UIDevice.current.userInterfaceIdiom == .pad ? "_size_tablet" : "_size_phone")
        let fontKey = baseKey + "_font_ios"
        
        let defaultFontSize: CGFloat = 12.0
        let fontSizeValue = config[sizeKey] ?? ""
        let fontSize = CGFloat(fontSizeValue) ?? defaultFontSize
        
        let fontName = config[fontKey] ?? ""
        let font = UIFont(name: fontName, size: fontSize)
        
        return font ?? UIFont.systemFont(ofSize: fontSize)
    }
}

extension UIImage {
    static func image(forAsset asset: String) -> UIImage? {
        let connector = ZAAppConnector.sharedInstance()
        if let image = UIImage(named: asset) {
            return image
        } else if let image = UIImage(named: asset,
                                      in: connector.layoutsStylesDelegate.zappLayoutsStylesBundle(),
                                      compatibleWith: nil) {
            return image
        } else if let url = connector.urlDelegate.fileUrl(withName: asset, extension: "png") {
            if let image = UIImage(contentsOfFile: url.path) ?? UIImage(contentsOfFile: url.absoluteString) {
                return image
            } else if let data = try? Data(contentsOf: url), let image = UIImage(data: data, scale: 0) {
                return image
            } else {
                return nil
            }
        } else { return nil }
    }
}

extension UIView {
    
    func getColorAndFontByStyle(config: [String: String], style: CAMStyles?) -> (color: UIColor, font: UIFont) {
        guard let style = style else {
            return (color: UIColor.black, font: UIFont.systemFont(ofSize: 12.0))
        }
        let baseKey = style.rawValue
        var size: CGFloat = 12.0
        let sizeKey =  baseKey + (UIDevice.current.userInterfaceIdiom == .pad ? "_size_tablet" : "_size_phone")
        if let value = config[sizeKey], let configSize = CGFloat(value) {
            size = configSize
        }
        
        var font = UIFont.systemFont(ofSize: size)
        let fontKey = baseKey + "_font_ios"
        if let value = config[fontKey], let configFont = UIFont(name: value, size: size) {
            font = configFont
        }
        
        var color = UIColor.black
        let colorKey = baseKey + "_color"
        if let value = config[colorKey], let configColor = UIColor(argbHexString: value) {
            color = configColor
        }
        
        return (color: color, font: font)
    }
    
    func setStyle(config: [String: String], backgroundColor: CAMStyles) {
        if let value = config[backgroundColor.rawValue], let color = UIColor(argbHexString: value) {
            self.backgroundColor = color
        }
    }
}

extension UIImageView {
    func setStyle(asset: CAMKeys.Images) {
        var image = UIImage.image(forAsset: asset.rawValue)
        
        if asset == .background, image != nil {
            let height = UIScreen.main.bounds.height
            image = image?.scaled(to: height)
            self.contentMode = .top
        }
        
        self.image = image
    }
}

extension UIButton {
    func setStyle(config: [String: String] = [String: String](),
                  iconAsset: CAMKeys.Images? = nil,
                  backgroundAsset: CAMKeys.Images? = nil,
                  title: String? = nil,
                  camTitleKey: CAMKeys? = nil,
                  style: CAMStyles? = nil,
                  forState state: UIControl.State = .normal) {
        
        if let name = iconAsset?.rawValue {
            self.setImage(UIImage.image(forAsset: name), for: state)
        }
        
        let configStyle = self.getColorAndFontByStyle(config: config, style: style)
        self.titleLabel?.font = configStyle.font
        self.setTitleColor(configStyle.color, for: state)
        if let key = camTitleKey?.rawValue, let title = config[key] {
            self.setTitle(title, for: state)
        } else {
            self.setTitle(title, for: state)
        }
        if let name = backgroundAsset?.rawValue {
            self.setBackgroundImage(UIImage.image(forAsset: name), for: state)
        }
    }
    
    func setAttributedStyle(config: [String: String] = [String: String](),
                            iconAsset: CAMKeys? = nil,
                            backgroundAsset: CAMKeys? = nil,
                            attributedTitle: [(style: CAMStyles?, string: String, additionalAttributes: [NSAttributedString.Key: Any]?)]? = nil,
                            forState state: UIControl.State = .normal) {
        
        if let name = iconAsset?.rawValue {
            self.setImage(UIImage.image(forAsset: name), for: state)
        }
        if let name = backgroundAsset?.rawValue {
            self.setBackgroundImage(UIImage.image(forAsset: name), for: state)
        }
        let str = NSMutableAttributedString(string: "")
        if let attributedTitle = attributedTitle {
            for index in 0..<attributedTitle.count {
                let subTitle = attributedTitle[index]
                
                var attrs: [NSAttributedString.Key: Any] = subTitle.additionalAttributes ?? [:]
                let configStyle = self.getColorAndFontByStyle(config: config, style: attributedTitle[index].style)
                attrs[.font] = configStyle.font
                attrs[.foregroundColor] = configStyle.color
                let space = (index + 1 < attributedTitle.count ? " " : "")
                str.append(NSAttributedString(string: "\(subTitle.string)\(space)", attributes: attrs))
            }
        }
        setAttributedTitle(str, for: state)
    }
}

extension UILabel {
    func setStyle(config: [String: String] = [String: String](),
                  camTextKey: CAMKeys? = nil,
                  style: CAMStyles? = nil) {
        let configStyle = self.getColorAndFontByStyle(config: config, style: style)
        self.font = configStyle.font
        self.textColor = configStyle.color
        if let key = camTextKey?.rawValue, let text = config[key] {
            self.text = text
        }
    }
    
    func setAttributedStyle(config: [String: String] = [String: String](),
                            attributedText: [(style: CAMStyles?, string: String,
                            additionalAttributes: [NSAttributedString.Key: Any]?)]) {
        let str = NSMutableAttributedString(string: "")
        for index in 0..<attributedText.count {
            let subText = attributedText[index]
            var attrs: [NSAttributedString.Key: Any] = subText.additionalAttributes ?? [:]
            let configStyle = self.getColorAndFontByStyle(config: config, style: attributedText[index].style)
            attrs[.font] = configStyle.font
            attrs[.foregroundColor] = configStyle.color
            let space = (index + 1 < attributedText.count ? " " : "")
            str.append(NSAttributedString(string: "\(subText.string)\(space)", attributes: attrs))
        }
        self.attributedText = str
    }
}

extension UITextField {
    
    func setStyle(config: [String: String] = [String: String](),
                  backgroundAsset: CAMKeys.Images? = nil,
                  style: CAMStyles? = nil,
                  placeholder: String? = nil) {
        
        if let name = backgroundAsset?.rawValue {
            self.background = UIImage.image(forAsset: name)
            self.borderStyle = .none
        }
        
        let configStyle = self.getColorAndFontByStyle(config: config, style: style)
        self.font = configStyle.font
        self.textColor = configStyle.color
        
        if let placeholder = placeholder {
            var attrs: [NSAttributedString.Key: Any] = [:]
            attrs[.font] = configStyle.font
            attrs[.foregroundColor] = configStyle.color.withAlphaComponent(0.6)
            attributedPlaceholder = NSAttributedString(string: placeholder, attributes: attrs)
        } else {
            self.placeholder = nil
        }
    }
}

extension UITextView {
    func setStyle(config: [String: String] = [String: String](),
                  style: CAMStyles? = nil) {
        let configStyle = self.getColorAndFontByStyle(config: config, style: style)
        self.font = configStyle.font
        self.textColor = configStyle.color
    }
}
