import Foundation
import InPlayerSDK

struct InPlayerAuthorizationKeys {
    static let accessToken = "access_token"
    static let refreshToken = "refresh_token"
    static let account = "account"
    static let expires = "expires"
}

extension InPlayerAuthorization {
    static func wrapToDictionary(authorization: InPlayerAuthorization) -> [AnyHashable: Any] {
        var retVal: [AnyHashable: Any] = [:]

        retVal[InPlayerAuthorizationKeys.accessToken] = authorization.accessToken
        retVal[InPlayerAuthorizationKeys.refreshToken] = authorization.refreshToken

        if let account = authorization.account {
            retVal[InPlayerAuthorizationKeys.account] = InPlayerAccount.wrapToDictionary(account: account)
        }

        retVal[InPlayerAuthorizationKeys.expires] = authorization.expires

        return retVal
    }
}
