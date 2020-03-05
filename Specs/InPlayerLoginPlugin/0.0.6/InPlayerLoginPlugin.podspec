Pod::Spec.new do |s|
  s.name         = 'InPlayerLoginPlugin'
  s.version      = '0.0.6'
  s.summary      = 'InPlayerLoginPlugin'
  s.license      = 'MIT'
  s.homepage     = 'https://github.com/inplayer-org/zapp-ios-plugin'
  s.author       = {"Maja Sapunova" => "majasapunova@gmail.com"}
  s.ios.deployment_target = '10.0'
  s.swift_version = '5.1'
  s.source       = { :git => "git@github.com:inplayer-org/zapp-ios-plugin.git", :tag => s.version.to_s }
  s.source_files = 'InPlayerLoginPlugin/Classes/**/*.{swift,h,m}'
  s.requires_arc = true
  s.static_framework = true
  s.dependency 'ZappPlugins'
  s.dependency 'CAM', '~> 2.0.0'
  s.dependency 'InPlayerSDK', '~> 2.0.0'
  s.xcconfig =  {
    'CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES' => 'YES',
    'ENABLE_BITCODE' => 'YES',
    'SWIFT_VERSION' => '5.1'
  }
end

