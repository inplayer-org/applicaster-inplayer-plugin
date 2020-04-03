@import React;

@interface RCT_EXTERN_MODULE (InPlayerAccount, NSObject)

RCT_EXTERN_METHOD(signUp:(NSString *)payload
                      resolver:(RCTPromiseResolveBlock)resolver
                          rejecter:(RCTPromiseRejectBlock)rejecter);

RCT_EXTERN_METHOD(authenticate:(NSString *)payload
                      resolver:(RCTPromiseResolveBlock)resolver
                          rejecter:(RCTPromiseRejectBlock)rejecter);

RCT_EXTERN_METHOD(isAuthenticated(RCTPromiseResolveBlock) resolver
                  rejecter:(RCTPromiseRejectBlock)rejecter);

RCT_EXTERN_METHOD(signOut:(RCTPromiseResolveBlock)resolver
                      rejecter:(RCTPromiseRejectBlock)rejecter);

@end
