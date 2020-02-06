//
//  HorizontlFlowLayout.swift
//  CAMFramework
//
//  Created by Egor Brel on 5/3/19.
//  Copyright © 2019 Egor Brel. All rights reserved.
//

import UIKit

class CustomFlowLayout: UICollectionViewFlowLayout {
    
    override open func prepare() {
        super.prepare()
        self.sectionFootersPinToVisibleBounds = false
        updateInsets()
    }
    
    private func updateInsets() {
        guard let collectionView = collectionView else {
            return
        }
        if UIDevice.current.userInterfaceIdiom == .pad {
            var itemsAmount = collectionView.dataSource!.collectionView(collectionView,
                                                                        numberOfItemsInSection: 0)
            
            if itemsAmount > 3 {
                itemsAmount = 3
            }
            
            let cellSpacingAmount = itemsAmount - 1
            let cellSpacingTotalWidth = CGFloat(cellSpacingAmount) * minimumLineSpacing
            let cellsTotalWidth = itemSize.width * CGFloat(itemsAmount)
            let inset = (collectionView.bounds.size.width - cellSpacingTotalWidth - cellsTotalWidth) / 2
            
            self.sectionInset.left = inset
            self.sectionInset.right = inset
        } else {
            collectionView.contentInset.bottom = 49
            self.sectionInset.bottom = 5
        }
        
    }
    override func shouldInvalidateLayout(forBoundsChange newBounds: CGRect) -> Bool {
        return true
    }
}
