//
//  ImageEditorViewController.swift
//  ImagePicker
//
//  Created by johnson mathew on 11/6/17.
//  Copyright © 2017 Western Union. All rights reserved.
//

import UIKit

class ImageEditorViewController: UIViewController {
  @IBOutlet weak  var imageView: UIImageView!
  @IBOutlet weak var scrollView: UIScrollView!
  @IBOutlet weak var maskView: UIView!
  @IBOutlet weak var imageViewBottomConstraint: NSLayoutConstraint!
  @IBOutlet weak var imageViewLeadingConstraint: NSLayoutConstraint!
  @IBOutlet weak var imageViewTopConstraint: NSLayoutConstraint!
  @IBOutlet weak var imageViewTrailingConstraint: NSLayoutConstraint!
  
  @IBOutlet weak var moveandscale: UILabel!
  
  @IBOutlet weak var chooseBtn: UIButton!
  
  @IBOutlet weak var cancelBtn: UIButton!
  
  private var _image : UIImage?
  private var cropRect : CGRect = .zero
  
  var hideStatusbar = false
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    imageView.image = _image
    
    let circleLayer = CAShapeLayer()
    
    let cx : Double = Double(maskView.center.x);
    let cy : Double = Double(maskView.center.y);
    let w = Double(maskView.bounds.width - 40)
    let r : Double = Double(w / 2)
    
    
    cropRect = CGRect(x: cx - r , y: cy - (r + 40 ), width: w, height: w)
    
    let circlePath = UIBezierPath(roundedRect: cropRect, cornerRadius: CGFloat( w / 2))
    
    circleLayer.path = circlePath.cgPath
    
    circleLayer.fillColor = UIColor.clear.cgColor
    
    circlePath.usesEvenOddFillRule = true
    
    let path = UIBezierPath(rect: maskView.bounds)
    
    path.append(circlePath)
    
    path.usesEvenOddFillRule = true
    
    
    let fillLayer:  CAShapeLayer = CAShapeLayer()
    fillLayer.path = path.cgPath;
    fillLayer.fillRule = kCAFillRuleEvenOdd;
    fillLayer.fillColor = UIColor.black.cgColor
    fillLayer.opacity = 0.8;
    
    
    maskView.layer.addSublayer(fillLayer)
    maskView.bringSubview(toFront: moveandscale)
    maskView.bringSubview(toFront: cancelBtn)
    maskView.bringSubview(toFront: chooseBtn)
    
  }
  
  fileprivate func updateMinZoomScaleForSize(_ size: CGSize) {
    let widthScale = size.width / imageView.bounds.width
    let heightScale = size.height / imageView.bounds.height
    let minScale = min(widthScale, heightScale)
    
    scrollView.minimumZoomScale = minScale
    scrollView.zoomScale = minScale
  }
  
  
  override func viewWillLayoutSubviews() {
    super.viewWillLayoutSubviews()
    updateMinZoomScaleForSize(view.bounds.size)
    
  }
  
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
  
  
  
  @IBAction func chooseAction(_ sender: Any) {
    
    UIGraphicsBeginImageContext(maskView.frame.size)
    
    let offset : CGPoint = scrollView.contentOffset;
    UIGraphicsGetCurrentContext()!.translateBy(x: -offset.x, y: -offset.y);
    
    scrollView.layer.render(in:UIGraphicsGetCurrentContext()!)
    let image = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    
    
    let subImage : UIImage =  UIImage.init(cgImage: (image?.cgImage?.cropping(to: cropRect))!)
    
    
    let directory = NSTemporaryDirectory()
    
    let url = NSURL.fileURL(withPathComponents: [directory, "you.png"])
    
    if ((url?.scheme) != nil) {
      try? UIImagePNGRepresentation(subImage)?.write(to: url!)
    }
    
    
    NotificationCenter.default.post(name: Notification.Name(rawValue: "ImageChanged"), object: self)
    
    
    self.dismiss(animated: true) {
      UIApplication.shared.setStatusBarHidden(false, with: .slide)
    }
    
  }
  
  
  func addImage(image : UIImage) -> Void {
    _image = image;
  }
  
  override var prefersStatusBarHidden: Bool {
    return hideStatusbar
  }
  
}


extension ImageEditorViewController: UIScrollViewDelegate {
  func viewForZooming(in scrollView: UIScrollView) -> UIView? {
    return imageView
  }
}


class OverLayView: UIView {
  override func hitTest(_ point: CGPoint, with event: UIEvent?) -> UIView? {
    let result = super.hitTest(point, with: event)
    if result == self { return nil }
    return result
  }
}


