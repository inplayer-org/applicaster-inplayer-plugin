@import React;

@interface RCT_EXTERN_MODULE (InPlayerAccountBridge, NSObject)

RCT_EXTERN_METHOD(signUp:(NSDictionary *)payload
                      resolver:(RCTPromiseResolveBlock)resolver
                          rejecter:(RCTPromiseRejectBlock)rejecter);

RCT_EXTERN_METHOD(authenticate:(NSDictionary *)payload
                      resolver:(RCTPromiseResolveBlock)resolver
                          rejecter:(RCTPromiseRejectBlock)rejecter);

RCT_EXTERN_METHOD(isAuthenticated:(NSDictionary *)payload
                      resolver:(RCTPromiseResolveBlock)resolver
                          rejecter:(RCTPromiseRejectBlock)rejecter);

RCT_EXTERN_METHOD(signOut:(NSDictionary *)payload
                      resolver:(RCTPromiseResolveBlock)resolver
                          rejecter:(RCTPromiseRejectBlock)rejecter);

@end
