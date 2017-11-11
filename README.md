
# Overview

A simple app that fetches top App Store apps and displays them in a FlatList.


# How to run.

1. Clone this repo.
2. Run npm install.
3. Ensure a device, or simulator

4. Run react-native run-ios.
4. Or you can find the TopApps.xcodeproj in <path>/TopApps/ios. Open that in Xcode and run.
  
# What it has.

1. <b>Navigation between screens.</b>
    I used react-native-navigation in this project to achieve a native look and feel. It has many other features like drawer, tab, etc. Visit https://wix.github.io/react-native-navigation/#/ to understand more about this.  It doesn’t have anything equivalent to 'popToViewController' , I hope this will be added in next release. Don’t worry, If you know objective-c, you can easily add this functionality. 
    
2. <b>Native UI componet written in swift 3.0.</b>
  Custom component which replicate iOS's built in circular photo cropper for the built in contacts app.
  
3. <b>State management.</b>
  I used Redux, I am very much satisfied, it helps to avoid lots of errors.

4. <b>Networking.</b>
  I used Fetch Api, but for certificate pinning we need other solutions.

5. <b>Local storage.</b>
  I used AsyncStorage. it just like single plist file.
  
6. <b>Validations.</b>
   You can see some samples in project.Let me know if you have comments
   
7. <b>Reusable components.</b>
  You can see some samples in project.Let me know if you have comments
