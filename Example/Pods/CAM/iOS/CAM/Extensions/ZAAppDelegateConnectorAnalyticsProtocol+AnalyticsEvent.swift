//
//  ZAAppDelegateConnectorAnalyticsProtocol+AnalyticsEvent.swift
//  CAM
//
//  Created by Roman Karpievich on 11/18/19.
//

import Foundation
import ZappPlugins

extension ZAAppDelegateConnectorAnalyticsProtocol {
    func trackEvent(event: AnalyticsEvents) {
        trackEvent(name: event.key, parameters: event.metadata)
    }
    
    func trackEvent(event: AnalyticsEvents, timed: Bool) {
        trackEvent(name: event.key, parameters: event.metadata, timed: timed)
    }
}
