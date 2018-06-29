  
    
 var lenOfImageCatalog;
 var slidesMovedCount = 1; 

 function pageLoaded(imageCatalog){
	 
	 let elem = document.getElementsByClassName("content")[0];
	 elem.innerHTML = catalogTemplate();    
	 slidesMovedCount = 1;
	 displayCatalog(imageCatalog);
 }
 
 
 function displayCatalog(imageCatalog){
	 lenOfImageCatalog = imageCatalog.length;  
	 let catalog = document.getElementById("catalog");
	 catalog.innerHTML="";
	 
	 for(var i=0; i<imageCatalog.length; i++){
		 let style = `left:${(i+i*33)}%; background-image: url(\'images/${imageCatalog[i]}\');`;
		 catalog.innerHTML += getImageDiv(style);
	 } 
 }
 
 
 function getImageDiv(style){
	 let result = `<div class="catalogImageEntry" style="${style}"></div>`;
	 return result;
 }
 
 

var slidesMovedCount = 1; 

function leftOneStep(elem) {
	let start = Date.now();
	console.log("blu started");
	let timer = setInterval(function() {
	  let timePassed = Date.now() - start;

	  let old =  parseInt(elem.style.left, 10);

	  if(isNaN(old)){
		  old = 0;
	  }		
	  console.log(old);
	  elem.style.left = old - 1 + "%";

	  if (timePassed > 1000) clearInterval(timer);

	}, 30);
  }

 function rightOneStep(elem) {
	let start = Date.now();
	console.log("blu started");
	let timer = setInterval(function() {
	  let timePassed = Date.now() - start;

	  let old =  parseInt(elem.style.left, 10);

	  if(isNaN(old)){
		  old = 0;
	  }		
	  console.log(old);
	  elem.style.left = old + 1 + "%";

	  if (timePassed > 1000) clearInterval(timer);

	}, 30);
  }


function moveCatalogLeft(){	  
	if(Math.abs(slidesMovedCount) == lenOfImageCatalog-3){
		return;
	}
	
	let elem = document.getElementById("catalog");

	leftOneStep(elem);
	slidesMovedCount--;
}

function moveCatalogRight(){
	
	if(slidesMovedCount == 2){
		return;
	}	
	
	let elem = document.getElementById("catalog");
	rightOneStep(elem);
	slidesMovedCount++;
}









