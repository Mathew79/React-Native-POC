//
//  ImagePickerView.swift
//  ImagePicker
//
//  Created by johnson mathew on 11/5/17.
//  johnson.mathew@hotmail.com
//

import UIKit


class ImagePickerView: UIView , UIImagePickerControllerDelegate,UINavigationControllerDelegate {
  @IBOutlet weak var imageView: UIImageView!
  
  @IBOutlet var cameraOverlayView: UIView!
  
  @IBOutlet var view: UIView!
  
  var imagePickerController : UIImagePickerController?
  var  editor : ImageEditorViewController?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    initializer()
  }
  
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
    initializer()
    
  }
  
  deinit {
    NotificationCenter.default.removeObserver(self)
  }
  
  
  func initializer() -> Void {
    Bundle.main.loadNibNamed("ImagePickerView", owner: self, options: nil)
    
    view.frame = self.bounds;
    
    
    self.addSubview(view);
    
    view.autoresizingMask = [.flexibleHeight,.flexibleWidth]
    
    let tap = UITapGestureRecognizer(target: self, action: #selector(self.tapOnImage(_:)))
    imageView.addGestureRecognizer(tap)
    
    NotificationCenter.default.addObserver(self, selector: #selector(self.imageChanged), name: NSNotification.Name(rawValue: "ImageChanged"), object: nil)
  }
  
  
  func imageChanged() -> Void {
    let directory = NSTemporaryDirectory()
    
    let url = NSURL.fileURL(withPathComponents: [directory, "you.png"])
    
    
    if let  data : Data = try? Data.init(contentsOf: url!){
      imageView.image = UIImage(data: data as Data)
    }
    
  }
  
  func tapOnImage(_ sender: UITapGestureRecognizer) {
    showActionSheetTapped()
  }
  
  
  func showActionSheetTapped() -> Void {
    
    let actionSheetController  = UIAlertController(title: nil, message: nil, preferredStyle: .actionSheet)
    
    let cancelAction: UIAlertAction = UIAlertAction(title: "Cancel", style: .cancel) { action -> Void in
      
    }
    actionSheetController.addAction(cancelAction)
    
    let takePictureAction: UIAlertAction = UIAlertAction(title: "Take Photo", style: .default) { action -> Void in
      if  UIImagePickerController.isSourceTypeAvailable(.camera){
        self.showCameraPicker()
      }
    }
    actionSheetController.addAction(takePictureAction)
    
    let choosePictureAction: UIAlertAction = UIAlertAction(title: "Choose Photo", style: .default) { action -> Void in
      self.showImagePicker()
      
    }
    actionSheetController.addAction(choosePictureAction)
    
    
    if let rootVC = self.nextAvailableVc(){
      
      
      rootVC.present(actionSheetController, animated: true, completion: nil)
    }
    
    
    
  }
  
  
  func showImagePicker() -> Void {
    imagePickerController = UIImagePickerController()
    imagePickerController?.modalPresentationStyle = UIModalPresentationStyle.popover
    imagePickerController?.delegate = self
    imagePickerController?.allowsEditing = false;
    
    if let rootVC = self.nextAvailableVc(){
      rootVC.present(imagePickerController!, animated: true, completion: nil)
    }
  }
  
  
  
  
  func showCameraPicker() -> Void {
    imagePickerController = UIImagePickerController()
    imagePickerController?.modalPresentationStyle = UIModalPresentationStyle.fullScreen
    imagePickerController?.delegate = self
    imagePickerController?.allowsEditing = false;
    imagePickerController?.sourceType = .camera
    imagePickerController?.showsCameraControls = false
    imagePickerController?.cameraDevice = .front
    
    Bundle.main.loadNibNamed("CameraOverlay", owner: self, options: nil)
    self.cameraOverlayView.frame = (imagePickerController?.cameraOverlayView?.frame)!
    imagePickerController?.cameraOverlayView = self.cameraOverlayView
    self.cameraOverlayView = nil
    
    
    if let rootVC = self.nextAvailableVc(){
      rootVC.present(imagePickerController!, animated: true, completion: nil)
    }
  }
  
  
  
  func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
    editor = ImageEditorViewController(nibName: "ImageEditorViewController", bundle: nil)
    
    if let image : UIImage = info[UIImagePickerControllerOriginalImage] as? UIImage {
      editor?.addImage(image: image)
      
      if picker.sourceType == .camera {
        editor?.hideStatusbar = true
        
        picker.pushViewController(editor!, animated: false)
      }
      else{
        picker.pushViewController(editor!, animated: true)
      }
    }
    
  }
  
  @IBAction func takePhoto(sender : UIButton){
    if  let picker : UIImagePickerController  = imagePickerController {
      picker.takePicture()
    }
  }
  
  @IBAction func cancelPhoto(sender : UIButton){
    if  let picker : UIImagePickerController  = imagePickerController, picker.sourceType == .camera {
      picker.dismiss(animated: true, completion: nil)
    }
  }
  
  
  static func imageUrl() -> String {
    let directory = NSTemporaryDirectory()
    let url = NSURL.fileURL(withPathComponents: [directory, "you.png"])
    if ((url?.scheme) != nil && FileManager.default.fileExists(atPath: (url?.path)!)){
      return (url?.absoluteString)!;
    }
    else{
      return (Bundle.main.url(forResource: "addPhoto", withExtension: "png")?.absoluteString)!;
    }
  }
  
  
  override func awakeFromNib() {
    super.awakeFromNib()
  }
  
  
}


extension UIView{
  
  func nextAvailableVc() -> UIViewController? {
    
    if let nextResponder  = self.next , nextResponder.isKind(of : UIViewController.self){
      return nextResponder as? UIViewController
    }
    else if let nextResponder = self.next , nextResponder.isKind(of : UIView.self){
      return (nextResponder as! UIView).nextAvailableVc()
    }
    else{
      return nil
    }
  }
}
