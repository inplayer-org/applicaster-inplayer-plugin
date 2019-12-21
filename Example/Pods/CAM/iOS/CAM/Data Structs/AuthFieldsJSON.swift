//
//  AuthFieldsJsonParser.swift
//  CAMFramework
//
//  Created by Egor Brel on 4/24/19.
//  Copyright © 2019 Egor Brel. All rights reserved.
//

import Foundation

struct AuthFields: Codable {
    let signup: [AuthField]?
    let login: [AuthField]?
    let password: [AuthField]?
    
    private enum CodingKeys: String, CodingKey {
        case signup = "Sign-up"
        case login = "Login"
        case password = "Password-reset"
    }
}

enum AuthFieldInputType: String, Codable {
    case text = "TEXT"
    case email = "EMAIL"
    case password = "PASSWORD"
    case number = "NUMBER"
    case unknown
    
    public init(from decoder: Decoder) throws {
        self = try AuthFieldInputType(rawValue: decoder.singleValueContainer().decode(RawValue.self)) ?? .unknown
    }
}

enum AuthFieldState: String, Codable {
    case none
    case error
    case unknown
    
    public init(from decoder: Decoder) throws {
        self = try AuthFieldState(rawValue: decoder.singleValueContainer().decode(RawValue.self)) ?? .unknown
    }
}

struct AuthField: Codable {
    let key: String?
    let title: String?
    let hint: String?
    let type: AuthFieldInputType
    let mandatory: Bool
    var text: String?
    
    private enum CodingKeys: String, CodingKey {
        case key
        case title
        case hint
        case type
        case mandatory
    }
    
    var state: AuthFieldState = .none
    var errorDescription: String = ""
}
