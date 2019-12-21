//
//  CAMFlows.swift
//  CAMFramework
//
//  Created by Roman Karpievich on 6/20/19.
//

import Foundation

public enum CAMFlow {
    case authentication
    case storefront
    case authAndStorefront
    case logout
    case no
}

public enum CAMFlowResult {
    case success
    case failure
    case cancellation
}
