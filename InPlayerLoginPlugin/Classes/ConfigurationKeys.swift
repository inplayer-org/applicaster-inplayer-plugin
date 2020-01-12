import Foundation
import InPlayerSDK

extension InPlayer.LoginPlugin {
    
    struct ConfigurationKeys {
        
        static let customConfigurationFields = "custom_configuration_fields"
        
        struct CustomFields {
            static let clientId = "client_id"
            static let referrer = "referrer"
            static let environment = "environment"
        }
        
        struct AuthFields {
            static let email = "email"
            static let password = "password"
            static let confirmPassword = "confirm_password"
            static let fullName = "full_name"
        }
    }
}
