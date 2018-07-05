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


function getGallery(index,  callback){
  fetch('data/category_images.json')
      .then(
        function(response0) {
            response0
              .json()
              .then(function(response) {               

                currentGalery = new Gallery(response.category_images[index]);
              
              
                if (typeof callback == 'function') {
                  callback.call(null);
                }

              });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
}

let currentGalery = null;