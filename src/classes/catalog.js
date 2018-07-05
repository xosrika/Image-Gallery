class Catalog{
  
  constructor(galery, title){
    this.galery = galery;
    this.leftdiff = 1;
    this.elem = null;
    this.currentPicture = null;
    this.title = title;
  }


  loadCatalog(){	 
    let content = document.getElementsByClassName("content")[0];
    content.innerHTML = catalogTemplate(this.title);    
    this.elem = document.getElementById("catalog");
    
    this.displayCatalog();
  }


  displayCatalog(){
    let len = this.galery.getLengthOfGallery();  
    
    this.elem.innerHTML = "";  
    
    this.elem = document.getElementById("catalog");
    
    for(let i=0; i<len; i++){
      let style = `left:${(i+i*33)}%; background-image: url(\'images/${this.galery.getGalleryImages()[i]}\');`;
      this.elem.innerHTML += this.getImageDiv(style, this.galery.getGalleryImages()[i], i);
    } 
  }
  
  
  getImageDiv(style, link, index){
    let result = `<a href="#image/${link}/${index}"> <div class="catalogImageEntry" style="${style}"></div></a>`;
    return result;
  }

  

  leftOneStep() {
    let start = Date.now();
    let elem = this.elem;
    let timer = setInterval(function() {
      let timePassed = Date.now() - start;
  
      let old =  parseInt(elem.style.left, 10);
  
      if(isNaN(old)){
        old = 0;
      }		
      elem.style.left = old - 1 + "%";
  
      if (timePassed > 1000) clearInterval(timer);
  
    }, 30);
  }
  
   rightOneStep() {
 
    let start = Date.now();
    let elem = this.elem;
    let timer = setInterval(function() {
      let timePassed = Date.now() - start;
  
      let old =  parseInt(elem.style.left, 10);
  
      if(isNaN(old)){
        old = 0;
      }		
      elem.style.left = old + 1 + "%";
  
      if (timePassed > 1000) clearInterval(timer);
  
    }, 30);
  }
  moveCatalogLeft(){	  
    if(Math.abs(this.leftdiff) == this.galery.getLengthOfGallery()-3){
      return;
    }
    this.leftOneStep();
    this.leftdiff--;
  }

  moveCatalogRight(){
	
    if(this.leftdiff == 2){
      return;
    }	
   
    this.rightOneStep();
    this.leftdiff++;
  }


  goToNextImagePage(){
    this.currentPicture++;
    if(this.currentPicture != this.galery.getGalleryImages().length)
      window.location.href = `http://localhost/Image-Gallery/index.php#image/${this.galery.getGalleryImages()[this.currentPicture]}/${this.currentPicture}>`;
    else
      window.location.href = "http://localhost/Image-Gallery/index.php#categories";  
  } 

}


let currentCatalog = null;