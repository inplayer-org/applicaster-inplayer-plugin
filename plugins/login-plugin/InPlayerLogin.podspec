# frozen_string_literal: true

Pod::Spec.new do |s|
  s.name             = 'InPlayerLogin'
  s.version          = '0.0.5'
  s.summary          = 'InPlayerLogin'
  s.description      = <<-DESC
  InPlayerLogin container.
  DESC
  s.homepage         = 'https://github.com/applicaster/AppleApplicasterFrameworks.git'
  s.license          = 'CMPS'
  s.author = 'Applicaster LTD.'
  s.source = { git: 'https://github.com/applicaster/AppleApplicasterFrameworks.git',
               tag: '2020.3.5.16-3-0' }
  s.platform = :ios
  s.ios.deployment_target = '11.0'
  s.requires_arc = true
  s.static_framework = true
  s.swift_versions = '5.1'

  s.source_files = ['ios/**/*.swift', 'ios/**/*.m']

  s.xcconfig = {
    'CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES' => 'YES',
    'ENABLE_BITCODE' => 'YES'
  }
  s.dependency 'ZappCore'
  s.dependency 'React'
  s.dependency 'InPlayerSDK', '= 2.0.0'

  # s.test_spec 'UnitTests' do |sp|
  #   sp.source_files = 'Tests/**'
  # end
end
