class Gallery {

  constructor(list) {
    this.photos = list;
  }


  getGalleryImages(){
    return this.photos;
  }

  getLengthOfGallery(){
    return this.photos.length;
  }
}