//
//  Result+Success.swift
//  CAMStarterKit
//
//  Created by Roman Karpievich on 11/19/19.
//

import Foundation

extension Result where Success == Void {
    static var success: Result {
        return .success(())
    }
}
