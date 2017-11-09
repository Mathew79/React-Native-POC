//
//  RNTFaceManager.m
//  TopApps
//
//  Created by johnson mathew on 11/7/17.
//  Copyright © 2017 Facebook. All rights reserved.
//





#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>
#import "TopApps-Swift.h"


@interface RNTFaceManager : RCTViewManager
@end

@implementation RNTFaceManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return  [[ImagePickerView alloc] init];
}


RCT_REMAP_METHOD(imageUrl,
                 resolver : (RCTPromiseResolveBlock) resolve
                 rejecter: (RCTPromiseRejectBlock)reject){
  resolve ([ImagePickerView imageUrl]);
}

@end





