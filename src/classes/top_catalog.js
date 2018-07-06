class TopCatalog{
  
  constructor(imageList, title, attitude){
    this.imageList = imageList;
    this.leftdiff = 1;
    this.elem = null;
    this.currentPicture = null;
    this.title = title;
    this.attitude = attitude;
  }


  loadCatalog(){	 
    let content = document.getElementsByClassName("content")[0];
    content.innerHTML = catalogTemplate(this.title);    
    this.elem = document.getElementById("catalog");
    
    this.displayCatalog();

    document.getElementById("btnLeft").id = "btnTopLeft";
    document.getElementById("btnRight").id = "btnTopRight";
  }


  displayCatalog(){
    let len = this.imageList.length;  
    
    this.elem.innerHTML = "";  
    
    this.elem = document.getElementById("catalog");
    
    for(let i=0; i<len; i++){
      let style = `left:${(i+i*33)}%; background-image: url(\'${this.imageList[i][0]}\');`;
      
      this.elem.innerHTML += this.getImageDiv(style, this.imageList[i], i);
    } 
  }
  
  
  getImageDiv(style, img, index){
    let result = `<a href="#top/${this.attitude}/${img[0]}/${index}/${img[1]}"> <div class="catalogImageEntry" style="${style}"></div></a>`;
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
    if(Math.abs(this.leftdiff) == this.imageList.length-3){
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
    if(this.currentPicture != this.imageList.length){
      let src = this.imageList[this.currentPicture][0];
      let id = this.currentPicture;
      let votes = this.imageList[this.currentPicture][1];
      window.location.href = `${root}#top/${this.attitude}/${src}/${id}/${votes}`;
    }else{
      if(this.attitude){
        window.location.href = `${root}#liked`;  
      } else {
        window.location.href = `${root}#disliked`;
      }
    }
  } 

}


let currentTopCatalog = null;


function getTopImages(attitude , callback){
  fetch('data/votes.json')
      .then(
        function(response0) {
            response0
              .json()
              .then(function(response) {
                let dicImage = {}

                response.votes.forEach(function(item){
                  
                  if( (item.vote == "1" && attitude == true) || (item.vote == "-1" && attitude == false) ) {  
                    if (dicImage[item.image] !== undefined)               
                      dicImage[item.image] ++;
                    else 
                      dicImage[item.image] = 1  
                  }
                  
                })

                let sorted = returnSortedDict(dicImage);
                
                let title = "";
                
                

                if(attitude == false){
                  title = "Mosted Disliked Pictures";
                }else{
                  title = "Mosted Liked Pictures";
                }
                currentTopCatalog = new TopCatalog(sorted, title, attitude);

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

function returnSortedDict(dict){
  // Create items array
  let items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });

  // Sort the array based on the second element
  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  return items;
}
